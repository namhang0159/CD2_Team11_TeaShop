"use client";

import { useState } from "react";
import { suppliers } from "@/data/suppliers";

function SupplierRow({ supplier }) {
  return (
    <tr className="hover:bg-green-50 transition-colors cursor-pointer">
      {/* Name */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-bold text-black hover:text-green-600">
            {supplier.name}
          </span>
          <span className="text-xs text-gray-500">ID: {supplier.id}</span>
        </div>
      </td>

      {/* Phone */}
      <td className="px-6 py-4 font-medium">{supplier.phone || "—"}</td>

      {/* Address */}
      <td className="px-6 py-4 text-gray-600">{supplier.address || "—"}</td>

      {/* Created */}
      <td className="px-6 py-4 text-gray-500 text-sm">{supplier.created_at}</td>

      {/* Actions */}
      <td className="px-6 py-4 flex justify-center gap-2">
        <button className="p-1.5 rounded-lg hover:bg-green-600 hover:text-white text-gray-400">
          <i className="fa fa-eye"></i>
        </button>

        <button className="p-1.5 rounded-lg hover:bg-blue-500 hover:text-white text-gray-400">
          <i className="fa fa-edit"></i>
        </button>

        <button className="p-1.5 rounded-lg hover:bg-red-500 hover:text-white text-gray-400">
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default function SupplierTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.phone && s.phone.includes(searchTerm)),
  );

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden p-4 flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-62.5 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <i className="fa fa-search"></i>
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên hoặc số điện thoại..."
            className="w-full pl-10 pr-4 py-2.5 border-none rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-600/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-50 text-green-600 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Nhà cung cấp</th>
              <th className="px-6 py-4">SĐT</th>
              <th className="px-6 py-4">Địa chỉ</th>
              <th className="px-6 py-4">Ngày tạo</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((s) => (
                <SupplierRow key={s.id} supplier={s} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-gray-400 font-medium"
                >
                  Không tìm thấy nhà cung cấp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
