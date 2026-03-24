<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Requests\Cart\UpdateCartRequest;
use App\Http\Resources\CartResource;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function __construct(protected CartService $cartService) {}

    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $cart = $this->cartService->getCartForUser($user);

        return new CartResource($cart);
    }

    public function store(AddToCartRequest $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $cart = $this->cartService->addToCart($user, $request->validated());

        return response()->json([
            'message' => 'Đã thêm vào giỏ hàng',
            'data' => new CartResource($cart)
        ]);
    }

    public function update(UpdateCartRequest $request, $itemId)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $cart = $this->cartService->updateItemQuantity($user, $itemId, $request->quantity);

        return response()->json([
            'message' => 'Đã cập nhật giỏ hàng',
            'data' => new CartResource($cart)
        ]);
    }

    public function destroy(Request $request, $itemId)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $cart = $this->cartService->removeItem($user, $itemId);

        return response()->json([
            'message' => 'Đã xóa sản phẩm khỏi giỏ hàng',
            'data' => new CartResource($cart)
        ]);
    }
}
