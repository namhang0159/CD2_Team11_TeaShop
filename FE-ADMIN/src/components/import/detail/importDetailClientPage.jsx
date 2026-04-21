"use client";

import { useEffect, useState } from "react";
import InventoryDetailHeader from "./InventoryDetailHeader";
import SupplierCard, { ImportInfoCard, TimelineCard } from "./InventorySummary";
import ItemsTable from "./ItemTable";
import TotalSection from "./TotalSection";
import { GetImportInventoryDetailByIdAPI } from "@/util/import";

// const ImportDetailClientPage = ({ id }) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await GetImportInventoryDetailByIdAPI(id);
//         setData(res.data); // ✅ FIX CHÍNH
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (id) fetchData();
//   }, [id]);

//   if (!data) {
//     return <div className="p-6 text-gray-500">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       {/* HEADER */}
//       <div className="p-8">
//         <InventoryDetailHeader data={data} />
//       </div>

//       {/* GRID */}
//       <div className="p-8 grid grid-cols-3 gap-6">
//         <SupplierCard data={data} />
//         <ImportInfoCard data={data} />
//         <TimelineCard data={data} />
//       </div>

//       {/* TABLE */}
//       <div className="px-8">
//         <ItemsTable items={data.items} />
//       </div>

//       {/* TOTAL */}
//       <div className="px-8 flex justify-end mt-6">
//         <TotalSection items={data.items} />
//       </div>
//     </div>
//   );
// };

// export default ImportDetailClientPage;
const ImportDetailClientPage = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetImportInventoryDetailByIdAPI(id);
        const d = res.data; // ✅ LẤY DỮ LIỆU GỐC TRƯỚC KHI MAP
        console.log("Raw API Data:", res); // ✅ LOG DỮ LIỆU GỐC
        // 🔥 MAP CHUẨN Ở ĐÂY
        const formatted = {
          id: d.id,
          importCode: `IMP-${d.importCode}`,
          importDate: d.importDate,
          suppliers: {
            supplierId: d.suppliers.supplierId,
            supplierName: d.suppliers.supplierName,
            supplierPhone: d.suppliers.supplierPhone,
            supplierAddress: d.suppliers.supplierAddress,
          },
          status: d.status,
          totalAmount: Number(d.totalAmount),

          items: d.items.map((i, index) => ({
            id: index,
            productName: i.productName,
            optionName: i.optionName,
            batchCode: i.batchCode,
            importPrice: Number(i.importPrice),
            quantity: i.quantity,
            expiryDate: i.expiryDate || null,
          })),
        };

        setData(formatted);
        console.log("Formatted Data:", formatted); // ✅ LOG DỮ LIỆU ĐÃ MAP
      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (!data) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-8">
        <InventoryDetailHeader data={data} />
      </div>

      <div className="p-8 grid grid-cols-3 gap-6">
        <SupplierCard data={data.suppliers} />
        <ImportInfoCard data={data} />
        <TimelineCard />
      </div>

      <div className="px-8">
        <ItemsTable items={data.items} />
      </div>

      <div className="px-8 flex justify-end mt-6">
        <TotalSection items={data.items} />
      </div>
    </div>
  );
};
export default ImportDetailClientPage;
