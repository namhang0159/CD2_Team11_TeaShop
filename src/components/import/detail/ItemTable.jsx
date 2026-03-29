export default function ItemsTable({ items }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-6">
      <div className="p-4 border-b border-gray-200 font-bold">
        Danh sách mặt hàng
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs">
          <tr>
            <th className="p-3 text-left">Sản phẩm</th>
            <th className="p-3 text-left">Option</th>
            <th className="p-3 text-right">Giá</th>
            <th className="p-3 text-center">SL</th>
            <th className="p-3 text-right">Tổng</th>
          </tr>
        </thead>

        <tbody>
          {items.map((i) => (
            <tr
              key={i.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="p-3 font-medium">{i.productName}</td>

              <td className="p-3 text-gray-500">{i.optionName}</td>

              <td className="p-3 text-right">
                {i.importPrice.toLocaleString()}
              </td>

              <td className="p-3 text-center">{i.quantity}</td>

              <td className="p-3 text-right font-semibold">
                {(i.quantity * i.importPrice).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
