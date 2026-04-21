<?php

namespace App\Services;

use App\Models\Address;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AddressService
{
    public function getUserAddresses(User $user)
    {
        // Lấy danh sách địa chỉ, ưu tiên thằng is_default = 1 lên đầu
        return Address::where('user_id', $user->id)
            ->orderByDesc('is_default')
            ->orderByDesc('id')
            ->get();
    }

    public function createAddress(User $user, array $data)
    {
        return DB::transaction(function () use ($user, $data) {
            $isDefault = $data['is_default'] ?? false;

            // Nếu user chọn đây là địa chỉ mặc định, ta phải tắt mặc định của các địa chỉ cũ
            if ($isDefault) {
                Address::where('user_id', $user->id)->update(['is_default' => 0]);
            } else {
                // Nếu user chưa có địa chỉ nào, ép cái đầu tiên thành mặc định
                $addressCount = Address::where('user_id', $user->id)->count();
                if ($addressCount === 0) {
                    $isDefault = true;
                }
            }

            return Address::create([
                'user_id' => $user->id,
                'receiver_name' => $data['receiver_name'],
                'phone' => $data['phone'],
                'details' => $data['details'],
                'is_default' => $isDefault ? 1 : 0,
            ]);
        });
    }
    // Cập nhật địa chỉ
    public function updateAddress(User $user, $addressId, array $data)
    {
        return DB::transaction(function () use ($user, $addressId, $data) {
            // Lấy địa chỉ, đảm bảo địa chỉ này PHẢI LÀ CỦA USER ĐANG ĐĂNG NHẬP (Chống hack)
            $address = Address::where('user_id', $user->id)->where('id', $addressId)->firstOrFail();

            // Nếu user tick chọn địa chỉ này làm mặc định
            if (isset($data['is_default']) && $data['is_default'] == true) {
                // Tắt tất cả các địa chỉ mặc định cũ đi
                Address::where('user_id', $user->id)->update(['is_default' => 0]);
                $data['is_default'] = 1;
            } else if (isset($data['is_default']) && $data['is_default'] == false) {
                $data['is_default'] = 0;
            }

            // Cập nhật dữ liệu mới
            $address->update($data);

            return $address;
        });
    }

    // Xóa địa chỉ
    public function deleteAddress(User $user, $addressId)
    {
        return DB::transaction(function () use ($user, $addressId) {
            $address = Address::where('user_id', $user->id)->where('id', $addressId)->firstOrFail();

            // Lưu lại trạng thái xem nó có đang là mặc định không trước khi xóa
            $wasDefault = $address->is_default;

            $address->delete();

            // LOGIC UX XUẤT SẮC: Nếu xóa mất địa chỉ mặc định, tự động gán địa chỉ mới nhất làm mặc định
            if ($wasDefault) {
                $latestAddress = Address::where('user_id', $user->id)->orderByDesc('id')->first();
                if ($latestAddress) {
                    $latestAddress->update(['is_default' => 1]);
                }
            }

            return true;
        });
    }
}
