<?php

namespace App\Http\Requests\Address;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'receiver_name' => 'sometimes|required|string|max:100',
            'phone' => 'sometimes|required|string|max:15',
            'details' => 'sometimes|required|string|max:255',
            'is_default' => 'nullable|boolean',
        ];
    }
}
