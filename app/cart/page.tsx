"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, total } = useCart();
  const [currentStep, setCurrentStep] = useState("cart");

  const shippingFee = items.length > 0 ? 30000 : 0;
  const totalWithShipping = total + shippingFee;

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    router.push("/checkout");
  };

  const steps = [
    { number: 1, label: "GIỎ HÀNG", id: "cart" },
    { number: 2, label: "VẬN CHUYỂN", id: "shipping" },
    { number: 3, label: "THANH TOÁN", id: "payment" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Steps */}
        <div className="flex justify-between items-center mb-12 max-w-2xl">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 ${
                  currentStep === step.id
                    ? "bg-secondary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <p className="text-xs font-semibold text-center text-muted-foreground">
                {step.label}
              </p>
              {idx < steps.length - 1 && (
                <div className="h-0.5 bg-border w-full mt-4 mx-2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Giỏ hàng của bạn
            </h2>

            {items.length === 0 ? (
              <div className="bg-muted rounded-lg p-8 text-center">
                <p className="text-muted-foreground mb-4">Giỏ hàng trống</p>
                <Link
                  href="/products"
                  className="text-secondary hover:underline font-medium"
                >
                  ← Tiếp tục mua hàng
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-lg p-4 flex gap-4"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {(item.price / 1000).toLocaleString("vi-VN")}k / Gói
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-border rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1 hover:bg-muted transition-colors text-foreground"
                          >
                            −
                          </button>
                          <span className="px-3 text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 hover:bg-muted transition-colors text-foreground"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X size={20} />
                      </button>
                      <p className="font-semibold text-foreground">
                        {((item.price * item.quantity) / 1000).toLocaleString(
                          "vi-VN",
                        )}
                        k
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="mt-6">
                <Link
                  href="/products"
                  className="text-secondary hover:underline text-sm font-medium"
                >
                  ← Tiếp tục mua hàng
                </Link>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Thành tiền
              </h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính:</span>
                  <span className="text-foreground font-medium">
                    {(total / 1000).toLocaleString("vi-VN")}k
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vận chuyển:</span>
                  <span className="text-foreground font-medium">
                    {items.length > 0
                      ? `${(shippingFee / 1000).toLocaleString("vi-VN")}k`
                      : "Miễn phí"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-foreground font-bold">Tổng cộng:</span>
                <span className="text-2xl font-bold text-secondary">
                  {(totalWithShipping / 1000).toLocaleString("vi-VN")}k
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                THANH TOÁN
              </button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-3">
                  Phương thức thanh toán
                </p>
                <div className="flex justify-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                    💳
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                    🏦
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                    📱
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {items.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Sản phẩm được yêu thích
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative h-40 bg-muted rounded-lg overflow-hidden mb-3">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      [Hình ảnh]
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                    Trà Cao Cấp
                  </h4>
                  <p className="text-sm text-secondary font-medium">
                    350.000 VNĐ
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
