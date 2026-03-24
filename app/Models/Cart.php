<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'cart';
    public $timestamps = false;
    protected $fillable = ['user_id', 'created_at'];

    public function items()
    {
        return $this->hasMany(CartItem::class, 'cart_id');
    }
}
