<?php

namespace App\Http\Requests\Order;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'shipping_address_id' => 'required|integer|exists:address,id',
            'payment_method_id' => 'required|integer|exists:payment_method,id',
            'shipping_fee' => 'required|numeric|min:0', // Frontend có thể truyền phí ship lên (hoặc backend tự tính)
        ];
    }
}
