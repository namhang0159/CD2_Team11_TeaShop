"use client";

import CustomerTable from "@/components/customers/CustomerTable";
import Link from "next/link";

export default function CustomerPage() {
  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Khách hàng</h1>
          <p className="text-gray-500 text-sm mt-1">
            Quản lý thông tin người dùng
          </p>
        </div>
      </div>

      <CustomerTable />
    </div>
  );
}
