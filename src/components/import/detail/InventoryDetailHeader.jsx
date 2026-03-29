export default function InventoryDetailHeader({ data }) {
  return (
    <div className="flex items-start justify-between bg-white border border-gray-200 text-black rounded-xl p-6">
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Phiếu nhập #{data.importCode}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {data.supplierName} • {data.importDate}
        </p>

        <div className="flex gap-2 mt-3">
          <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {data.status}
          </span>
        </div>
      </div>

      {/* RIGHT ACTION */}
      <div className="flex gap-2">
        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
          In phiếu
        </button>

        <button className="px-4 py-2 border bg-green-600 text-white rounded-lg text-sm hover:opacity-90">
          Xuất PDF
        </button>
      </div>
    </div>
  );
}
