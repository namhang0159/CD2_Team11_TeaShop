"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CheckCircle, Package, Truck } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "TAB12345";
  const total = searchParams.get("total") || "750,000";
  const deliveryDate = searchParams.get("deliveryDate") || "12 - 15 Tháng 10";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Hero Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md h-64 rounded-2xl overflow-hidden">
              <Image
                src="/tea-plant.jpg"
                alt="Tea plant success"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Cảm ơn bạn đã mua sắm!
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Đơn hàng của bạn đã được xác nhận. Chúng tôi đang chuẩn bị những
              bịp trà tươi ngon nhất cho bạn.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Mã đơn hàng
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Tổng cộng</p>
                <p className="text-2xl font-bold text-secondary">{total} VNĐ</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Dự kiến giao hàng
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {deliveryDate}
                </p>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Tiếp theo là gì?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Confirmation */}
              <div className="text-center p-6 bg-background border border-border rounded-xl hover:border-secondary/30 transition-colors">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Xác nhận</h3>
                <p className="text-sm text-muted-foreground">
                  Đơn hàng của bạn đang được xử lý và sẽ sớm được gửi đi.
                </p>
              </div>

              {/* Packing */}
              <div className="text-center p-6 bg-background border border-border rounded-xl hover:border-secondary/30 transition-colors">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Đóng gói</h3>
                <p className="text-sm text-muted-foreground">
                  Chúng tôi đang cẩn thận chuẩn bị những bịp trà cho bạn.
                </p>
              </div>

              {/* Shipping */}
              <div className="text-center p-6 bg-background border border-border rounded-xl hover:border-secondary/30 transition-colors">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Giao hàng
                </h3>
                <p className="text-sm text-muted-foreground">
                  Đơn hàng sẽ được giao sớm nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/products"
              className="px-8 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors text-center"
            >
              Tiếp tục mua hàng
            </Link>
            <Link
              href="/account/orders"
              className="px-8 py-3 border-2 border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary/10 transition-colors text-center"
            >
              Theo dõi đơn hàng
            </Link>
          </div>

          {/* Info Text */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Một email xác nhận đã được gửi đến hộp thư của bạn. Vui lòng kiểm
              tra để xem chi tiết đơn hàng.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
