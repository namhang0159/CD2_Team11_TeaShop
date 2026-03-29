"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const statusMap = {
  in_stock: "Còn hàng",
  low_stock: "Sắp hết",
  out_of_stock: "Hết hàng",
};

const statusColor = {
  in_stock: "text-green-600",
  low_stock: "text-yellow-600",
  out_of_stock: "text-red-600",
};

export default function InventoryTable({ data = [] }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  // Lấy danh sách category unique
  const categories = useMemo(() => {
    return [...new Set(data.map((item) => item.category))];
  }, [data]);

  // Filter logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchKeyword = item.name
        .toLowerCase()
        .includes(keyword.toLowerCase());

      const matchCategory = category ? item.category === category : true;

      const matchStatus = status ? item.status === status : true;

      return matchKeyword && matchCategory && matchStatus;
    });
  }, [data, keyword, category, status]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Filter */}
      <div className="p-4 border-b border-gray-200 flex gap-3">
        <input
          placeholder="Tìm sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Danh mục</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Trạng thái</option>
          <option value="in_stock">Còn hàng</option>
          <option value="low_stock">Sắp hết</option>
          <option value="out_of_stock">Hết hàng</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs">
          <tr>
            <th className="p-3 text-left">Sản phẩm</th>
            <th>Danh mục</th>
            <th>Vùng</th>
            <th>Trọng lượng</th>
            <th className="text-center">Tồn</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, i) => (
            <tr
              key={i}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-3 font-medium">{item.name}</td>
              <td>{item.category}</td>
              <td>{item.region}</td>
              <td>{(item.variants ?? []).map((v) => v.weight).join(", ")}</td>
              <td className="text-center font-semibold">
                {Number(item?.totalStock || 0).toLocaleString()}
              </td>
              <td className={statusColor[item.status]}>
                {statusMap[item.status]}
              </td>
              <td className="text-right pr-4 space-x-2">
                <Link href={`/inventory/${item.id}`}>
                  <button className="text-blue-600 hover:text-blue-800">
                    <i className="fa fa-eye"></i>
                  </button>
                </Link>
                <button className="text-green-600 hover:text-green-800">
                  <i className="fa fa-edit"></i>
                </button>
                <button className="text-red-500 hover:text-red-800">
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}

          {/* Empty state */}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-6 text-gray-400">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
