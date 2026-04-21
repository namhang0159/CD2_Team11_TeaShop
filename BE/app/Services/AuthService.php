<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function register(array $data)
    {
        $user = User::create([
            'full_name' => $data['full_name'],
            'email' => $data['email'], // Lấy email từ request
            'phone_number' => $data['phone_number'] ?? null,
            'password_hash' => Hash::make($data['password']),
            'created_at' => now()
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return ['user' => $user, 'token' => $token];
    }

    public function login(array $data)
    {
        // 1. Tìm user theo Email
        $user = User::where('email', $data['email'])->first();

        // 2. Check user tồn tại và mật khẩu khớp
        if (!$user || !Hash::check($data['password'], $user->password_hash)) {
            throw ValidationException::withMessages([
                'email' => ['Email hoặc mật khẩu không chính xác.'], // Đổi câu thông báo lỗi
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return ['user' => $user, 'token' => $token];
    }
    public function createAccountForAdmin(array $data)
    {
        $admin = User::create([
            'full_name' => $data['full_name'],
            'email' => $data['email'], // Lấy email từ request
            'phone_number' => $data['phone_number'] ?? null,
            'password_hash' => Hash::make($data['password']),
            'role' => 'admin',
            'created_at' => now()
        ]);

        return $admin;
    }
    public function loginAdmin(array $data)
    {
        // 1. Tìm admin theo Email
        $admin = User::where('email', $data['email'])->where('role', 'admin')->first();

        // 2. Check admin tồn tại và mật khẩu khớp
        if (!$admin || !Hash::check($data['password'], $admin->password_hash)) {
            throw ValidationException::withMessages([
                'email' => ['Email hoặc mật khẩu không chính xác.'], // Đổi câu thông báo lỗi
            ]);
        }

        $token = $admin->createToken('auth_token')->plainTextToken;

        return ['admin' => $admin, 'token' => $token];
    }
    public function logout(User $user)
    {
        /** @var \Laravel\Sanctum\PersonalAccessToken $token */
        $token = $user->currentAccessToken();

        if ($token) {
            $token->delete();
        }
    }
}
