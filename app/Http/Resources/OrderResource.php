<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'order_id' => $this->id,
            'status' => $this->status,
            'payment_status' => $this->payment_status,
            'total_amount' => (float) $this->total_amount,
            'shipping_fee' => (float) $this->shipping_fee,
            'created_at' => $this->created_at,
            'payment_method' => $this->whenLoaded('paymentMethod', fn() => $this->paymentMethod->name),
            'shipping_address' => $this->whenLoaded('address'),
            'items' => $this->whenLoaded('items', function () {
                return $this->items->map(function ($item) {
                    return [
                        'variant_id' => $item->variant_id,
                        'product_name' => $item->variant->product->name ?? '',
                        'option_name' => $item->variant->option_name ?? '',
                        'quantity' => $item->quantity,
                        'price_at_purchase' => (float) $item->price_at_purchase,
                    ];
                });
            }),
        ];
    }
}
