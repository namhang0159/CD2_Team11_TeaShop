<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Services\AdminProductService;
use Symfony\Component\HttpKernel\HttpCache\Store;

class ProductController extends Controller
{
    public function __construct(protected AdminProductService $service) {}

    public function store(StoreProductRequest $request)
    {
        $product = $this->service->createProduct($request->validated());
        return response()->json(['message' => 'Thêm sản phẩm thành công', 'data' => $product], 201);
    }
    public function destroy($id)
    {
        $this->service->deleteProduct($id);
        return response()->json(['message' => 'Đã xóa sản phẩm']);
    }
    public function edit(StoreProductRequest $request, $id){
        // Tương tự như store nhưng gọi service update
        $product = $this->service->updateProduct($id,array_merge($request->validated()));
        return response()->json(['message' => 'Cập nhật sản phẩm thành công', 'data' => $product]);
    }
}
