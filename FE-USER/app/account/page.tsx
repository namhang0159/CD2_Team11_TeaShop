"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Package, MapPin, User, LogOut, ShoppingBag } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { use, useEffect, useState } from "react";
import { get } from "http";
import { GetOrdersAPI } from "@/util/api";

export default function AccountPage() {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await GetOrdersAPI();

        const data = res?.data || [];

        // sort theo thời gian mới nhất (nếu có created_at / date)
        const sorted = [...data].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        // lấy 3 đơn gần nhất
        setOrders(sorted.slice(0, 3));
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {/* Main Content */}
      <div className="md:col-span-3 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg p-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Chào mừng trở lại, {user.full_name.split(" ").pop()}!
            </h1>
            <p className="text-muted-foreground">
              Hôm nay là một ngày tuyệt vời với thương thức trà ngon.
            </p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors whitespace-nowrap ml-4"
          >
            + Đặt hàng ngay
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wider">
                  Hoạt động
                </p>
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Tổng đơn hàng
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <ShoppingBag size={24} />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wider">
                  Phần thưởng
                </p>
                <p className="text-3xl font-bold text-foreground">2,450</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Điểm tích lũy
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                ⭐
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wider">
                  Thời gian
                </p>
                <p className="text-3xl font-bold text-foreground">12/10/2023</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Gia nhập từ
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                📅
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              Đơn hàng gần đây
            </h2>
            <Link
              href="/account/orders"
              className="text-secondary hover:text-secondary/80 text-sm font-medium"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    MÃ ĐƠN HÀNG
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    NGÀY ĐẶT
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    SẢN PHẨM
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    TỔNG TIỀN
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    TRẠNG THÁI
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-muted-foreground"
                    >
                      Đang tải đơn hàng...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-muted-foreground"
                    >
                      Chưa có đơn hàng nào
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr
                      key={order.order_id || order.id || index}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-foreground">
                        {order.order_id || order.id}
                      </td>

                      <td className="px-6 py-4 text-foreground">
                        {order.created_at || order.date}
                      </td>

                      <td className="px-6 py-4 text-foreground">
                        {order.items[0]?.product_name ||
                          order.items?.[0]?.product_name ||
                          "Sản phẩm..."}
                      </td>

                      <td className="px-6 py-4 text-secondary font-semibold">
                        {order.total_amount?.toLocaleString("vi-VN") + "₫"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-medium ${order.statusColor}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                ✓
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Địa chỉ nhận hàng mặc định
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-secondary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    {user.full_name}
                  </p>
                  <p className="text-sm text-muted-foreground">090 123 4567</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP Hồ Chí Minh
              </p>
            </div>
          </div>

          {/* Membership */}
          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-3xl mb-4">
              🏆
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Thắng hạng thành viên?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bạn chỉ còn cách hàng Vàng 550 điểm nữa thôi.
            </p>
            <Link
              href="#"
              className="text-secondary hover:text-secondary/80 font-semibold text-sm"
            >
              Xem độc quyền
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
