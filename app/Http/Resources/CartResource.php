<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'cart_id' => $this->id,
            'items' => CartItemResource::collection($this->whenLoaded('items')),
            'cart_total' => $this->items->sum(function ($item) {
                return $item->quantity * $item->variant->price;
            })
        ];
    }
}
