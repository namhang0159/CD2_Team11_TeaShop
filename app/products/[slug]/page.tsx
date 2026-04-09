"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getProductDetail, type ProductDetail } from "@/lib/product-data";
import { useCart } from "@/context/cart-context";
import { get } from "http";
import { GetProductDetailAPI } from "@/util/api";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const slug = params.slug as string;
  const [product, setProduct] = useState<ProductDetail | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const isOutOfStock = selectedVariant?.stock === 0;
  useEffect(() => {
    const fetchProduct = async () => {
      const json = await GetProductDetailAPI(slug);
      const data = json.data;

      const mappedProduct: ProductDetail = {
        id: data.id,
        name: data.name,
        image: data.images?.[0] || "",
        price: selectedVariant?.price,
        weight: data.variants?.[0]?.option_name || "",
        rating: 4.5, // backend chưa có => tạm fix cứng
        reviews: 0,
        sold: 0,
        variants: data.variants || [],
        shortDescription: data.description,
        description: data.description,

        features: Object.entries(data.attributes || {}).map(
          ([key, value]) => `${key}: ${value}`,
        ),

        ingredients: [data.ingredients],
        brewingMethod: data.brewing_guide,

        origin: data.attributes?.["Xuất xứ"] || "",
        aroma: data.attributes?.["Hương vị"] || "",
        taste: data.attributes?.["Hương vị"] || "",
        pairing: "Không có dữ liệu",
        healthBenefits: [],
      };

      setProduct(mappedProduct);
      setSelectedVariant(data.variants?.[0] || null);
      setIsLoading(false);
    };

    fetchProduct();
  }, [slug]);
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Đang tải...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Sản phẩm không tìm thấy
            </h1>
            <Link
              href="/products"
              className="text-secondary hover:text-secondary/80 underline"
            >
              Quay lại trang sản phẩm
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-muted-foreground">
          <Link
            href="/products"
            className="hover:text-foreground transition-colors"
          >
            Sản phẩm
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Chi tiết sản phẩm</span>
        </div>

        {/* Product Detail Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Left: Product Image */}
            <div className="relative bg-muted rounded-lg overflow-hidden h-96 md:h-full min-h-96">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col gap-6">
              {/* Title and Price */}
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-secondary">
                    {selectedVariant?.price} VND
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {product.weight}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} đánh giá |{" "}
                    {product.sold} đã bán)
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  MỎ TẢ NGẮN
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Features */}
              {/* <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  ĐẶC ĐIỂM
                </h3>
                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-secondary">✓</span>
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div> */}
              {/* Variant Selection (if there are multiple variants) */}
              <div>
                <h3>Loại</h3>
                {product?.variants?.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {product.variants.map((v: any) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1 border rounded-lg text-sm transition ${
                          selectedVariant?.id === v.id
                            ? "bg-primary text-white border-primary"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        {v.option_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {isOutOfStock && (
                <p className="text-red-500 text-sm">
                  Sản phẩm này hiện đã hết hàng
                </p>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 py-4">
                <div className="flex items-center gap-3 border border-border rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-muted transition-colors text-foreground"
                  >
                    -
                  </button>
                  <span className="px-4 text-foreground font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 hover:bg-muted transition-colors text-foreground"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (!selectedVariant) {
                      alert("Vui lòng chọn loại sản phẩm");
                      return;
                    }

                    setIsAdding(true);

                    addItem(selectedVariant.id, quantity);

                    setQuantity(1);
                    setIsAdding(false);
                    alert("Đã thêm vào giỏ hàng!");
                  }}
                  disabled={isAdding || isOutOfStock}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  {isAdding ? "ĐANG THÊM..." : "THÊM VÀO GIỎ HÀNG"}
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Heart
                    size={20}
                    className={
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-foreground"
                    }
                  />
                </button>
              </div>

              {/* Shipping Info */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-foreground">
                  THÔNG TIN GIAO HÀNG
                </h3>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-secondary">🚚</span>
                  <span className="text-muted-foreground">
                    Miễn phí vận chuyển cho đơn hàng trên 500.000 VND
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-secondary">📦</span>
                  <span className="text-muted-foreground">
                    Giao hàng trong vòng 2-3 ngày làm việc (Nội thành Hà Nội)
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-secondary">↩️</span>
                  <span className="text-muted-foreground">
                    Đổi trả trong vòng 7 ngày nếu sản phẩm lỗi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-b border-border mb-8">
            <div className="flex gap-8 overflow-x-auto">
              {["description", "ingredients", "brewing", "reviews"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-4 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab
                        ? "text-secondary border-secondary"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    {tab === "description" && "MỎ TẢ"}
                    {tab === "ingredients" && "THÀNH PHẦN"}
                    {tab === "brewing" && "CÁCH PHA"}
                    {tab === "reviews" && "ĐÁNH GIÁ"}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-16">
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Mô tả chi tiết
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {product.origin && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Xuất xứ
                      </h4>
                      <p className="text-muted-foreground">{product.origin}</p>
                    </div>
                  )}

                  {product.aroma && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Hương thơm
                      </h4>
                      <p className="text-muted-foreground">{product.aroma}</p>
                    </div>
                  )}

                  {product.taste && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Vị</h4>
                      <p className="text-muted-foreground">{product.taste}</p>
                    </div>
                  )}

                  {product.pairing && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Kết hợp với
                      </h4>
                      <p className="text-muted-foreground">{product.pairing}</p>
                    </div>
                  )}
                </div>

                <div>
                  {product.healthBenefits.length > 0 && (
                    <h4 className="font-semibold text-foreground mb-3">
                      Lợi ích sức khỏe
                    </h4>
                  )}
                  <ul className="space-y-2">
                    {product.healthBenefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="text-secondary mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground">
                  Thành phần
                </h3>
                <ul className="space-y-3">
                  {product.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="text-secondary mt-1">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "brewing" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground">
                  Cách pha trà
                </h3>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {product.brewingMethod}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Không có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm
                  này!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
