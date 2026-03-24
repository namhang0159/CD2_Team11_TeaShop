<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        // Kiểm tra: Phải đăng nhập rồi, và role bắt buộc phải là 'admin'
        if (!$user || !$user->isAdmin()) {
            return response()->json([
                'message' => 'Lỗi 403: Bạn không có quyền truy cập vào chức năng của Admin!'
            ], 403); // 403 Forbidden
        }

        return $next($request); // Đủ quyền thì cho đi tiếp
    }
}
