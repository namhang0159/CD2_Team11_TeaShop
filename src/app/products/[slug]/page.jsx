"use client";

import { getProductBySlugAPI } from "@/util/products";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getProductBySlugAPI(params.slug);
        const item = res.data.data;

        const variant = item.variants?.[0] || {};
        const stock = Number(variant.stock || 0);

        setProduct({
          id: item.id,
          slug: item.slug,
          name: item.name,
          image: item.images?.[0] || "/no-image.png",
          images: item.images || [],
          sku: `PRD-${item.id}`,
          category: item.category?.name || "N/A",
          price: variant.price || 0,
          stock: stock,
          status: item.status,

          attributes: item.attributes || {},
          description: item.description || "",
          ingredients: item.ingredients || "",
          brewing: item.brewing_guide || "",
          variants: item.variants || [],
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (params.slug) fetchDetail();
  }, [params.slug]);

  if (!product) {
    return <div className="p-8 text-gray-500">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-green-600"
        >
          ← Quay lại
        </Link>

        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
          {product.status}
        </span>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT - IMAGE */}
        <div className="space-y-4 sticky top-6 h-fit">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <img
              src={product.image}
              className="w-full aspect-square object-cover rounded-xl"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-14 h-14 rounded-lg border border-gray-200 object-cover hover:opacity-80 cursor-pointer"
              />
            ))}
          </div>

          {/* STOCK */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="text-sm text-gray-500 mb-1">Tồn kho</p>
            <p className="text-xl font-bold text-green-600">{product.stock}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          {/* PRODUCT CARD */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            {/* TITLE */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-400 mt-1">SKU: {product.sku}</p>
              </div>
            </div>

            {/* PRICE */}
            <div className="mt-6">
              <p className="text-4xl font-bold text-green-600">
                {product.price.toLocaleString()}đ
              </p>
            </div>

            {/* VARIANTS */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Phân loại
              </p>

              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm 
                    hover:border-green-600 hover:text-green-600 transition"
                  >
                    {v.option_name}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION */}
            <div className="flex gap-3 mt-6">
              <button className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                Chỉnh sửa
              </button>

              <button className="px-5 py-2 rounded-lg border border-gray-300 hover:border-red-500 hover:text-red-500 transition">
                Xóa
              </button>
            </div>
          </div>

          {/* ATTRIBUTES */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Thông tin chi tiết
            </h3>

            <div className="divide-y">
              {Object.entries(product.attributes).map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-gray-800">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* INGREDIENTS */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Thành phần</h3>
            <p className="text-gray-600">{product.ingredients}</p>
          </div>

          {/* BREWING */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Hướng dẫn pha</h3>
            <p className="text-gray-600">{product.brewing}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
