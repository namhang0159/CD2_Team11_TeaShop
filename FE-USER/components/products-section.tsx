"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GetProductsAPI } from "@/util/api";

export function ProductsSection() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GetProductsAPI();

        const formatted = res.data
          .filter((p: any) => p.category?.name !== "Phụ kiện")
          .map((p: any) => ({
            id: p.id,
            name: p.name,
            image: p.images?.[0],
            slug: p.slug,
            rating: 4.8,
            shortDescription: p.category?.description,
            price: p.variants?.[0]?.price,
            weight: p.variants?.[0]?.option_name,
          }));

        setProducts(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section
      className="py-12 md:py-20 border-b border-border bg-background"
      id="products"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            SẢN PHẨM CỦA CHÚNG TÔI
          </h2>
          <p className="text-muted-foreground">
            Khám phá bộ sưu tập trà premium từ Thiên An Tea
          </p>
        </div>

        {/* 🔥 GIỮ NGUYÊN UI CŨ 100% */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group cursor-pointer"
            >
              <div className="bg-background rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* IMAGE */}
                <div className="relative h-64 w-full bg-muted overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-amber-500 flex items-center gap-1 shadow-sm">
                    ⭐ {product.rating}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-secondary transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {product.shortDescription}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="font-bold text-secondary text-lg">
                      {product.price}đ
                    </span>

                    <span className="text-xs font-medium bg-secondary/10 text-secondary px-2 py-1 rounded-md">
                      {product.weight}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="px-8 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            XEM TẤT CẢ SẢN PHẨM
          </Link>
        </div>
      </div>
    </section>
  );
}
