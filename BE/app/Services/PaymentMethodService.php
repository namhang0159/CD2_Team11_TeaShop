<?php

namespace App\Services;

use App\Models\PaymentMethod;

class PaymentMethodService
{
    public function getActiveMethods()
    {
        // Chỉ lấy những phương thức đang bật (is_active = 1)
        return PaymentMethod::where('is_active', 1)->get();
    }
}
