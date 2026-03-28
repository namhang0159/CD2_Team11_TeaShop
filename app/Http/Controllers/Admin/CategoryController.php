<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Services\AdminCategoryService;
use App\Models\Category;

class CategoryController extends Controller
{
    public function __construct(protected AdminCategoryService $service) {}

    public function index()
    {
        $categories = Category::withCount('products')->orderByDesc('id')->get();
        return response()->json(['data' => $categories]);
    }
    public function store(StoreCategoryRequest $request)
    {
        $category = $this->service->createCategory($request->validated());
        return response()->json(['message' => 'Thành công', 'data' => $category], 201);
    }
    public function update(UpdateCategoryRequest $request, $id)
    {
        $category = $this->service->updateCategory($id, $request->validated());
        return response()->json(['message' => 'Thành công', 'data' => $category]);
    }
    public function destroy($id)
    {
        $this->service->deleteCategory($id);
        return response()->json(['message' => 'Đã xóa']);
    }
}
