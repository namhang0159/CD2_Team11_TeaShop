export default function OrderLogistics({ order }) {
  return (
    <div className="bg-white border border-primary/10 rounded-xl shadow-sm p-6">

      <h3 className="text-xl font-bold mb-6">
        Logistics
      </h3>

      <div className="space-y-4">

        <div>

          <p className="text-xs uppercase text-slate-500 font-bold mb-1">
            Payment Method
          </p>

          <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
            {order.payment}
          </div>

        </div>


        <div>

          <p className="text-xs uppercase text-slate-500 font-bold mb-1">
            Shipping Method
          </p>

          <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
            {order.shipping}
          </div>

        </div>

      </div>

    </div>
  );
}