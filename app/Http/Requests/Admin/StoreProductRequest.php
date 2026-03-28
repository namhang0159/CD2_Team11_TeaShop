<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'category_id' => 'required|integer|exists:category,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'ingredients' => 'nullable|string',
            'brewing_guide' => 'nullable|string',
            'is_organic' => 'boolean',
            'status' => 'in:active,inactive',

            // Nhận một mảng chứa các Link ảnh đã upload
            'images' => 'required|array|min:1',
            'images.*' => 'required|string',

            'attributes' => 'nullable|array',
            'attributes.*.name' => 'required|string|max:50',
            'attributes.*.value' => 'required|string|max:255',

            'variants' => 'required|array|min:1',
            'variants.*.option_name' => 'required|string|max:20',
            'variants.*.price' => 'required|numeric|min:0',
        ];
    }
}
