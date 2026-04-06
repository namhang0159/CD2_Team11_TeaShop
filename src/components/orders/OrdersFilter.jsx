export default function OrdersFilter({
  search,
  setSearch,
  status,
  setStatus,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* SEARCH */}
        <div className="flex-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Search
          </label>

          <div className="relative mt-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID or customer..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* STATUS */}
        <div className="w-full lg:w-48">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full py-2 px-3 rounded-xl border border-gray-200"
          >
            <option value="All">All</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* DATE */}
        <div className="w-full lg:w-72">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Date Range
          </label>

          <div className="flex gap-2 mt-1">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-gray-200"
            />

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
