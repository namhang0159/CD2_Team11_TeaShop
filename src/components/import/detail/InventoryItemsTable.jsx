export default function InventoryItemsTable({ items }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-4 border-b flex justify-between">
        <h3 className="font-semibold text-gray-900">Chi tiết sản phẩm</h3>

        <span className="text-sm text-gray-500">{items.length} sản phẩm</span>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
          <tr>
            <th className="text-left p-4">Sản phẩm</th>
            <th className="text-left p-4">Option</th>
            <th className="text-left p-4">Batch</th>
            <th className="text-center p-4">SL</th>
            <th className="text-right p-4">Giá nhập</th>
            <th className="text-right p-4">Thành tiền</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-900">
                {item.productName}
              </td>

              <td className="p-4 text-gray-500">{item.optionName}</td>

              <td className="p-4 text-gray-500">{item.batchCode}</td>

              <td className="p-4 text-center">{item.quantity}</td>

              <td className="p-4 text-right">
                {item.importPrice.toLocaleString()}
              </td>

              <td className="p-4 text-right font-semibold">
                {(item.quantity * item.importPrice).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
