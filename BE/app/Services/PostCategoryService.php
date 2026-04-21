<?php

namespace App\Services;

use App\Models\PostCategory;




    class PostCategoryService
    {
        public function getAll()
        {
            return PostCategory::withCount('posts')->get();
        }

        public function getById($id)
        {
            return PostCategory::findOrFail($id);
        }

        public function create($data)
        {
            return PostCategory::create([
                'name' => $data['name']
            ]);
        }

        public function update($id, $data)
        {
            $category = PostCategory::findOrFail($id);
            $category->update([
                'name' => $data['name']
            ]);
            return $category;
        }

        public function delete($id)
        {
            $category = PostCategory::findOrFail($id);
            if ($category->posts()->count() > 0) {
                throw new \Exception('Không thể xóa danh mục đang chứa bài viết!');
            }
            $category->delete();
            return true;
        }
    }