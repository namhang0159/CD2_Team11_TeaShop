import OrderItems from "./OrderItems";
import OrderTimeline from "./OrderTimeline";
import OrderCustomer from "./OrderCustomer";
import OrderLogistics from "./OrderLogistics";

export default function OrderDetail({ order }) {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 bg-green-50">
      {/* header */}

      <div>
        <h2 className="text-4xl font-bold">Order #{order.id}</h2>

        <p className="text-slate-500">
          Placed on {order.date} •
          <span className="text-primary ml-1">{order.status}</span>
        </p>
      </div>

      {/* summary */}

      <div className="grid grid-cols-3 gap-6">
        <Card title="Order Date" value={order.date} />

        <Card title="Order Status" value={order.status} />

        <Card title="Total Amount" value={`$${order.total}`} primary />
      </div>

      {/* layout */}

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <OrderItems order={order} />

          <OrderTimeline order={order} />
        </div>

        <div className="space-y-8">
          <OrderCustomer order={order} />

          <OrderLogistics order={order} />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, primary }) {
  return (
    <div className="p-6 bg-white border border-primary/10 rounded-xl shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <p className={`text-2xl font-bold ${primary ? "text-primary" : ""}`}>
        {value}
      </p>
    </div>
  );
}
