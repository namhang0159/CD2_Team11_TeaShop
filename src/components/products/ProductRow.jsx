"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products"; // file chứa data sản phẩm

function ProductRow({ product }) {
  const statusColors = {
    inStock: "text-green-600 bg-green-100",
    lowStock: "text-orange-500 bg-orange-100",
    outStock: "text-red-500 bg-red-100",
  };

  return (
    <tr
  className="hover:bg-green-50 transition-colors cursor-pointer"
  onClick={() => window.location.href = `/products/${product.id}`}
>
      <td className="px-6 py-4 flex items-center gap-3">
     <Link href={`/products/${product.id}`}>
  <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
    <Image
      width={40}
      height={40}
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  </div>
</Link>
        <div className="flex flex-col">
          <Link href={`/products/${product.id}`}>
  <span className="font-bold text-black hover:text-green-600">
    {product.name}
  </span>
</Link>
          <span className="text-xs text-gray-500 font-mono">
            SKU: {product.sku}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
            product.category === "tra"
              ? "text-green-600 bg-green-100"
              : "text-blue-600 bg-blue-100"
          }`}
        >
          {product.category === "tra" ? "Trà" : "Phụ kiện"}
        </span>
      </td>
      <td className="px-6 py-4 text-right font-semibold">
        {product.price.toLocaleString()}đ
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-medium ${
            statusColors[product.status]
          }`}
        >
          {product.status === "inStock"
            ? `In Stock (${product.stock})`
            : product.status === "lowStock"
              ? `Low Stock (${product.stock})`
              : `Out of Stock (${product.stock})`}
        </span>
      </td>
      <td className="px-6 py-4 flex justify-center gap-2">
        <button className="p-1.5 rounded-lg hover:bg-green-600 hover:text-white text-gray-400">
          <span className="material-symbols-outlined text-sm">
            <i  className="fa fa-trash" aria-hidden="true"></i>
          </span>
        </button>
        <button className="p-1.5 rounded-lg hover:bg-red-500 hover:text-white text-gray-400">
          <span className="material-symbols-outlined text-sm">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </span>
        </button>
      </td>
    </tr>
  );
}

export default function ProductTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredProducts = [...products].filter(
    (p) =>
      // lọc theo search
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())) &&
      // lọc theo danh mục
      (categoryFilter === "" || p.category === categoryFilter) &&
      // lọc theo trạng thái kho
      (statusFilter === "" || p.status === statusFilter),
  );

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden p-4 flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-62.5 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên sản phẩm hoặc SKU..."
            className="w-full pl-10 pr-4 py-2.5 border-none rounded-lg bg-green-50 focus:ring-2 focus:ring-green-600/50"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-green-50 border-none rounded-lg text-sm py-2.5 pl-4 pr-10 focus:ring-2 focus:ring-green-600/50"
        >
          <option className="" value="">Tất cả danh mục</option>
          <option value="tra">Trà</option>
          <option value="phukien">Phụ kiện</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-green-50 border-none rounded-lg text-sm py-2.5 pl-4 pr-10 focus:ring-2 focus:ring-green-600/50"
        >
          <option value="">Tình trạng kho</option>
          <option value="inStock">In Stock</option>
          <option value="lowStock">Low Stock</option>
          <option value="outStock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-50 text-green-600 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4 text-right">Giá bán</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => <ProductRow key={p.id} product={p} />)
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-gray-400 font-medium"
                >
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
