"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Eye } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
  created_at: string;
  total_amount: number;
  status: "Pending" | "Shipping" | "Done" | "Cancel";
  payment_status: string;
  payment_method: string;
  shipping_fee: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const GetOrder = async () => {
      try {
        const res = await GetOrdersAPI();

        setOrders(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    GetOrder();
  }, []);

  if (!mounted) return null;

  if (!localStorage.getItem("token")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bạn chưa đăng nhập</h2>
          <p className="text-gray-600 mb-6">
            Vui lòng đăng nhập để xem đơn hàng của bạn.
          </p>
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "shipping":
        return "text-blue-600 bg-blue-50";
      case "done":
        return "text-green-600 bg-green-50";
      case "cancel":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Package /> Đơn hàng của tôi
            </h1>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["all", "pending", "shipping", "done", "cancel"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  filter === f
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {f === "all"
                  ? "Tất cả"
                  : f === "pending"
                    ? "Chờ xử lý"
                    : f === "shipping"
                      ? "Đang giao"
                      : f === "done"
                        ? "Hoàn thành"
                        : "Đã huỷ"}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-sm">
                <tr>
                  <th className="p-4">Mã đơn</th>
                  <th>Ngày</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.order_id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold">#{order.order_id}</td>

                    <td>
                      {new Date(order.created_at).toLocaleString("vi-VN")}
                    </td>

                    {/* ITEMS FIX */}
                    <td>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            <p className="font-medium">{item.product_name}</p>
                            <p className="text-xs text-gray-500">
                              {item.option_name} × {item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="font-semibold text-green-600">
                      {order.total_amount.toLocaleString()}₫
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="text-right p-4">
                      <Link
                        href={`/account/orders/${order.order_id}`}
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        <Eye size={16} />
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              Không có đơn hàng nào
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
