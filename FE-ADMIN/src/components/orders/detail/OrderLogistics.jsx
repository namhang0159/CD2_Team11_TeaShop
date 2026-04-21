export default function OrderLogistics({ order }) {
  const payment = order?.payment_method?.name;
  const shipping = order?.address;

  return (
    <div className="bg-white border border-primary/10 rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">Logistics</h3>

      <div className="space-y-4">
        {/* PAYMENT METHOD */}
        <div>
          <p className="text-xs uppercase text-slate-500 font-bold mb-1">
            Payment Method
          </p>

          <div className="p-3 rounded-lg bg-green-50">{payment}</div>
        </div>

        {/* SHIPPING INFO */}
        <div>
          <p className="text-xs uppercase text-slate-500 font-bold mb-1">
            Shipping Address
          </p>

          <div className="p-3 rounded-lg bg-green-50 text-sm space-y-1">
            <p>
              <b>{shipping?.receiver_name}</b>
            </p>
            <p>{shipping?.phone}</p>
            <p>{shipping?.details}</p>
          </div>
        </div>

        {/* SHIPPING FEE */}
        <div>
          <p className="text-xs uppercase text-slate-500 font-bold mb-1">
            Shipping Fee
          </p>

          <div className="p-3 rounded-lg bg-green-50">
            {Number(order?.shipping_fee || 0).toLocaleString()} ₫
          </div>
        </div>
      </div>
    </div>
  );
}
