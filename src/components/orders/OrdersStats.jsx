export default function OrdersStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-green-600">

      <Box title="Today's Orders" value="12" />
      <Box title="Total Revenue" value="$1240" />
      <Box title="Pending Shipment" value="7" />
      <Box title="Active Customers" value="892" />

    </div>
  );
}

function Box({ title, value }) {
  return (
    <div className="bg-white dark:bg-background-dark p-4 rounded-xl border border-primary/10 shadow-sm border border-gray-100">

      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
        {title}
      </p>

      <div className="text-2xl font-black text-primary">
        {value}
      </div>

    </div>
  );
}