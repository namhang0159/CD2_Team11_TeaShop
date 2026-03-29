export default function OrderCustomer({ order }) {
  return (
    <div className="bg-white  rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">Customer Details</h3>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">
            <i className="fa-solid fa-person" aria-hidden="true"></i>
          </span>
        </div>

        <div>
          <p className="font-bold">{order.name}</p>

          <p className="text-sm text-slate-500">Customer</p>
        </div>
      </div>

      <div className="space-y-3">
        <p>
          <i className="fa fa-mail-forward" aria-hidden="true"></i>: {order.email}
        </p>

        <p>
          <i className="fa fa-phone" aria-hidden="true"></i>: {order.phone}
        </p>

        <p>{order.address}</p>
      </div>
    </div>
  );
}
