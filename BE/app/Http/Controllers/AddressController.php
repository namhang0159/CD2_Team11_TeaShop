<?php

namespace App\Http\Controllers;

use App\Http\Requests\Address\StoreAddressRequest;
use App\Http\Resources\AddressResource;
use App\Services\AddressService;
use Illuminate\Http\Request;
use App\Http\Requests\Address\UpdateAddressRequest;


class AddressController extends Controller
{
    public function __construct(protected AddressService $addressService) {}

    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $addresses = $this->addressService->getUserAddresses($user);

        return AddressResource::collection($addresses);
    }

    public function store(StoreAddressRequest $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $address = $this->addressService->createAddress($user, $request->validated());

        return response()->json([
            'message' => 'Thêm địa chỉ thành công',
            'data' => new AddressResource($address)
        ], 201);
    }
    // Sửa địa chỉ
    public function update(UpdateAddressRequest $request, $id)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $address = $this->addressService->updateAddress($user, $id, $request->validated());

        return response()->json([
            'message' => 'Cập nhật địa chỉ thành công',
            'data' => new \App\Http\Resources\AddressResource($address)
        ]);
    }

    // Xóa địa chỉ
    public function destroy(Request $request, $id)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $this->addressService->deleteAddress($user, $id);

        return response()->json([
            'message' => 'Xóa địa chỉ thành công'
        ]);
    }
}
