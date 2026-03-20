"use client";
import React from "react";

export default function RevenueChart() {
  const data = [0.5, 0.66, 0.75, 0.5, 0.83, 1, 0.66];
  const days = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-800">
          Doanh thu theo thời gian
        </h3>

        <select className="bg-gray-100 rounded-lg text-sm px-3 py-1.5 focus:ring-1 focus:ring-green-500 text-black">
          <option>7 ngày qua</option>
          <option>30 ngày qua</option>
          <option>Quý này</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end justify-between gap-3 px-2">
        {data.map((h, i) => (
          <div key={i} className="w-full flex flex-col items-center group">
            {/* Bar */}
            <div className="relative w-full flex items-end h-64">
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                {Math.round(h * 6)}M
              </div>

              {/* Column */}
              <div
                style={{ height: `${h * 100}%` }}
                className="w-full bg-green-200 hover:bg-green-600 rounded-t-md transition-all duration-300"
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="flex justify-between mt-4 px-2 text-xs text-gray-500">
        {days.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
}
