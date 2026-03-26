export default function OrderCustomer({ order }) {
  return (
    <div className="bg-white border border-primary/10 rounded-xl shadow-sm p-6">

      <h3 className="text-xl font-bold mb-6">
        Customer Details
      </h3>


      <div className="flex items-center gap-4 mb-6">

        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">
            person
          </span>
        </div>

        <div>

          <p className="font-bold">
            {order.name}
          </p>

          <p className="text-sm text-slate-500">
            Customer
          </p>

        </div>

      </div>


      <div className="space-y-3">

        <p>Email: {order.email}</p>

        <p>Phone: {order.phone}</p>

        <p>{order.address}</p>

      </div>

    </div>
  );
}