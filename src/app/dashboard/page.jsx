"use client";

import RecentOrders from "@/components/dashboard/RecentOrders";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatsCard from "@/components/dashboard/StatsCard";
import TopProducts from "@/components/dashboard/TopProducts";
import { getRecentOrders, getStats, getTopProducts } from "@/util/api";
import { useEffect, useState } from "react";

export default function MainContent() {
  const [stats, setStats] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  useEffect(() => {
    const fetchStats = async () => {
      const statsResponse = await getStats();
      console.log(statsResponse);
      setStats(statsResponse);
    };
    const fetchTopProducts = async () => {
      const topProductsResponse = await getTopProducts();
      setTopProducts(topProductsResponse);
    };
    const fetchRecentOrders = async () => {
      const recentOrdersResponse = await getRecentOrders();
      setRecentOrders(recentOrdersResponse);
    };
    fetchTopProducts();
    fetchRecentOrders();
    fetchStats();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold text-forest-green dark:text-green-600 leading-tight">
          Tổng quan hệ thống
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Chào mừng bạn quay trở lại, đây là những gì đang diễn ra hôm nay.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatsCard key={i} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RevenueChart />
        <TopProducts products={topProducts} />
      </div>

      <RecentOrders orders={recentOrders} />
    </div>
  );
}
