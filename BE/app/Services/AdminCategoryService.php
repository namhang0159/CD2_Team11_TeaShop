<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AdminCategoryService
{
    public function createCategory(array $data)
    {
        $data['slug'] = Str::slug($data['name']);
        $data['created_at'] = now();
        return Category::create($data);
    }
    public function updateCategory($id, array $data)
    {
        $category = Category::findOrFail($id);
        if (isset($data['name']) && $data['name'] !== $category->name) {
            $data['slug'] = Str::slug($data['name']);
        }
        $category->update($data);
        return $category;
    }
    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);
        if ($category->products()->count() > 0) {
            throw ValidationException::withMessages(['category' => ['Không thể xóa danh mục đang chứa sản phẩm!']]);
        }
        $category->delete();
        return true;
    }
}
