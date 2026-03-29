import Link from "next/link";
export default function OrdersTable({ orders }) {
  const color = (s) => {
    if (s === "Pending")
      return "bg-yellow-100 text-yellow-800 border-yellow-200";

    if (s === "Shipped")
      return "bg-blue-100 text-blue-800 border-blue-200";

    if (s === "Delivered")
      return "bg-green-100 text-green-800 border-green-200";

    if (s === "Cancelled")
      return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="bg-white dark:bg-background-dark rounded-xl border border-primary/10 shadow-sm overflow-hidden  border-gray-100">

      <table className="w-full text-left  ">

        <thead>

          <tr className="bg-primary/5 border-b border-primary/10">

            <th className="px-6 py-4 text-xs font-bold">Order ID</th>
            <th className="px-6 py-4 text-xs font-bold">Date</th>
            <th className="px-6 py-4 text-xs font-bold">Customer Name</th>
            <th className="px-6 py-4 text-xs font-bold">Total Amount</th>
            <th className="px-6 py-4 text-xs font-bold">Payment</th>
            <th className="px-6 py-4 text-xs font-bold">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody className="divide-y divide-primary/5">

          {orders.map((o) => (

            <tr key={o.id} className="hover:bg-primary/5">

              <td className="px-6 py-4 font-bold">
                {o.id}
              </td>

              <td className="px-6 py-4">
                {o.date}
              </td>

              <td className="px-6 py-4 font-medium">
                {o.name}
              </td>

              <td className="px-6 py-4 font-bold text-primary">
                ${o.total}
              </td>

              <td className="px-6 py-4 text-xs">
                {o.payment}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>

              </td>
<td className="px-6 py-4 text-right">

  <div className="flex items-center justify-end gap-2">

    {/* VIEW */}
   <Link
  href={`/orders/${o.id}`}
  className="p-1.5 rounded bg-primary/10 text-primary  hover:bg-slate-200"
>
  <span className="material-symbols-outlined fa-solid fa-eye bg-red-400">
    
  </span>
</Link>


    {/* EDIT */}
    <button className=" p-1.5 rounded bg-emerald-400 text-slate-600 hover:bg-slate-200 ">
      <span className=" material-symbols-outlined text-base fa-solid fa-edit">
      </span>
    </button>


    {/* PRINT */}
    <button className="bg-pink-300 p-1.5 rounded  text-slate-600 hover:bg-slate-200 " >
      <span className="material-symbols-outlined text-base fa-solid fa-print">
      </span>
    </button>

  </div>

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}