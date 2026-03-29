"use client";

import { inventoryData } from "@/data/inventory";
import { useParams, useRouter } from "next/navigation";

const statusConfig = {
  in_stock: {
    label: "Còn hàng",
    dot: "bg-green-500",
  },
  low_stock: {
    label: "Sắp hết",
    dot: "bg-yellow-500",
  },
  out_of_stock: {
    label: "Hết hàng",
    dot: "bg-red-500",
  },
};

export default function InventoryDetail() {
  const { id } = useParams();
  const router = useRouter();

  const product = inventoryData.find((item) => item.id == id);

  if (!product) {
    return <div className="p-10 text-center text-gray-400">Not found</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-400 hover:text-black mb-3"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-semibold tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
            <span>{product.category}</span>
            <span>•</span>
            <span>{product.region}</span>

            <span className="flex items-center gap-1 ml-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  statusConfig[product.status].dot
                }`}
              />
              {statusConfig[product.status].label}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
            Xuất kho
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-xl p-4">
          <p className="text-xs text-gray-400">Total stock</p>
          <p className="text-xl font-semibold mt-1">
            {product.totalStock.toLocaleString()}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-xs text-gray-400">Variants</p>
          <p className="text-xl font-semibold mt-1">
            {product.variants.length}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-xs text-gray-400">Last update</p>
          <p className="text-sm mt-1">{product.updatedAt}</p>
        </div>
      </div>

      {/* VARIANTS LIST */}
      <div className="border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b text-sm font-medium">Variants</div>

        <div>
          {product.variants.map((variant) => (
            <div
              key={variant.variantId}
              className="border-b last:border-none px-5 py-4 hover:bg-gray-50 transition"
            >
              {/* top row */}
              <div className="flex items-center justify-between">
                <div className="font-medium">{variant.weight}</div>

                <div className="text-sm font-semibold">
                  {variant.stock} units
                </div>
              </div>

              {/* batches */}
              <div className="mt-3 flex flex-wrap gap-2">
                {variant.batches.map((b, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 border rounded-lg text-xs bg-white hover:shadow-sm transition"
                  >
                    <p className="font-medium">{b.batchCode}</p>
                    <p className="text-gray-500">
                      {b.quantity} • {b.expiry}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
