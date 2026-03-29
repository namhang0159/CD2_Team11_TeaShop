"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSupplierPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: call API backend
    console.log("DATA:", form);

    alert("Thêm nhà cung cấp thành công!");

    router.push("/suppliers");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Thêm nhà cung cấp</h1>
        <p className="text-gray-500 text-sm mt-1">
          Nhập thông tin nhà cung cấp mới vào hệ thống
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 flex flex-col gap-5"
      >
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Tên nhà cung cấp <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="VD: Công ty Trà Thái Nguyên"
            className="px-4 py-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-600/50 outline-none"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Số điện thoại</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="VD: 0123456789"
            className="px-4 py-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-600/50 outline-none"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Địa chỉ</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ..."
            rows={3}
            className="px-4 py-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-600/50 outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.push("/suppliers")}
            className="px-5 py-2.5 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            Lưu nhà cung cấp
          </button>
        </div>
      </form>
    </div>
  );
}
