"use client";
import React from "react";

export default function TopProducts({ products }) {
  return (
    <div className="bg-white dark:bg-background-dark/40 p-6 rounded-xl border border-green-600/5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl font-bold text-black ">
          Sản phẩm bán chạy
        </h3>
        <button className="text-green-600 text-sm font-medium hover:underline">
          Xem thêm
        </button>
      </div>
      <div className="space-y-4">
        {products.map((p, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className="size-12 rounded-lg bg-soft-gray bg-cover bg-center"
              style={{ backgroundImage: `url(${p.img})` }}
            ></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900  truncate">
                {p.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{p.sold} lượt bán</p>
            </div>
            <p className="text-sm font-bold text-black dark:text-green-600">
              {p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
