import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductRow({ product }) {
  const statusColors = {
    inStock: "text-green-600 bg-green-100",
    lowStock: "text-orange-500 bg-orange-100",
    outStock: "text-red-500 bg-red-100",
  };

  return (
    <tr
      className="hover:bg-green-50 transition-colors cursor-pointer"
      onClick={() => (window.location.href = `/products/${product.slug}`)}
    >
      <td className="px-6 py-4 flex items-center gap-3">
        <Link href={`/products/${product.slug}`}>
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
          <Link href={`/products/${product.slug}`}>
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
            <i className="fa fa-edit" aria-hidden="true"></i>
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
