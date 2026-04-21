<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class CartService
{
    // Lấy giỏ hàng của user (Nếu chưa có thì tự tạo)
    public function getCartForUser(User $user)
    {
        $cart = Cart::firstOrCreate(
            ['user_id' => $user->id],
            ['created_at' => now()]
        );

        // Load sẵn các quan hệ để tính giá và lấy ảnh (Tránh N+1)
        return $cart->load(['items.variant.product.images', 'items.variant.batches']);
    }

    // Thêm vào giỏ
    public function addToCart(User $user, array $data)
    {
        $cart = $this->getCartForUser($user);
        $variant = ProductVariant::findOrFail($data['variant_id']);

        $cartItem = $cart->items()->where('variant_id', $data['variant_id'])->first();

        // Tính tổng số lượng muốn mua (nếu đã có trong giỏ thì cộng dồn)
        $newQuantity = $cartItem ? ($cartItem->quantity + $data['quantity']) : $data['quantity'];

        // Kiểm tra tồn kho
        if ($variant->available_stock < $newQuantity) {
            throw ValidationException::withMessages([
                'quantity' => ['Sản phẩm này chỉ còn ' . $variant->available_stock . ' sản phẩm trong kho.']
            ]);
        }

        if ($cartItem) {
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            $cart->items()->create([
                'variant_id' => $data['variant_id'],
                'quantity' => $data['quantity']
            ]);
        }

        return $this->getCartForUser($user); // Trả về giỏ hàng mới nhất
    }

    // Cập nhật số lượng 1 item trong giỏ
    public function updateItemQuantity(User $user, $itemId, $quantity)
    {
        $cart = $this->getCartForUser($user);
        $cartItem = $cart->items()->where('id', $itemId)->firstOrFail();
        $variant = $cartItem->variant;

        if ($variant->available_stock < $quantity) {
            throw ValidationException::withMessages([
                'quantity' => ['Không đủ tồn kho. Chỉ còn ' . $variant->available_stock . ' sản phẩm.']
            ]);
        }

        $cartItem->update(['quantity' => $quantity]);

        return $this->getCartForUser($user);
    }

    // Xóa 1 item khỏi giỏ
    public function removeItem(User $user, $itemId)
    {
        $cart = $this->getCartForUser($user);
        $cart->items()->where('id', $itemId)->delete();

        return $this->getCartForUser($user);
    }
}
