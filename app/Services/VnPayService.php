<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VnPayService
{
    // 1. Hàm tạo URL chuyển hướng sang VNPay
    public function createPaymentUrl(Order $order, Request $request)
    {
        $vnp_TmnCode = config('vnpay.tmn_code');
        $vnp_HashSecret = config('vnpay.hash_secret');
        $vnp_Url = config('vnpay.url');
        $vnp_Returnurl = config('vnpay.return_url');

        // VNPay yêu cầu mã đơn hàng phải là duy nhất. 
        // Ta nối ID đơn hàng với timestamp để khách có thể thử thanh toán lại nhiều lần nếu lần đầu bị lỗi.
        $vnp_TxnRef = $order->id . '_' . time();
        $vnp_OrderInfo = "Thanh toan don hang " . $order->id;
        $vnp_OrderType = 'billpayment';

        // Tiền phải nhân 100 theo chuẩn VNPay (VD: 100000 VND -> 10000000)
        $vnp_Amount = round($order->total_amount) * 100;
        $vnp_Locale = 'vn';
        $vnp_IpAddr = $request->ip();

        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }

        return $vnp_Url;
    }

    // 2. Hàm IPN Webhook (Máy chủ VNPay gọi ngầm về để xác nhận)
    public function handleIpn(Request $request)
    {
        $inputData = $request->all();
        $vnp_SecureHash = $inputData['vnp_SecureHash'];
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

        // Kiểm tra chữ ký hợp lệ (Chống fake request)
        if ($secureHash == $vnp_SecureHash) {
            // Tách lấy ID đơn hàng thật (bỏ phần _time đi)
            $orderId = explode('_', $inputData['vnp_TxnRef'])[0];
            $order = Order::find($orderId);

            if ($order != null) {
                if ($order->payment_status !== 'Paid') {
                    if ($inputData['vnp_ResponseCode'] == '00' && $inputData['vnp_TransactionStatus'] == '00') {
                        // Thanh toán thành công
                        $order->payment_status = 'Paid';
                        $order->status = 'Processing'; // Đổi trạng thái đơn để chuẩn bị giao
                        $order->save();
                        return response()->json(['RspCode' => '00', 'Message' => 'Confirm Success']);
                    } else {
                        // Thanh toán thất bại hoặc bị hủy
                        $order->payment_status = 'Failed';
                        $order->save();
                        return response()->json(['RspCode' => '00', 'Message' => 'Payment Failed']);
                    }
                } else {
                    return response()->json(['RspCode' => '02', 'Message' => 'Order already confirmed']);
                }
            } else {
                return response()->json(['RspCode' => '01', 'Message' => 'Order not found']);
            }
        } else {
            return response()->json(['RspCode' => '97', 'Message' => 'Invalid signature']);
        }
    }
}