"use client";
import { useRouter } from "next/navigation";

export default function InventoryTable({ data = [] }) {
  const router = useRouter();

  const statusMap = {
    Received: "good",
    Pending: "warning",
    Cancelled: "danger",
  };

  const statusUI = {
    good: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };

  const statusText = {
    good: "Ổn định",
    warning: "Sắp hết",
    danger: "Nguy hiểm",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Danh sách phiếu nhập</h3>

        <span className="text-xs text-gray-500">
          Tổng: {data.length} phiếu nhập
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="text-left px-6 py-3">Mã nhập</th>
              <th>Ngày nhập</th>
              <th>Nhà cung cấp</th>
              <th className="text-center">Sản phẩm</th>
              <th className="text-center">Tồn kho</th>
              <th className="text-right">Tổng tiền</th>
              <th className="text-right">Trạng thái</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((item) => {
              const status = statusMap[item.status] || "warning";

              return (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.importCode}
                  </td>

                  <td className="text-gray-600">{item.importDate}</td>

                  <td className="text-gray-700">{item.supplierName}</td>

                  <td className="text-center font-medium">
                    {item.totalProducts}
                  </td>

                  <td className="text-center font-bold text-gray-800">
                    {item.totalStock}
                  </td>

                  <td className="text-right font-semibold text-green-600">
                    {Number(item.totalAmount || 0).toLocaleString()} đ
                  </td>

                  <td className="text-right px-6">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        statusUI[status]
                      }`}
                    >
                      {statusText[status]}
                    </span>
                  </td>

                  <td className="text-right px-6">
                    <button
                      onClick={() => router.push(`/inventory/${item.id}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Chi tiết →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
