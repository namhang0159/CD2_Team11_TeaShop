"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { CreateOrderAPI, GetVNPAYPaymentURLAPI } from "@/util/api";
import { ChevronDown } from "lucide-react";
import {
  vietnamLocations,
  getDistrictsByProvince,
} from "@/lib/vietnam-locations";
import {
  GetAddressesAPI,
  CreateAddressAPI,
  RemoveAddressAPI,
  GetPaymentMethodsAPI,
} from "@/util/api";
export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    district: "",
    paymentMethod: 1,
  });
  const [addressForm, setAddressForm] = useState({
    receiver_name: "",
    phone: "",
    details: "",
    city: "",
    district: "",
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [districts, setDistricts] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (addressForm.city) {
      const dists = getDistrictsByProvince(addressForm.city);
      setDistricts(dists);

      setAddressForm((prev) => ({
        ...prev,
        district: "",
      }));
    }
  }, [addressForm.city]);
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await GetAddressesAPI();
        const data = res.data.data || res.data;

        setAddresses(data);

        // auto chọn default
        const defaultAddr = data.find((a: any) => a.is_default);
        setSelectedAddress(defaultAddr || data[0] || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddresses();
  }, []);
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await GetPaymentMethodsAPI();
        setPaymentMethods(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPaymentMethods();
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);

  // Update districts when city changes
  useEffect(() => {
    if (formData.city) {
      const dists = getDistrictsByProvince(formData.city);
      setDistricts(dists);
      setFormData((prev) => ({ ...prev, district: "" }));
    }
  }, [formData.city]);

  const shippingFee = items.length > 0 ? 30000 : 0;
  const totalWithShipping = total + shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAddress) {
      alert("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await CreateOrderAPI(
        formData.paymentMethod,
        selectedAddress.id,
        shippingFee,
      );

      const order = res.data;
      console.log("Order created:", order);
      if (formData.paymentMethod === 5) {
        try {
          const resPay = await GetVNPAYPaymentURLAPI(order.order_id);
          console.log("VNPAY URL response:", resPay.data);
          const payment_url = resPay.data.payment_url;

          window.location.href = payment_url;
          return;
        } catch (err) {
          alert("Tạo link thanh toán thất bại!");
          return;
        }
      }
      clearCart();

      router.push(
        `/order-success?orderNumber=TA-${order.order_id}&total=${order.total_amount}`,
      );
    } catch (err: any) {
      console.error(err);

      if (err.response?.data?.errors) {
        alert(Object.values(err.response.data.errors).join("\n"));
      } else {
        alert("Đặt hàng thất bại!");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { number: 1, label: "GIỎ HÀNG", id: "cart", completed: true },
    { number: 2, label: "VẬN CHUYỂN", id: "shipping", completed: false },
    { number: 3, label: "THANH TOÁN", id: "payment", completed: false },
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
                  step.id === "payment"
                    ? "bg-secondary text-white"
                    : step.completed
                      ? "bg-secondary text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step.completed ? "✓" : step.number}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  Địa chỉ giao hàng
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Nhập email"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Địa chỉ chi tiết *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Nhập địa chỉ (số nhà, tên đường)"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tỉnh/Thành phố *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Chọn tỉnh/thành</option>
                        {Object.keys(vietnamLocations).map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Quận/Huyện *
                      </label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        disabled={!formData.city}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Địa chỉ giao hàng</h3>

                {addresses.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Chưa có địa chỉ nào
                  </p>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className="flex items-start gap-3 border p-3 rounded-lg cursor-pointer hover:bg-muted"
                      >
                        <input
                          type="radio"
                          checked={selectedAddress?.id === addr.id}
                          onChange={() => setSelectedAddress(addr)}
                        />

                        <div>
                          <p className="font-medium">{addr.receiver_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {addr.phone}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {addr.details}
                          </p>

                          {addr.is_default && (
                            <span className="text-xs text-green-500">
                              Mặc định
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={async () => {
                            await RemoveAddressAPI(addr.id);

                            const updated = addresses.filter(
                              (a) => a.id !== addr.id,
                            );
                            setAddresses(updated);

                            if (selectedAddress?.id === addr.id) {
                              setSelectedAddress(updated[0] || null);
                            }
                          }}
                          className="text-red-500 text-xs ml-auto"
                        >
                          Xóa
                        </button>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="text-sm text-primary mt-4"
              >
                + Thêm địa chỉ mới
              </button>
              {showAddressModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-card w-full max-w-lg p-6 rounded-lg space-y-4">
                    <h2 className="text-lg font-bold">Thêm địa chỉ mới</h2>

                    {/* Name */}
                    <input
                      name="receiver_name"
                      value={addressForm.receiver_name}
                      onChange={handleAddressChange}
                      placeholder="Tên người nhận"
                      className="w-full px-4 py-2 border rounded"
                    />

                    {/* Phone */}
                    <input
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleAddressChange}
                      placeholder="Số điện thoại"
                      className="w-full px-4 py-2 border rounded"
                    />

                    {/* Details */}
                    <input
                      name="details"
                      value={addressForm.details}
                      onChange={handleAddressChange}
                      placeholder="Địa chỉ chi tiết"
                      className="w-full px-4 py-2 border rounded"
                    />

                    {/* City */}
                    <select
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border rounded"
                    >
                      <option value="">Chọn tỉnh/thành</option>
                      {Object.keys(vietnamLocations).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>

                    {/* District */}
                    <select
                      name="district"
                      value={addressForm.district}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border rounded"
                      disabled={!addressForm.city}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(false)}
                        className="px-4 py-2 border rounded"
                      >
                        Hủy
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          const res = await CreateAddressAPI({
                            receiver_name: addressForm.receiver_name,
                            phone: addressForm.phone,
                            details: `${addressForm.details}, ${addressForm.district}, ${addressForm.city}`,
                            is_default: false,
                          });

                          const newAddr = res.data;

                          setAddresses((prev) => [...prev, newAddr]);
                          setSelectedAddress(newAddr);

                          setShowAddressModal(false);

                          // reset form
                          setAddressForm({
                            receiver_name: "",
                            phone: "",
                            details: "",
                            city: "",
                            district: "",
                          });
                        }}
                        className="px-4 py-2 bg-primary text-white rounded"
                      >
                        Lưu địa chỉ
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Payment Method */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  Phương thức thanh toán
                </h3>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            paymentMethod: Number(e.target.value),
                          }))
                        }
                      />
                      <span className="text-foreground font-medium">
                        {method.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || items.length === 0}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐẶT HÀNG"}
              </button>

              <div className="text-center">
                <Link
                  href="/cart"
                  className="text-secondary hover:underline text-sm font-medium"
                >
                  ← Quay lại giỏ hàng
                </Link>
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-6">
                Đơn hàng của bạn
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="text-foreground">{item.name}</p>
                      <p className="text-muted-foreground text-xs">
                        x{item.quantity}
                      </p>
                    </div>
                    <p className="text-foreground font-medium">
                      {((item.price * item.quantity) / 1000).toLocaleString(
                        "vi-VN",
                      )}
                      k
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính:</span>
                  <span className="text-foreground font-medium">
                    {(total / 1000).toLocaleString("vi-VN")}k
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vận chuyển:</span>
                  <span className="text-foreground font-medium">
                    {(shippingFee / 1000).toLocaleString("vi-VN")}k
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-foreground font-bold">Tổng cộng:</span>
                <span className="text-2xl font-bold text-secondary">
                  {(totalWithShipping / 1000).toLocaleString("vi-VN")}k
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}
