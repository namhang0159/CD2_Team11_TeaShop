export default function OrdersTable() {
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold">Đơn hàng gần đây</h3>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-100 text-xs">
          <tr>
            <th className="px-6 py-3">Mã đơn</th>
            <th className="px-6 py-3">Khách hàng</th>
            <th className="px-6 py-3">Sản phẩm</th>
            <th className="px-6 py-3">Giá trị</th>
            <th className="px-6 py-3">Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="px-6 py-4">#DH-00241</td>
            <td className="px-6 py-4">Trần Văn Tú</td>
            <td className="px-6 py-4">Trà Shan Tuyết</td>
            <td className="px-6 py-4">2.4M</td>
            <td className="px-6 py-4 text-green-600">Hoàn thành</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
