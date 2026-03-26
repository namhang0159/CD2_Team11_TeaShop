"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { products } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
const product = products.find(
  (p) => p.id === Number(params.id)
);
  if (!product) {
    return <div className="p-8">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">

      <Link
  href="/products"
  className="text-sm text-gray-500 hover:text-green-600"
>
  ← Back to List
</Link>

        <h1 className="text-2xl font-bold">
          Product Details
        </h1>

      </div>


      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


        {/* LEFT */}
        <div className="space-y-6">

          <img
            src={product.image}
            className="w-full aspect-square object-cover rounded-xl border"
          />

          <div className="bg-white p-6 rounded-xl border">

            <h3 className="font-bold mb-4">
              Inventory Status
            </h3>

            <div className="flex justify-between mb-2">

              <span>Stock</span>

              <span className="text-green-600 font-bold">
                {product.stock}
              </span>

            </div>

          </div>

        </div>



        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">


          <div className="bg-white p-8 rounded-xl border">

            <h1 className="text-3xl font-bold mb-2">
              {product.name}
            </h1>

            <p className="text-sm text-gray-500 mb-4">
              SKU: {product.sku}
            </p>

            <p className="text-2xl text-green-600 font-bold mb-6">
              {product.price.toLocaleString()}đ
            </p>


            <div className="grid grid-cols-2 gap-4 text-sm">

              <div>
                <b>Category:</b> {product.category}
              </div>

              <div>
                <b>Status:</b> {product.status}
              </div>

              <div>
                <b>Stock:</b> {product.stock}
              </div>

              <div>
                <b>ID:</b> {product.id}
              </div>

            </div>

          </div>



          <div className="bg-white p-8 rounded-xl border">

            <h3 className="font-bold mb-4">
              Description
            </h3>

            <p className="text-gray-600">
              Đây là trang chi tiết sản phẩm mock.
            </p>

          </div>


        </div>


      </div>

    </div>
  );
}