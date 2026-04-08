<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'post';

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'category_id',
        'thumbnail',
        'author_name',
        'status',
        'published_at'
    ];

    public function category()
    {
        return $this->belongsTo(PostCategory::class, 'category_id');
    }
}