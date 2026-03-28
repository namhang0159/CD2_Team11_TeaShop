<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
            $url = asset('storage/' . $path);

            return response()->json([
                'message' => 'Tải ảnh lên thành công!',
                'data' => ['url' => $url]
            ]);
        }
        return response()->json(['message' => 'Lỗi tải ảnh'], 400);
    }
}
