<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentMethodResource;
use App\Services\PaymentMethodService;

class PaymentMethodController extends Controller
{
    public function __construct(protected PaymentMethodService $paymentMethodService) {}

    public function index()
    {
        $methods = $this->paymentMethodService->getActiveMethods();
        return PaymentMethodResource::collection($methods);
    }
}
