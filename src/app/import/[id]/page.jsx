"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ImportInfoCard,
  SupplierCard,
  TimelineCard,
} from "@/components/import/detail/InventorySummary";
import ItemsTable from "@/components/import/detail/ItemTable";
import TotalSection from "@/components/import/detail/TotalSection";
import { inventoryData } from "@/data/import";
import InventoryDetailHeader from "@/components/import/detail/InventoryDetailHeader";

export default function InventoryDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const found = inventoryData.find((x) => x.id == id);
    setData(found);
  }, [id]);

  if (!data) {
    return <div className="p-6 text-gray-500">Không tìm thấy phiếu nhập</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <div className="p-8">
        <InventoryDetailHeader data={data} />
      </div>
      {/* MAIN GRID (giống HTML: 3 cột card) */}
      <div className="p-8 grid grid-cols-3 gap-6">
        <SupplierCard data={data} />

        <ImportInfoCard data={data} />

        <TimelineCard data={data} />
      </div>

      {/* TABLE */}
      <div className="px-8">
        <ItemsTable items={data.items} />
      </div>

      {/* TOTAL */}
      <div className="px-8 flex justify-end mt-6">
        <TotalSection items={data.items} />
      </div>
    </div>
  );
}
