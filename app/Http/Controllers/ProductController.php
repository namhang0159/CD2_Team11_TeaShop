<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(protected ProductService $productService) {}

    public function categories()
    {
        $categories = $this->productService->getAllCategories();
        return CategoryResource::collection($categories);
    }

    public function index(Request $request)
    {
        $products = $this->productService->getProducts($request->all());
        return ProductResource::collection($products); // Tự động trả về chuẩn phân trang
    }

    public function show($slug)
    {
        $product = $this->productService->getProductDetail($slug);
        return new ProductResource($product);
    }
}
