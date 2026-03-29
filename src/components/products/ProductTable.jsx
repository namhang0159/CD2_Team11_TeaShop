"use client";

import { useEffect, useState } from "react";
import ProductRow from "./ProductRow";
import { getProductsAPI } from "@/util/products";

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // 🚀 Fetch API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsAPI();
        const rawData = res.data.data;
        console.log("Raw API data:", rawData);
        // 🔥 Map API -> UI
        const mapped = rawData.map((item) => {
          const variant = item.variants?.[0] || {};

          const stock = Number(variant.stock || 0);

          return {
            id: item.id,
            name: item.name,
            image: item.images?.[0] || "/no-image.png",
            sku: `PRD-${item.id}`,
            slug: item.slug,
            category:
              item.category?.slug === "tra-xanh" ||
              item.category?.slug === "tra-olong"
                ? "tra"
                : "phukien",

            price: variant.price || 0,
            stock: stock,

            status:
              stock > 30 ? "inStock" : stock > 0 ? "lowStock" : "outStock",
          };
        });

        setProducts(mapped);
      } catch (err) {
        console.error("Fetch products error:", err);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 Filter
  const filteredProducts = products.filter(
    (p) =>
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "" || p.category === categoryFilter) &&
      (statusFilter === "" || p.status === statusFilter),
  );

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden p-4 flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-62.5 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <i className="fa fa-search"></i>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên sản phẩm hoặc SKU..."
            className="w-full pl-10 pr-4 py-2.5 border-none rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-600/50"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-50 rounded-lg text-sm py-2.5 px-4"
        >
          <option value="">Tất cả danh mục</option>
          <option value="tra">Trà</option>
          <option value="phukien">Phụ kiện</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-50 rounded-lg text-sm py-2.5 px-4"
        >
          <option value="">Tình trạng kho</option>
          <option value="inStock">In Stock</option>
          <option value="lowStock">Low Stock</option>
          <option value="outStock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-50 text-green-600 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4 text-right">Giá bán</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => <ProductRow key={p.id} product={p} />)
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
