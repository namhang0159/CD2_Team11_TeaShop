<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\CheckoutRequest;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService) {}

    // Lịch sử mua hàng
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $orders = $this->orderService->getUserOrders($user);

        return OrderResource::collection($orders);
    }

    // Đặt hàng (Checkout)
    public function store(CheckoutRequest $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $order = $this->orderService->checkout($user, $request->validated());

        return response()->json([
            'message' => 'Đặt hàng thành công!',
            'data' => new OrderResource($order)
        ], 201);
    }
}
