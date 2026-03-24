<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Product;

class ProductService
{
    public function getAllCategories()
    {
        return Category::all();
    }

    public function getProducts($filters = [])
    {
        // Query builder, dùng Eager Loading (with) để không bị lỗi N+1
        $query = Product::with(['category', 'images', 'variants.batches'])->where('status', 'active');

        // Lọc theo category slug nếu có truyền vào
        if (isset($filters['category'])) {
            $query->whereHas('category', function ($q) use ($filters) {
                $q->where('slug', $filters['category']);
            });
        }

        // Search theo tên
        if (isset($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        // Phân trang (12 sản phẩm/trang)
        return $query->paginate(12);
    }

    public function getProductDetail($slug)
    {
        // Lấy chi tiết 1 sản phẩm kèm toàn bộ râu ria
        return Product::with(['category', 'images', 'attributes', 'variants.batches'])
            ->where('slug', $slug)
            ->where('status', 'active')
            ->firstOrFail(); // Không thấy sẽ tự văng lỗi 404
    }
}
