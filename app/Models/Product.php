<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';
    public $timestamps = false;
    protected $fillable = ['category_id', 'name', 'description', 'ingredients', 'brewing_guide', 'is_organic', 'slug', 'status'];

    // Quan hệ với các bảng khác
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function attributes()
    {
        return $this->hasMany(ProductAttribute::class, 'product_id');
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }
    public function variants()
    {
        return $this->hasMany(ProductVariant::class, 'product_id');
    }
}
