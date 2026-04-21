export default function OrderTimeline({ order }) {
  const steps = [
    {
      title: "Order Created",
      text: order?.created_at,
      icon: "shopping_cart",
    },
    {
      title: "Payment Status",
      text: order?.payment_status,
      icon: "payments",
    },
    {
      title: "Order Status",
      text: order?.status,
      icon: "local_shipping",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">Order Timeline</h3>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-green-200" />

        {steps.map((t, i) => (
          <div key={i} className="relative flex justify-between pl-12 mb-8">
            <div className="absolute left-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">
                {t.icon}
              </span>
            </div>

            <div>
              <p className="font-bold">{t.title}</p>
              <p className="text-sm text-slate-500">{t.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
