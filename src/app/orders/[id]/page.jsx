import { orders } from "@/data/orders";
import OrderDetail from "@/components/orders/detail/OrderDetail";

export default function Page({ params }) {
  const order = orders.find(o => o.id === params.id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return <OrderDetail order={order} />;
}