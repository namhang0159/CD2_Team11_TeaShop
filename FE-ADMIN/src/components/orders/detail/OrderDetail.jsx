import OrderItems from "./OrderItems";
import OrderTimeline from "./OrderTimeline";
import OrderCustomer from "./OrderCustomer";
import OrderLogistics from "./OrderLogistics";

export default function OrderDetail({ order }) {
  const data = order || {};

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 ">
      {/* header */}
      <div>
        <h2 className="text-4xl font-bold">Order #{data?.id}</h2>

        <p className="text-slate-500">
          Placed on {data?.created_at} •
          <span className="text-primary ml-1">{data?.status}</span>
        </p>
      </div>

      {/* summary */}
      <div className="grid grid-cols-3 gap-6">
        <Card title="Order Date" value={data?.created_at} />
        <Card title="Payment Status" value={data?.payment_status} />
        <Card
          title="Total Amount"
          value={`${Number(data?.total_amount || 0).toLocaleString()} ₫`}
          primary
        />
      </div>

      {/* layout */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <OrderItems order={data} />
          <OrderTimeline order={data} />
        </div>

        <div className="space-y-8">
          <OrderCustomer order={data} />
          <OrderLogistics
            order={{
              address: data?.address,
              shipping_fee: data?.shipping_fee,
              payment_method: data?.payment_method,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, primary }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <p className={`text-2xl font-bold ${primary ? "text-primary" : ""}`}>
        {value}
      </p>
    </div>
  );
}
