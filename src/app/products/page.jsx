"use client";

import ProductTable from "@/components/products/ProductRow";

export default function ProductPage() {
  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Danh sách sản phẩm</h1>
          <p className="text-gray-500 text-sm mt-1">
            Quản lý kho hàng và thông tin sản phẩm.
          </p>
        </div>
        <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700">
          <span className="material-symbols-outlined">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </span>{" "}
          Thêm sản phẩm mới
        </button>
      </div>
      <ProductTable />
    </div>
  );
}
