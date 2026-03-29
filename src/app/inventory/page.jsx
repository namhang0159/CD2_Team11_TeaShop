import InventoryTable from "@/components/inventory/InventoryTable";
import { inventoryData } from "@/data/inventory";

export default function Page() {
  const data = inventoryData;

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý kho hàng</h1>
          <p className="text-gray-500 text-sm">Theo dõi tồn kho sản phẩm</p>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">
          + Thêm sản phẩm
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Tổng sản phẩm", value: "1,240" },
          { label: "Sắp hết", value: "12" },
          { label: "Hết hàng", value: "5" },
          { label: "Giá trị kho", value: "$45,200" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <h3 className="text-xl font-semibold mt-1">{item.value}</h3>
          </div>
        ))}
      </div>

      <InventoryTable data={data} />
    </div>
  );
}
