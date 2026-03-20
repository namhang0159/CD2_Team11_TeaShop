"use client";
import React from "react";

export default function StatsCard({ title, value, icon, change, trend }) {
  return (
    <div className="bg-white dark:bg-background-dark/40 p-6 rounded-xl border border-green-600/5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900  mt-1">{value}</h3>
        </div>
        <div className="size-10 bg-green-600/10 rounded-lg flex items-center justify-center text-green-600">
          <span className="material-symbols-outlined">
            <i class={`fa ${icon}`} aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div
        className={`mt-4 flex items-center gap-1 text-sm font-medium ${trend === "up" ? "text-green-600" : trend === "stable" ? "text-slate-400" : ""}`}
      >
        {trend === "up" && (
          <span className="material-symbols-outlined text-sm">
            <i class="fa fa-sort-up" aria-hidden="true"></i>
          </span>
        )}
        <span>{change}</span>
        {trend === "up" && (
          <span className="text-slate-400 font-normal ml-1">
            <i class="fa fa-moon-o" aria-hidden="true"></i>
          </span>
        )}
        {trend === "stable" && (
          <span className="text-slate-400 font-normal ml-1">
            <i class="fa fa-recycle" aria-hidden="true"></i>
          </span>
        )}
      </div>
    </div>
  );
}
