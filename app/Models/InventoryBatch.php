<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryBatch extends Model
{
    protected $table = 'inventory_batch';
    public $timestamps = false;
    protected $fillable = ['variant_id', 'batch_code', 'stock_quantity', 'expiry_date'];
}
