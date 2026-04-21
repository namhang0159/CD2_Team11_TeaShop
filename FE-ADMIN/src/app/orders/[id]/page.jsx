"use client";

import { orders } from "@/data/orders";
import OrderDetail from "@/components/orders/detail/OrderDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetOrderDetailByIdAPI } from "@/util/orders";

export default function Page() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchOrderDetail = async () => {
      const res = await GetOrderDetailByIdAPI(id);
      setOrder(res.data);
    };

    fetchOrderDetail();
  }, [id]);
  if (!order) {
    return <div>Order not found</div>;
  }

  return <OrderDetail order={order} />;
}
