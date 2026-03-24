<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\PaymentController;

// Các API không cần đăng nhập
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Public Routes
Route::get('/categories', [ProductController::class, 'categories']);
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/payment-methods', [PaymentMethodController::class, 'index']);
// Webhook cho VNPay
Route::get('/payment/vnpay-ipn', [PaymentController::class, 'vnpayIpn']);

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
});
