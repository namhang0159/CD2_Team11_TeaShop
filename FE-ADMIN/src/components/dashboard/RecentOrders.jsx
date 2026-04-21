"use client";
import React from "react";

export default function RecentOrders({ orders }) {
  return (
    <div className="bg-white dark:bg-background-dark/40 rounded-xl border border-green-600/5 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-green-600/5 flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-black ">
          Đơn hàng gần đây
        </h3>
        <button className="bg-green-600 hover:bg-green-600/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
          Xem tất cả
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-soft-gray  text-xs font-bold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Mã đơn hàng</th>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Ngày đặt</th>
              <th className="px-6 py-4">Giá trị</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-600/5">
            {orders.map((o, i) => (
              <tr
                key={i}
                className="hover:bg-soft-gray/50 dark:hover:bg-green-600/5 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-900 ">
                  {o.id}
                </td>
                <td className="px-6 py-4 text-sm text-black ">{o.customer}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {o.product}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{o.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-black">
                  {o.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-[10px] font-bold rounded-full  text-black`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="material-symbols-outlined text-slate-400 hover:text-green-600 transition-colors">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
