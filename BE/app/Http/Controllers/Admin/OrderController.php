<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateOrderStatusRequest;
use App\Services\AdminOrderService;

class OrderController extends Controller
{
    public function __construct(protected AdminOrderService $adminOrderService) {}

    // Lấy danh sách đơn hàng
    public function index()
    {
        $orders = $this->adminOrderService->getAllOrders();
        return response()->json($orders);
    }

    // Xem chi tiết
    public function show($id)
    {
        $order = $this->adminOrderService->getOrderDetail($id);
        return response()->json(['data' => $order]);
    }

    // Sửa trạng thái
    public function updateStatus(UpdateOrderStatusRequest $request, $id)
    {
        $order = $this->adminOrderService->updateOrderStatus($id, $request->validated());

        return response()->json([
            'message' => 'Cập nhật trạng thái đơn hàng thành công!',
            'data' => $order
        ]);
    }
}
