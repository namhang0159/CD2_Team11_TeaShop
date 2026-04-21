"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { productDetails } from "@/lib/product-data";
import { GetProductsAPI } from "@/util/api";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
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

  const itemsPerPage = 8; // Sửa thành 8 để chia chẵn 4 cột cho đẹp
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 2. Logic sắp xếp sản phẩm
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Number(a.price || 0);
    const priceB = Number(b.price || 0);

    switch (sortBy) {
      case "price-low-high":
        return priceA - priceB;
      case "price-high-low":
        return priceB - priceA;
      case "name-asc":
        return a.name.localeCompare(b.name, "vi");
      case "name-desc":
        return b.name.localeCompare(a.name, "vi");
      default:
        return 0;
    }
  });

  // 3. Logic phân trang (Cắt mảng sản phẩm theo trang hiện tại)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 bg-primary overflow-hidden mb-8">
        <Image
          src="/tea-hero.jpg" // Dùng ảnh thật của bạn
          alt="Sản phẩm Thiên An Tea"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            Thế Giới Trà
          </h1>
          <p className="text-white/80">
            Tinh hoa trà đạo hội tụ trong từng búp trà
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-4 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Sản phẩm</span>
      </div>

      {/* Main Content (Không còn Sidebar) */}
      <div className="max-w-7xl mx-auto px-4 pb-20 flex-1 w-full">
        {/* Thanh công cụ (Toolbar) */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-muted/30 p-4 rounded-xl border border-border">
          <div className="text-sm font-medium text-foreground">
            Hiển thị{" "}
            <span className="text-secondary">{currentProducts.length}</span>{" "}
            trên tổng số <span className="text-secondary">{totalItems}</span>{" "}
            sản phẩm
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Sắp xếp theo:
            </span>
            <select
              className="flex-1 sm:flex-none px-4 py-2 border border-border rounded-lg text-sm cursor-pointer hover:border-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20 bg-background"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1); // Đổi sắp xếp thì quay về trang 1
              }}
            >
              <option value="default">Mặc định</option>
              <option value="price-low-high">Giá: Thấp đến Cao</option>
              <option value="price-high-low">Giá: Cao đến Thấp</option>
              <option value="name-asc">Tên: A đến Z</option>
              <option value="name-desc">Tên: Z đến A</option>
            </select>
          </div>
        </div>

        {/* Lưới Sản Phẩm Mở Rộng (4 cột) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="bg-background rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative h-64 w-full bg-muted overflow-hidden">
                  <Image
                    src={product.image || "/products/tra-den.jpg"} // Dùng ảnh mặc định nếu không có ảnh sản phẩm
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-amber-500 flex items-center gap-1 shadow-sm">
                    ⭐ {product.rating}
                  </div>
                </div>

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

        {/* Phân trang (Pagination) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full font-medium transition-colors flex items-center justify-center ${
                  currentPage === i + 1
                    ? "bg-secondary text-white shadow-md"
                    : "bg-muted text-foreground hover:bg-secondary/20 hover:text-secondary"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
