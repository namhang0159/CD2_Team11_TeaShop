<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Services\SupplierService;
use Illuminate\Http\Request;
class SupplierController extends Controller
{
    protected $supplierService;

    public function __construct(SupplierService $supplierService)
    {
        $this->supplierService = $supplierService;
    }
    // Các phương thức quản lý nhà cung cấp sẽ được thêm vào đây
    public function index()
    {
        // Lấy danh sách nhà cung cấp
        $suppliers = $this->supplierService->getAllSuppliers();

        return response()->json([
            'data' => $suppliers
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255'
        ]);

        $supplier = $this->supplierService->createSupplier($request->only(['name', 'phone', 'address']));

        return response()->json([
            'message' => 'Nhà cung cấp được tạo thành công',
            'data' => $supplier
        ], 201);
    }
    public function destroy($id)
    {
        $result = $this->supplierService->deleteSupplier($id);

        if ($result) {
            return response()->json([
                'message' => 'Nhà cung cấp đã được xóa thành công'
            ]);
        } else {
            return response()->json([
                'message' => 'Không tìm thấy nhà cung cấp'
            ], 404);
        }
    }
}