<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $table = 'product_variant';
    public $timestamps = false;
    protected $fillable = ['product_id', 'option_name', 'price'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function batches()
    {
        return $this->hasMany(InventoryBatch::class, 'variant_id');
    }

    // Hàm phụ trợ tính tổng tồn kho từ các lô chưa hết hạn
    public function getAvailableStockAttribute()
    {
        return $this->batches()
            ->where('expiry_date', '>', now())
            ->sum('stock_quantity');
    }
    public function getCalculatedStockAttribute()
    {
        return $this->batches()
            ->where(function ($q) {
                $q->whereNull('expiry_date') 
                ->orWhere('expiry_date', '>', now()); 
            })
            ->sum('stock_quantity');
    }

    protected $appends = ['stock'];
}
