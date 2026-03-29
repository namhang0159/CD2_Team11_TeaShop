"use client";

import SupplierTable from "@/components/suppliers/SupplierTable";
import Link from "next/link";

export default function SupplierPage() {
  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Nhà cung cấp</h1>
          <p className="text-gray-500 text-sm mt-1">
            Quản lý thông tin nhà cung cấp.
          </p>
        </div>

        <Link
          href="/suppliers/add"
          className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-700"
        >
          Thêm nhà cung cấp
        </Link>
      </div>

      <SupplierTable />
    </div>
  );
}
