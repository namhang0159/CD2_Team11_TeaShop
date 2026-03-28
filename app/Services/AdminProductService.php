<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminProductService
{
    public function createProduct(array $data)
    {
        return DB::transaction(function () use ($data) {
            $product = Product::create([
                'category_id' => $data['category_id'],
                'name' => $data['name'],
                'slug' => Str::slug($data['name']) . '-' . time(),
                'description' => $data['description'] ?? null,
                'ingredients' => $data['ingredients'] ?? null,
                'brewing_guide' => $data['brewing_guide'] ?? null,
                'is_organic' => $data['is_organic'] ?? 0,
                'status' => $data['status'] ?? 'active',
            ]);

            foreach ($data['images'] as $url) {
                $product->images()->create(['url' => $url]);
            }

            if (!empty($data['attributes'])) {
                foreach ($data['attributes'] as $attr) {
                    $product->attributes()->create(['attribute_name' => $attr['name'], 'attribute_value' => $attr['value']]);
                }
            }

            foreach ($data['variants'] as $variant) {
                $product->variants()->create(['option_name' => $variant['option_name'], 'price' => $variant['price']]);
            }

            return $product->load(['images', 'attributes', 'variants']);
        });
    }

    public function deleteProduct($id)
    {
        Product::findOrFail($id)->delete();
        return true;
    }
}
