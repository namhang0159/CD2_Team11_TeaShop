<?php

namespace App\Services;

use App\Models\Order;

class AdminOrderService
{
    // 1. Lấy danh sách tất cả đơn hàng (Phân trang 15 đơn/trang)
    public function getAllOrders()
    {
        return Order::with(['user', 'paymentMethod'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);
    }

    // 2. Xem chi tiết 1 đơn hàng (Kéo theo tất cả ruột gan phèo phổi của đơn đó)
    public function getOrderDetail($id)
    {
        return Order::with([
            'user',
            'address',
            'paymentMethod',
            'items.variant.product' // Kéo luôn thông tin sản phẩm của từng item
        ])->findOrFail($id);
    }

    // 3. Cập nhật trạng thái
    public function updateOrderStatus($id, array $data)
    {
        return \Illuminate\Support\Facades\DB::transaction(function () use ($id, $data) {
            // Lấy đơn hàng kèm theo chi tiết các món đã mua
            $order = \App\Models\Order::with('items')->findOrFail($id);

            // LOGIC HOÀN KHO KHI HỦY ĐƠN
            // Nếu trạng thái truyền lên là Cancelled VÀ đơn này trước đó chưa bị Cancelled
            if (isset($data['status']) && $data['status'] === 'Cancelled' && $order->status !== 'Cancelled') {

                foreach ($order->items as $item) {
                    // Tìm lô hàng còn hạn sử dụng gần nhất của sản phẩm này để cộng trả lại kho
                    $batch = \App\Models\InventoryBatch::where('variant_id', $item->variant_id)
                        ->where('expiry_date', '>', now())
                        ->orderBy('expiry_date', 'asc')
                        ->first();

                    // Nếu còn lô hàng, cộng trả lại số lượng
                    if ($batch) {
                        $batch->stock_quantity += $item->quantity;
                        $batch->save();
                    } else {
                        // (Tùy chọn) Nếu mọi lô đã hết hạn, có thể tạo 1 lô mới hoặc cảnh báo
                    }
                }
            }

            // Tiến hành cập nhật trạng thái
            $order->update($data);

            return $order;
        });
    }
}
