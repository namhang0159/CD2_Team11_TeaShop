"use client";

import { orders } from "@/data/orders";
import OrderDetail from "@/components/orders/detail/OrderDetail";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  const order = orders.find((item) => item.id == id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return <OrderDetail order={order} />;
}
