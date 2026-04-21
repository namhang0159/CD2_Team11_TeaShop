<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\InventoryBatch;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public function checkout(User $user, array $data)
    {
        // Sử dụng Database Transaction để nếu có lỗi ở bất kỳ bước nào, toàn bộ sẽ được Rollback lại
        return DB::transaction(function () use ($user, $data) {

            // 1. Lấy giỏ hàng của user
            $cart = Cart::with('items.variant')->where('user_id', $user->id)->first();

            if (!$cart || $cart->items->isEmpty()) {
                throw ValidationException::withMessages(['cart' => ['Giỏ hàng của bạn đang trống.']]);
            }

            $totalAmount = 0;

            // 2. Lặp qua từng sản phẩm trong giỏ để kiểm tra tồn kho và tính tiền
            foreach ($cart->items as $item) {
                $variant = $item->variant;
                $requestedQty = $item->quantity;

                // Lấy các lô hàng CÒN HẠN, CÒN HÀNG, Sắp xếp HẾT HẠN TRƯỚC lên đầu (FEFO)
                // Dùng lockForUpdate() để khóa các dòng này lại, không cho người khác mua cùng lúc
                $batches = InventoryBatch::where('variant_id', $variant->id)
                    ->where('expiry_date', '>', now())
                    ->where('stock_quantity', '>', 0)
                    ->orderBy('expiry_date', 'asc')
                    ->lockForUpdate()
                    ->get();

                $totalAvailable = $batches->sum('stock_quantity');

                if ($totalAvailable < $requestedQty) {
                    throw ValidationException::withMessages([
                        'quantity' => ["Sản phẩm {$variant->product->name} ({$variant->option_name}) chỉ còn {$totalAvailable} sản phẩm."]
                    ]);
                }

                // Tiền = Giá * Số lượng
                $totalAmount += ($variant->price * $requestedQty);

                // THỰC HIỆN TRỪ KHO THEO LÔ (FEFO)
                $qtyToDeduct = $requestedQty;
                foreach ($batches as $batch) {
                    if ($qtyToDeduct <= 0) break; // Đã trừ đủ số lượng

                    if ($batch->stock_quantity >= $qtyToDeduct) {
                        $batch->stock_quantity -= $qtyToDeduct;
                        $batch->save();
                        $qtyToDeduct = 0;
                    } else {
                        // Nếu lô này không đủ, lấy hết lô này rồi vòng lặp sau lấy lô tiếp theo
                        $qtyToDeduct -= $batch->stock_quantity;
                        $batch->stock_quantity = 0;
                        $batch->save();
                    }
                }
            }

            // 3. Tạo Đơn hàng (Order)
            $order = Order::create([
                'user_id' => $user->id,
                'payment_method_id' => $data['payment_method_id'],
                'shipping_address_id' => $data['shipping_address_id'],
                'shipping_fee' => $data['shipping_fee'],
                'total_amount' => $totalAmount + $data['shipping_fee'],
                'status' => 'Pending',
                'payment_status' => 'Unpaid',
                'created_at' => now(),
            ]);

            // 4. Tạo chi tiết đơn hàng (Order Items)
            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'variant_id' => $item->variant_id,
                    'quantity' => $item->quantity,
                    'price_at_purchase' => $item->variant->price, // Lưu lại giá tại thời điểm mua
                ]);
            }

            // 5. Xóa sạch giỏ hàng sau khi đặt thành công
            $cart->items()->delete();

            // Load trước các quan hệ để trả về JSON cho đẹp
            return $order->load(['items.variant.product', 'address', 'paymentMethod']);
        });
    }

    // Hàm lấy danh sách đơn hàng của User
    public function getUserOrders(User $user)
    {
        return Order::with(['items.variant.product', 'paymentMethod'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
