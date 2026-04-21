<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $table = 'order_item';
    public $timestamps = false;
    protected $fillable = ['order_id', 'variant_id', 'quantity', 'price_at_purchase'];

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }
}
