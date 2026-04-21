<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Lấy thông tin biến thể và sản phẩm cha
        $variant = $this->variant;
        $product = $variant->product;

        return [
            'cart_item_id' => $this->id,
            'variant_id' => $variant->id,
            'product_name' => $product->name,
            'option_name' => $variant->option_name,
            'price' => (float) $variant->price,
            'quantity' => $this->quantity,
            'total_price' => (float) ($variant->price * $this->quantity),
            // Lấy ảnh đầu tiên của sản phẩm làm ảnh đại diện giỏ hàng
            'image_url' => $product->images->first()->url ?? null,
            'available_stock' => $variant->available_stock, // Trả về kho thực tế để FE cảnh báo nếu sắp hết
        ];
    }
}
