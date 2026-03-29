"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProductById } from "@/util/api";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProductById(params.id);
      setProduct(data);
    };
    fetch();
  }, [params.id]);

  if (!product) return <div className="p-8">Loading...</div>;

  const statusMap = {
    inStock: "In Stock",
    lowStock: "Low Stock",
    outStock: "Out of Stock",
  };

  return (
    <div className="w-full space-y-8 -m-4 p-8 bg-background-light dark:bg-background-dark bg-green-50">

      {/* TOP BAR */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/products")}
          className="flex items-center gap-1 text-slate-500 hover:text-primary text-sm font-medium"
        >
          ← Back to List
        </button>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>

        <h2 className="text-lg font-bold">Product Details</h2>
      </div>

    

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

  {/* LEFT */}
  <div className="lg:col-span-1 space-y-6">

    <div
      className="aspect-square rounded-xl bg-slate-100 bg-cover bg-center border border-primary/5 border border-gray-50"
      style={{ backgroundImage: `url(${product.image})` }}
    />

    {/* INVENTORY LEFT (giống HTML) */}
    <div className="p-6 bg-white dark:bg-background-dark/40 rounded-xl border border-primary/10 bor border-gray-300">
      <h3 className="font-bold text-sm uppercase text-slate-500 mb-4">
        Inventory Status
      </h3>

      <div className="flex justify-between mb-2">
        <span className="text-sm">Stock Level</span>
        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
          {statusMap[product.status]}
        </span>
      </div>

      <div className="w-full bg-slate-200 h-2 rounded-full mb-4">
        <div
          className="bg-primary h-full rounded-full"
          style={{ width: `${Math.min(product.stock, 100)}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-500">Current Qty</p>
          <p className="font-bold">{product.stock}</p>
        </div>

        <div>
          <p className="text-slate-500">Reorder Pt</p>
          <p className="font-bold">120</p>
        </div>
      </div>
    </div>

  </div>

  {/* RIGHT - CARD TO */}
  <div className="lg:col-span-2">
    <div className="bg-white dark:bg-background-dark/40 p-8 rounded-xl border border-primary/10 border-gray-100">

      {/* TITLE */}
      <div className="flex justify-between mb-6 border border-gray-50">
        <div>
          <h1 className="text-3xl font-black mb-2">
            {product.name}
          </h1>

          <div className="flex gap-3 text-sm text-slate-500">
            <span>SKU: {product.sku}</span>
            <span>{product.category}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase text-slate-400">
            Unit Price
          </p>
          <p className="text-3xl font-black text-primary text-green-500">
            {product.price.toLocaleString()} ₫
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mb-6 " >
        <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">
          Product Description
        </h3>

        <p className="italic text-slate-600">
          Sản phẩm trà cao cấp với hương vị tinh tế, phù hợp thưởng thức hằng ngày.
        </p>
      </div>

      {/* PRODUCT INFO */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-6 ">
        <p className="flex items-center  text-sm">
  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 text-white mr-2">
  <i className="fa-solid fa-check text-xs"></i>
</span>
  Category: {product.category}
</p>
<p className="flex items-center  text-sm">
  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 text-white mr-2">
  <i className="fa-solid fa-check text-xs"></i>
</span>
 Stock: {product.stock}
</p>
<p className="flex items-center  text-sm">
  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 text-white mr-2">
  <i className="fa-solid fa-check text-xs"></i>
</span>
  Status: {statusMap[product.status]}
</p>
<p className="flex items-center  text-sm">
  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 text-white mr-2">
  <i className="fa-solid fa-check text-xs"></i>
</span>
 Origin: Vietnam
</p>
      </div>

      {/* STATS (fake cho giống UI) */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary/5 p-4 rounded-xl text-center bg-green-50">
          <p className="text-xs text-slate-500">TOTAL SOLD</p>
          <p className="font-bold text-xl">2,841</p>
        </div>

        <div className="bg-primary/5 p-4 rounded-xl text-center bg-green-50">
          <p className="text-xs text-slate-500">REVENUE</p>
          <p className="font-bold text-xl">$69,604</p>
        </div>

        <div className="bg-primary/5 p-4 rounded-xl text-center bg-green-50">
          <p className="text-xs text-slate-500">CONVERSION</p>
          <p className="font-bold text-xl">4.2%</p>
        </div>
      </div>

    </div>
  </div>

</div>
    </div>
  );
}