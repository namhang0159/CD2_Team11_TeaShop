<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Admin\UploadController as AdminUploadController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\PostController;

// Các API không cần đăng nhập
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/admin/login', [AuthController::class, 'loginAdmin']); // API đăng nhập cho admin
// Public Routes
Route::get('/categories', [ProductController::class, 'categories']);
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/payment-methods', [PaymentMethodController::class, 'index']);
// Webhook cho VNPay
Route::get('/payment/vnpay-ipn', [PaymentController::class, 'vnpayIpn']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);

// Link VNPay trả khách về (Dùng xử lý lúc đang dev ở localhost)
Route::get('/payment/vnpay-return', [PaymentController::class, 'vnpayReturn']);

// Các API bắt buộc phải có Token (Đã đăng nhập)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    // API Giỏ hàng
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{itemId}', [CartController::class, 'update']);
    Route::delete('/cart/{itemId}', [CartController::class, 'destroy']);
    // API Don Hang
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders/checkout', [OrderController::class, 'store']);
    // API Dia Chi
    Route::get('/addresses', [AddressController::class, 'index']);
    Route::post('/addresses', [AddressController::class, 'store']);
    Route::put('/addresses/{id}', [AddressController::class, 'update']); // Sửa
    Route::delete('/addresses/{id}', [AddressController::class, 'destroy']); // Xóa
    // API Lấy link VNPay
    Route::post('/payment/vnpay/{orderId}', [PaymentController::class, 'createPaymentUrl']);

    //
    Route::middleware(['auth:sanctum', \App\Http\Middleware\CheckAdmin::class])->prefix('admin')->group(function () {

        // API Upload Ảnh
        Route::post('/upload', [AdminUploadController::class, 'uploadImage']);

        // API Danh Mục
        Route::get('/categories', [AdminCategoryController::class, 'index']);
        Route::post('/categories', [AdminCategoryController::class, 'store']);
        Route::put('/categories/{id}', [AdminCategoryController::class, 'update']);
        Route::delete('/categories/{id}', [AdminCategoryController::class, 'destroy']);

        // API Sản Phẩm
        Route::post('/products', [AdminProductController::class, 'store']);
        Route::put('/products/edit/{id}', [AdminProductController::class, 'edit']); // Dùng POST để gửi dữ liệu cập nhật
        Route::delete('/products/{id}', [AdminProductController::class, 'destroy']);

        // Quản lý Đơn Hàng (Admin Order)
        Route::get('/orders', [AdminOrderController::class, 'index']); // Xem danh sách
        Route::get('/orders/{id}', [AdminOrderController::class, 'show']); // Xem chi tiết
        Route::put('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']); // Đổi trạng thái
        Route::post('/posts', [PostController::class, 'store']);
        Route::put('/posts/{id}', [PostController::class, 'update']);
        Route::delete('/posts/{id}', [PostController::class, 'destroy']);
        Route::get('/post-categories', [PostCategoryController::class, 'index']);  
        Route::post('/post-categories', [PostCategoryController::class, 'store']);
        Route::put('/post-categories/{id}', [PostCategoryController::class, 'update']);
        Route::delete('/post-categories/{id}', [PostCategoryController::class, 'destroy']); 
        Route::get('customers', [CustomerController::class, 'index']); // Xem danh sách khách hàng
        Route::get('customers/{id}', [CustomerController::class, 'show']); // Xem chi tiết khách hàng
    });
});
