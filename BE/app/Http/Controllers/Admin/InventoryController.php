<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\InventoryService;

class InventoryController extends Controller
{
    protected $inventoryService;

    public function __construct(InventoryService $inventoryService)
    {
        $this->inventoryService = $inventoryService;
    }
    public function index()
    {
        $data = $this->inventoryService->getInventory();

        return response()->json([
            'data' => $data
        ]);
    }
    public function import(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.variant_id' => 'required|exists:product_variant,id',
            'items.*.batch_code' => 'required|string|max:50',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.expiry_date' => 'nullable|date'
        ]);

        $result = $this->inventoryService->import($request->items);

        if (!$result['success']) {
            return response()->json([
                'message' => 'Lỗi nhập kho',
                'error' => $result['message']
            ], 400);
        }

        return response()->json([
            'message' => 'Nhập kho thành công',
            'total_items' => $result['total']
        ]);
    }
    public function importwithOrders(Request $request)
    {
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'import_date' => 'required|date',
            'status' => 'required|in:pending,completed,cancelled',
            'items' => 'required|array|min:1',
            'items.*.variant_id' => 'required|exists:product_variant,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0'
        ]);

        $result = $this->inventoryService->importWithOrder($request->all());

        if (!$result['success']) {
            return response()->json([
                'message' => 'Lỗi nhập kho',
                'error' => $result['message']
            ], 400);
        }

        return response()->json([
            'message' => 'Tạo phiếu nhập thành công',
            'import_id' => $result['import_id'],
            'total_amount' => $result['total_amount']
        ]);
    }
    public function imports()
    {
        $data = $this->inventoryService->getImports();

        return response()->json([
            'data' => $data
        ]);
    }

    public function importDetail($id)
    {
        $data = $this->inventoryService->getImportDetail($id);

        return response()->json([
            'data' => $data
        ]);
    }
}