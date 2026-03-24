<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        // Validate tự động, qua được thì gọi Service
        $result = $this->authService->register($request->validated());

        return response()->json([
            'message' => 'Đăng ký thành công',
            'data' => [
                'user' => new UserResource($result['user']), // Đẩy qua Resource format lại
                'token' => $result['token'],
            ]
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'data' => [
                'user' => new UserResource($result['user']),
                'token' => $result['token'],
            ]
        ]);
    }

    // public function logout(): JsonResponse
    // {
    //     $this->authService->logout(auth()->user());

    //     return response()->json([
    //         'message' => 'Đăng xuất thành công'
    //     ]);
    // }

    public function logout(\Illuminate\Http\Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $this->authService->logout($user);

        return response()->json([
            'message' => 'Đăng xuất thành công'
        ]);
    }

    // API Lấy thông tin user hiện tại
    // public function me(): JsonResponse
    // {
    //     return response()->json([
    //         'data' => new UserResource(auth()->user())
    //     ]);
    // }
    public function me(\Illuminate\Http\Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        return response()->json([
            'data' => new UserResource($user)
        ]);
    }
}
