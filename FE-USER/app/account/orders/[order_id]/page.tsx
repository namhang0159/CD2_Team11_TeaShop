"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { GetOrdersAPI } from "@/util/api";

interface OrderItem {
  variant_id: number;
  product_name: string;
  option_name: string;
  quantity: number;
  price_at_purchase: number;
}

interface Order {
  order_id: number;
  status: string;
  payment_status: string;
  total_amount: number;
  shipping_fee: number;
  created_at: string;
  payment_method: string;
  items: OrderItem[];
}

export default function OrderDetailPage() {
  const { order_id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await GetOrdersAPI();
        const found = res.data.find(
          (o: Order) => o.order_id.toString() === order_id,
        );

        setOrder(found || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, [order_id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Không tìm thấy đơn hàng</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* BACK */}
      <Link href="/account/orders" className="text-blue-600 text-sm">
        ← Quay lại danh sách đơn hàng
      </Link>

      {/* HEADER */}
      <h1 className="text-2xl font-bold mt-4">Đơn hàng #{order.order_id}</h1>

      <div className="text-sm text-gray-500 mt-1">
        Ngày đặt: {new Date(order.created_at).toLocaleString("vi-VN")}
      </div>

      {/* INFO BOX */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="border rounded p-4">
          <p className="text-gray-500 text-sm">Trạng thái</p>
          <p className="font-semibold">{order.status}</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-gray-500 text-sm">Thanh toán</p>
          <p className="font-semibold">{order.payment_status}</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-gray-500 text-sm">Phương thức</p>
          <p className="font-semibold">{order.payment_method}</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-gray-500 text-sm">Phí ship</p>
          <p className="font-semibold">
            {order.shipping_fee.toLocaleString()}₫
          </p>
        </div>
      </div>

      {/* ITEMS */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Sản phẩm</h2>

        <div className="border rounded-lg overflow-hidden">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 border-b last:border-b-0 flex justify-between"
            >
              {/* LEFT */}
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-500">{item.option_name}</p>
                <p className="text-sm">SL: {item.quantity}</p>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="font-semibold text-green-600">
                  {item.price_at_purchase.toLocaleString()}₫
                </p>
                <p className="text-xs text-gray-400">x {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOTAL */}
      <div className="mt-6 border-t pt-4 flex justify-between">
        <span className="font-semibold">Tổng cộng</span>
        <span className="font-bold text-green-600">
          {order.total_amount.toLocaleString()}₫
        </span>
      </div>
    </div>
  );
}
