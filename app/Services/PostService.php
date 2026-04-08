<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Str;

class PostService
{
    // 📌 Lấy tất cả bài viết
    public function getAll()
    {
        return Post::with('category')
            ->where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    // 📌 Lấy chi tiết theo slug
    public function getBySlug($slug)
    {
        return Post::with('category')
            ->where('slug', $slug)
            ->firstOrFail();
    }

    // 📌 Tạo bài viết
    public function create($data)
    {
        $slug = Str::slug($data['title']);

        // tránh trùng slug
        $count = Post::where('slug', 'LIKE', "$slug%")->count();
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        return Post::create([
            'title' => $data['title'],
            'slug' => $slug,
            'excerpt' => $data['excerpt'] ?? null,
            'content' => $data['content'],
            'category_id' => $data['category_id'] ?? null,
            'thumbnail' => $data['thumbnail'] ?? null,
            'author_name' => $data['author_name'] ?? 'Admin',
            'status' => $data['status'] ?? 'draft',
            'published_at' => now()
        ]);
    }

    // 📌 Update bài viết
    public function update($id, $data)
    {
        $post = Post::findOrFail($id);

        $slug = Str::slug($data['title']);

        // tránh trùng slug (trừ chính nó)
        $count = Post::where('slug', 'LIKE', "$slug%")
            ->where('id', '!=', $id)
            ->count();

        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        $post->update([
            'title' => $data['title'],
            'slug' => $slug,
            'excerpt' => $data['excerpt'] ?? null,
            'content' => $data['content'],
            'category_id' => $data['category_id'] ?? null,
            'thumbnail' => $data['thumbnail'] ?? null,
            'status' => $data['status'] ?? $post->status
        ]);

        return $post;
    }

    // 📌 Xoá bài
    public function delete($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return true;
    }
}