export default function InventoryFilter({
  keyword,
  setKeyword,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minProducts,
  setMinProducts,
  maxProducts,
  setMaxProducts,
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap gap-3 items-center">
      {/* SEARCH */}
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm mã nhập / nhà cung cấp..."
        className="flex-1 min-w-[220px] border border-gray-200 px-3 py-2 rounded-lg text-sm"
      />

      {/* DATE FROM */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border px-3 py-2 rounded-lg text-sm border-gray-200"
      />

      {/* DATE TO */}
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border px-3 py-2 rounded-lg text-sm border-gray-200"
      />

      {/* MIN PRICE */}
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Giá từ"
        className="border px-3 py-2 rounded-lg text-sm w-[120px] border-gray-200"
      />

      {/* MAX PRICE */}
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Giá đến"
        className="border px-3 py-2 rounded-lg text-sm w-[120px] border-gray-200"
      />

      {/* MIN PRODUCTS */}
      <input
        type="number"
        value={minProducts}
        onChange={(e) => setMinProducts(e.target.value)}
        placeholder="SP tối thiểu"
        className="border px-3 py-2 rounded-lg text-sm w-[120px] border-gray-200"
      />

      {/* MAX PRODUCTS */}
      <input
        type="number"
        value={maxProducts}
        onChange={(e) => setMaxProducts(e.target.value)}
        placeholder="SP tối đa"
        className="border px-3 py-2 rounded-lg text-sm w-[120px] border-gray-200"
      />

      {/* RESET */}
      <button
        onClick={() => {
          setKeyword("");
          setStartDate("");
          setEndDate("");
          setMinPrice("");
          setMaxPrice("");
          setMinProducts("");
          setMaxProducts("");
        }}
        className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 border-gray-200"
      >
        Reset
      </button>
    </div>
  );
}
