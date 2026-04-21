<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\VnPayService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __construct(protected VnPayService $vnPayService) {}

    // API để Frontend gọi lấy Link thanh toán
    public function createPaymentUrl(Request $request, $orderId)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        // Đảm bảo đơn hàng này là của user đang đăng nhập và chưa thanh toán
        $order = Order::where('user_id', $user->id)
            ->where('id', $orderId)
            ->where('payment_status', 'Unpaid')
            ->firstOrFail();

        $paymentUrl = $this->vnPayService->createPaymentUrl($order, $request);

        return response()->json([
            'message' => 'Tạo link thanh toán thành công',
            'data' => [
                'payment_url' => $paymentUrl
            ]
        ]);
    }

    // API Webhook để VNPay gọi ngầm (Không cần user đăng nhập)
    public function vnpayIpn(Request $request)
    {
        return $this->vnPayService->handleIpn($request);
    }
    // API để VNPay đá khách hàng về đây sau khi thanh toán xong
    public function vnpayReturn(Request $request)
    {
        $inputData = $request->all();
        $vnp_SecureHash = $inputData['vnp_SecureHash'] ?? '';
        unset($inputData['vnp_SecureHash'], $inputData['vnp_SecureHashType']);

        ksort($inputData);
        $i = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $vnp_HashSecret = config('vnpay.hash_secret');
        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        // Kiểm tra chữ ký bảo mật
        if ($secureHash == $vnp_SecureHash) {
            // Kiểm tra xem khách thanh toán thành công hay bấm Hủy
            if ($inputData['vnp_ResponseCode'] == '00') {

                // 1. Lấy ID đơn hàng và CẬP NHẬT DATABASE (Bù đắp cho việc IPN ko chạy được ở localhost)
                $orderId = explode('_', $inputData['vnp_TxnRef'])[0];
                $order = Order::find($orderId);

                if ($order && $order->payment_status !== 'Paid') {
                    $order->payment_status = 'Paid';
                    $order->status = 'Processing'; // Đang xử lý để chuẩn bị giao
                    $order->save();
                }

                // 2. Cập nhật xong thì đá khách về giao diện Frontend báo Thành Công
                // (Sau này có Frontend thật thì đổi URL này lại)
                return redirect()->to('http://localhost:3000/payment-success');
            } else {
                // Khách bấm Hủy thanh toán hoặc thẻ lỗi
                return redirect()->to('http://localhost:3000/payment-failed');
            }
        } else {
            return response()->json(['message' => 'Chữ ký không hợp lệ, phát hiện nghi vấn Hack!'], 400);
        }
    }
}
