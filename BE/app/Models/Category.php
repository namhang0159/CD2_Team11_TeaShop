<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'category';
    public $timestamps = false;
    protected $fillable = ['name', 'image_url', 'slug', 'description', 'created_at'];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
