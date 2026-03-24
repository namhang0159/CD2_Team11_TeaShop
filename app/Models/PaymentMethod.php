<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    protected $table = 'payment_method';
    public $timestamps = false;
    protected $fillable = ['name', 'is_active'];
}
