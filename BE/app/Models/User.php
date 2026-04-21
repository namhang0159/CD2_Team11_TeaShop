<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // BẮT BUỘC PHẢI CÓ ĐỂ DÙNG SANCTUM

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'user'; // Trỏ đúng tên bảng
    public $timestamps = false; // Bảng của mày không có updated_at

    protected $fillable = [
        'full_name',
        'email',
        'role',
        'phone_number',
        'password_hash',
        'created_at'
    ];

    // Báo cho Laravel biết cột chứa mật khẩu là password_hash
    public function getAuthPassword()
    {
        return $this->password_hash;
    }
    // Bỏ hàm này vào trong class User
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}
