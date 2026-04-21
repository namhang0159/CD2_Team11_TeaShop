<?php

namespace App\Services;

use App\Models\InventoryBatch;
use Illuminate\Support\Facades\DB;

class InventoryService
{
    public function getInventory()
    {
        return DB::table('inventory_batch')
            ->join('product_variant', 'inventory_batch.variant_id', '=', 'product_variant.id')
            ->join('product', 'product_variant.product_id', '=', 'product.id')
            ->select(
                'inventory_batch.id',
                'product.name as product_name',
                'product_variant.option_name',
                'inventory_batch.batch_code',
                'inventory_batch.stock_quantity',
                'inventory_batch.expiry_date'
            )
            ->orderBy('product.name')
            ->get();
    }
    public function import(array $items)
    {
        DB::beginTransaction();

        try {
            $seen = [];

            foreach ($items as $item) {

                // Check trùng trong request
                $key = $item['variant_id'] . '_' . $item['batch_code'];

                if (isset($seen[$key])) {
                    throw new \Exception("Trùng batch trong request: " . $key);
                }

                $seen[$key] = true;

                // Tìm batch
                $batch = InventoryBatch::where('variant_id', $item['variant_id'])
                    ->where('batch_code', $item['batch_code'])
                    ->first();

                if ($batch) {
                    // Update tồn
                    $batch->update([
                        'stock_quantity' => $batch->stock_quantity + $item['quantity'],
                        'expiry_date' => $item['expiry_date'] ?? $batch->expiry_date
                    ]);
                } else {
                    // Tạo mới
                    InventoryBatch::create([
                        'variant_id' => $item['variant_id'],
                        'batch_code' => $item['batch_code'],
                        'stock_quantity' => $item['quantity'],
                        'expiry_date' => $item['expiry_date']
                    ]);
                }

                // (Optional) lưu history
                DB::table('inventory_import_history')->insert([
                    'variant_id' => $item['variant_id'],
                    'batch_code' => $item['batch_code'],
                    'quantity' => $item['quantity']
                ]);
            }

            DB::commit();

            return [
                'success' => true,
                'total' => count($items)
            ];

        } catch (\Exception $e) {
            DB::rollBack();

            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }
    public function importWithOrder(array $data)
    {
        DB::beginTransaction();

        try {
            // 1. Tính tổng tiền
            $total = 0;
            foreach ($data['items'] as $item) {
                $total += $item['quantity'] * $item['price'];
            }

            // 2. Tạo phiếu nhập
            $importId = DB::table('inventory_import')->insertGetId([
                'supplier_id' => $data['supplier_id'],
                'import_date' => $data['import_date'],
                'status' => $data['status'],
                'total_amount' => $total
            ]);

            // 3. Lưu chi tiết + nhập kho nếu completed
            foreach ($data['items'] as $item) {

                // Lưu chi tiết
                DB::table('inventory_import_item')->insert([
                    'import_id' => $importId,
                    'variant_id' => $item['variant_id'],
                    'batch_code' => $item['batch_code'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'expiry_date' => !empty($item['expiry_date']) ? $item['expiry_date'] : $batch->expiry_date
                ]);

                // Nếu đã hoàn thành thì cập nhật kho
                if ($data['status'] === 'completed') {

                    $batch = DB::table('inventory_batch')
                        ->where('variant_id', $item['variant_id'])
                        ->where('batch_code', $item['batch_code'])
                        ->first();

                    if ($batch) {
                        DB::table('inventory_batch')
                            ->where('id', $batch->id)
                            ->update([
                                'stock_quantity' => $batch->stock_quantity + $item['quantity'],
                                'expiry_date' => $item['expiry_date'] ?? $batch->expiry_date
                            ]);
                    } else {
                        DB::table('inventory_batch')->insert([
                            'variant_id' => $item['variant_id'],
                            'batch_code' => $item['batch_code'],
                            'stock_quantity' => $item['quantity'],
                            'expiry_date' => $item['expiry_date']
                        ]);
                    }
                }
            }

            DB::commit();

            return [
                'success' => true,
                'import_id' => $importId,
                'total_amount' => $total
            ];

        } catch (\Exception $e) {
            DB::rollBack();

            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }
    public function getImports()
    {
        return DB::table('inventory_import')
            ->join('suppliers', 'inventory_import.supplier_id', '=', 'suppliers.id')
            ->select(
                'inventory_import.id',
                'suppliers.name as supplier_name',
                'inventory_import.import_date',
                'inventory_import.status',
                'inventory_import.total_amount',
                DB::raw('COUNT(inventory_import_item.id) as total_items')
            )
            ->leftJoin('inventory_import_item', 'inventory_import.id', '=', 'inventory_import_item.import_id')
            ->groupBy(
                'inventory_import.id',
                'suppliers.name',
                'inventory_import.import_date',
                'inventory_import.status',
                'inventory_import.total_amount'
            )
            ->orderByDesc('inventory_import.id')
            ->get();
    }
    public function getImportDetail($id)
    {
        // 1. Lấy thông tin phiếu nhập
        $import = DB::table('inventory_import')
            ->join('suppliers', 'inventory_import.supplier_id', '=', 'suppliers.id')
            ->where('inventory_import.id', $id)
            ->select(
                'inventory_import.id',
                'suppliers.name as supplier_name',
                'suppliers.id as supplier_id',
                'suppliers.phone as supplier_phone',
                'suppliers.address as supplier_address',
                'inventory_import.import_date',
                'inventory_import.status',
                'inventory_import.total_amount'
            )
            ->first();

        if (!$import) {
            return null;
        }

        // 2. Lấy items
        $items = DB::table('inventory_import_item')
            ->join('product_variant', 'inventory_import_item.variant_id', '=', 'product_variant.id')
            ->join('product', 'product_variant.product_id', '=', 'product.id')
            ->where('inventory_import_item.import_id', $id)
            ->select(
                'inventory_import_item.id',
                'product.name as product_name',
                'product_variant.option_name',
                'inventory_import_item.batch_code',
                'inventory_import_item.quantity',
                'inventory_import_item.price',
                'inventory_import_item.expiry_date',
                DB::raw('(inventory_import_item.quantity * inventory_import_item.price) as line_total')
            )
            ->get();

        // 3. Format lại cho FE dùng luôn
        return [
            'id' => $import->id,
            'importCode' => 'IMP-' . $import->id,
            'suppliers' => [
                'supplierId' => $import->supplier_id,
                'supplierName' => $import->supplier_name,
                'supplierPhone' => $import->supplier_phone,
                'supplierAddress' => $import->supplier_address
            ],
            'importDate' => $import->import_date,
            'status' => $import->status,
            'totalAmount' => (float) $import->total_amount,

            'items' => $items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'productName' => $item->product_name,
                    'optionName' => $item->option_name,
                    'batchCode' => $item->batch_code,
                    'quantity' => (int) $item->quantity,
                    'importPrice' => (float) $item->price,
                    'expiryDate' => $item->expiry_date,
                    'lineTotal' => (float) $item->line_total,
                ];
            })
        ];
    }
}