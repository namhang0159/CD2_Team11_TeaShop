import OrdersFilter from "@/components/orders/OrdersFilter";
import OrdersTable from "@/components/orders/OrdersTable";
import OrdersStats from "@/components/orders/OrdersStats";

import { orders } from "@/data/orders";

export default function Page() {
  return (
    <div className="space-y-6 ">
      <OrdersFilter />

      <OrdersTable orders={orders} />

      <OrdersStats />
    </div>
  );
}
