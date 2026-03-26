export default function OrdersFilter() {
  return (
    <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-primary/10 shadow-sm space-y-4">

      <div className="flex flex-col lg:flex-row lg:items-center gap-4">

        {/* search */}
        <div className="flex-1">

          <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
            Search Orders
          </label>

          <div className=  "bg-green-700 relative" >

            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
</span>


           <input
  type="text"
  placeholder="Search by Order ID, customer name..."
  className="w-full pl-10 pr-4 py-2 bg-green-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-green-300"
/>

          </div>

        </div>

        {/* status */}
        <div className="w-full lg:w-48">

          <label className=" block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
            Order Status
          </label>

          <select className="bg-green-200 text-green-900 p-4 rounded w-full bg-primary/5 border-none rounded-lg text-sm py-2">

            <option>All Statuses</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>

          </select>

        </div>

        {/* date */}
        <div className="w-full lg:w-64">

          <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
            Date Range
          </label>

          <input
            type="text"
            value="Oct 01, 2023 - Oct 31, 2023"
            className="bg-green-200 text-green-900 p-4 rounded w-full pl-4 pr-4 py-2 bg-primary/5 border-none rounded-lg text-sm"
            readOnly
          />

        </div>

      </div>

    </div>
  );
}