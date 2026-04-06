"use client";

import { useEffect, useMemo, useState } from "react";
import OrdersFilter from "@/components/orders/OrdersFilter";
import OrdersTable from "@/components/orders/OrdersTable";
import OrdersStats from "@/components/orders/OrdersStats";
import { GetOrdersAPI } from "@/util/orders";

export default function Page() {
  const [orders, setOrders] = useState(null);

  // filter state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await GetOrdersAPI();
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  // 🔥 FILTER DATA (real logic)
  const filteredOrders = useMemo(() => {
    const list = orders || [];

    return list.filter((o) => {
      const matchSearch =
        o.id.toString().includes(search) ||
        o.user?.full_name?.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" ? true : o.status === status;

      const matchDate =
        (!fromDate || new Date(o.created_at) >= new Date(fromDate)) &&
        (!toDate || new Date(o.created_at) <= new Date(toDate));

      return matchSearch && matchStatus && matchDate;
    });
  }, [orders, search, status, fromDate, toDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 space-y-6">
      <OrdersFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <OrdersStats orders={orders} />

      <OrdersTable orders={filteredOrders} />
    </div>
  );
}
