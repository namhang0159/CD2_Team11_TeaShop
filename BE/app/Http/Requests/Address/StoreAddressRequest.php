<?php

namespace App\Http\Requests\Address;

use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'receiver_name' => 'required|string|max:100',
            'phone' => 'required|string|max:15',
            'details' => 'required|string|max:255',
            'is_default' => 'nullable|boolean',
        ];
    }
}
