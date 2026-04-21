<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'is_organic' => (bool) $this->is_organic,
            'status' => $this->status,
            'category' => new CategoryResource($this->whenLoaded('category')),

            // Map mảng hình ảnh chỉ lấy danh sách URL cho Frontend dễ render
            'images' => $this->whenLoaded('images', function () {
                return $this->images->pluck('url');
            }),

            // Map các thuộc tính (VD: { "Nguồn gốc": "Thái Nguyên", "Hương vị": "Chát nhẹ" })
            'attributes' => $this->whenLoaded('attributes', function () {
                return $this->attributes->mapWithKeys(function ($attr) {
                    return [$attr->attribute_name => $attr->attribute_value];
                });
            }),

            // Map Biến thể và Tính luôn tổng số lượng tồn kho còn hạn sử dụng
            'variants' => $this->whenLoaded('variants', function () {
                return $this->variants->map(function ($variant) {
                    return [
                        'id' => $variant->id,
                        'option_name' => $variant->option_name,
                        'price' => (float) $variant->price,
                        'stock' => $variant->available_stock // Lấy từ hàm getAvailableStockAttribute ở Model
                    ];
                });
            }),

            // Chi tiết dài (chỉ trả về khi xem chi tiết 1 sản phẩm)
            'description' => $this->when(!request()->routeIs('products.index'), $this->description),
            'ingredients' => $this->when(!request()->routeIs('products.index'), $this->ingredients),
            'brewing_guide' => $this->when(!request()->routeIs('products.index'), $this->brewing_guide),
        ];
    }
}
