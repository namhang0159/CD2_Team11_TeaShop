<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    public $timestamps = false;
    protected $fillable = ['user_id', 'payment_method_id', 'total_amount', 'status', 'shipping_address_id', 'shipping_fee', 'payment_status', 'created_at'];

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
    public function address()
    {
        return $this->belongsTo(Address::class, 'shipping_address_id');
    }
    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
