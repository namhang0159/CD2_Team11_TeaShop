<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderStatusRequest extends FormRequest
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
            // Các trạng thái giao hàng chuẩn
            'status' => 'sometimes|required|string|in:Pending,Processing,Shipped,Delivered,Cancelled',

            // Các trạng thái thanh toán chuẩn
            'payment_status' => 'sometimes|required|string|in:Unpaid,Paid,Refunded',
        ];
    }
}
