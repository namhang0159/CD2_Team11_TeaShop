<?php
namespace App\Services;
use App\Models\Supplier;
class SupplierService
{
    public function createSupplier(array $data)
    {
        return Supplier::create([
            'name' => $data['name'],
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
            'created_at' => now()
        ]);
    }
    public function getAllSuppliers()
    {
        return Supplier::all();
    }
    public function deleteSupplier($id)
    {
        $supplier = Supplier::find($id);
        if ($supplier) {
            $supplier->delete();
            return true;
        }
        return false;
    }
}