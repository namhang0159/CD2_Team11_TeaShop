"use client";

import { users } from "@/data/user";
import { useState } from "react";

function CustomerRow({ user }) {
  const roleColor = {
    admin: "text-red-500 bg-red-100",
    user: "text-green-600 bg-green-100",
  };

  return (
    <tr className="hover:bg-green-50 transition-colors cursor-pointer">
      {/* Name */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-bold text-black hover:text-green-600">
            {user.full_name}
          </span>
          <span className="text-xs text-gray-500">ID: {user.id}</span>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4 text-gray-600">{user.email}</td>

      {/* Phone */}
      <td className="px-6 py-4">{user.phone_number || "—"}</td>

      {/* Role */}
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
            roleColor[user.role]
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* Created */}
      <td className="px-6 py-4 text-gray-500 text-sm">{user.created_at}</td>

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

export default function CustomerTable() {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.phone_number && u.phone_number.includes(search)),
  );

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden p-4 flex flex-col gap-4">
      {/* Filter */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-62.5 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <i className="fa fa-search"></i>
          </span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm tên, email, số điện thoại..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-600/50 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-50 text-green-600 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">SĐT</th>
              <th className="px-6 py-4">Vai trò</th>
              <th className="px-6 py-4">Ngày tạo</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody className=" text-sm ">
            {filtered.length > 0 ? (
              filtered.map((u) => <CustomerRow key={u.id} user={u} />)
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  Không tìm thấy khách hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
