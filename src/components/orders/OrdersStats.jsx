export default function OrdersStats({ orders = [] }) {
  const list = Array.isArray(orders) ? orders : [];

  const total = list.length;

  const revenue = list.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

  const pending = list.filter((o) => o.status === "Pending").length;

  const delivered = list.filter((o) => o.status === "Delivered").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Box title="Total Orders" value={total} />
      <Box title="Revenue" value={revenue.toLocaleString("vi-VN") + "₫"} />
      <Box title="Pending" value={pending} />
      <Box title="Delivered" value={delivered} />
    </div>
  );
}

function Box({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
      <p className="text-xs text-gray-500 uppercase font-semibold">{title}</p>

      <div className="text-2xl font-bold text-gray-800 mt-1">{value}</div>
    </div>
  );
}
