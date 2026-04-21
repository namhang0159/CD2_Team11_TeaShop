"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import {
  CreateAddressAPI,
  GetAddressesAPI,
  RemoveAddressAPI,
} from "@/util/api";
import { MapPin, Phone, User } from "lucide-react";
import {
  getDistrictsByProvince,
  vietnamLocations,
} from "@/lib/vietnam-locations";

export default function AddressesPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [districts, setDistricts] = useState<string[]>([]);
  const [addressForm, setAddressForm] = useState({
    receiver_name: "",
    phone: "",
    details: "",
    city: "",
    district: "",
  });
  const [error, setError] = useState("");
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

  // ---------------- AUTH ----------------
  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);

  // ---------------- FETCH ----------------
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const res = await GetAddressesAPI();
        setAddresses(res?.data || []);
      } catch (err) {
        console.error(err);
        setAddresses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  // ---------------- FORM CHANGE ----------------
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setAddressForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---------------- VALIDATE ----------------
  const validateAddress = () => {
    if (!addressForm.receiver_name) return "Vui lòng nhập tên";
    if (!addressForm.phone) return "Vui lòng nhập số điện thoại";
    if (!addressForm.details) return "Vui lòng nhập địa chỉ";
    if (!addressForm.city) return "Vui lòng chọn tỉnh/thành";
    if (!addressForm.district) return "Vui lòng chọn quận/huyện";
    return null;
  };

  // ---------------- CREATE ----------------
  const handleCreateAddress = async () => {
    const err = validateAddress();
    if (err) {
      setError(err);
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const res = await CreateAddressAPI({
        receiver_name: addressForm.receiver_name,
        phone: addressForm.phone,
        details: `${addressForm.details}, ${addressForm.district}, ${addressForm.city}`,
        is_default: false,
      });

      const newAddr = res.data;

      setAddresses((prev) => [newAddr, ...prev]);
      setSelectedAddress(newAddr);

      setShowAddressModal(false);

      setAddressForm({
        receiver_name: "",
        phone: "",
        details: "",
        city: "",
        district: "",
      });
    } catch (err) {
      console.error(err);
      setError("Không thể tạo địa chỉ");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- REMOVE ----------------
  const handleRemoveAddress = async (id: number) => {
    try {
      await RemoveAddressAPI(id);

      const updated = addresses.filter((a) => a.id !== id);
      setAddresses(updated);

      if (selectedAddress?.id === id) {
        setSelectedAddress(updated[0] || null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn || !user) return null;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg p-6">
        <h1 className="text-2xl font-bold">Địa chỉ của tôi</h1>
        <p className="text-muted-foreground">
          Quản lý địa chỉ giao hàng của bạn
        </p>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowAddressModal(true)}
        className="px-4 py-2 bg-secondary text-white rounded-lg"
      >
        + Thêm địa chỉ mới
      </button>

      {/* CONTENT */}
      {loading ? (
        <p>Đang tải...</p>
      ) : addresses.length === 0 ? (
        <p>Chưa có địa chỉ</p>
      ) : (
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-card border rounded-lg p-6 relative"
            >
              {addr.is_default && (
                <span className="absolute top-3 right-3 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Mặc định
                </span>
              )}

              <div className="flex gap-2 items-center mb-2">
                <User size={16} />
                <p className="font-semibold">{addr.receiver_name}</p>
              </div>

              <div className="flex gap-2 items-center mb-2 text-sm">
                <Phone size={16} />
                <p>{addr.phone}</p>
              </div>

              <div className="flex gap-2 items-start text-sm">
                <MapPin size={16} />
                <p>{addr.details}</p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleRemoveAddress(addr.id)}
                  className="text-red-500 text-sm"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card w-full max-w-lg p-6 rounded-lg space-y-4">
            <h2 className="text-lg font-bold">Thêm địa chỉ mới</h2>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
              name="receiver_name"
              value={addressForm.receiver_name}
              onChange={handleAddressChange}
              placeholder="Tên người nhận"
              className="w-full px-4 py-2 border rounded"
            />

            <input
              name="phone"
              value={addressForm.phone}
              onChange={handleAddressChange}
              placeholder="Số điện thoại"
              className="w-full px-4 py-2 border rounded"
            />

            <input
              name="details"
              value={addressForm.details}
              onChange={handleAddressChange}
              placeholder="Địa chỉ chi tiết"
              className="w-full px-4 py-2 border rounded"
            />

            <select
              name="city"
              value={addressForm.city}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Chọn tỉnh</option>
              {Object.keys(vietnamLocations).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              name="district"
              value={addressForm.district}
              onChange={handleAddressChange}
              disabled={!addressForm.city}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Chọn quận</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddressModal(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>

              <button
                onClick={handleCreateAddress}
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                {isSubmitting ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
