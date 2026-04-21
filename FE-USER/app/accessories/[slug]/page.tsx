"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/context/cart-context";
import { GetProductDetailAPI } from "@/util/api";

// const accessoriesData: Record<string, any> = {
//   "am-tu-sa": {
//     id: "am-tu-sa",
//     name: "Ấm Tử Sa Nghi Hưng",
//     price: 1250000,
//     image: "/placeholder.jpg",
//     rating: 4.9,
//     reviews: 128,
//     category: "Ấm trà",
//     material: "Đất Tử Sa",
//     origin: "Nghi Hưng, Trung Quốc",
//     capacity: "220ml",
//     description:
//       "Ấm trà cao cấp làm từ đất Tử Sa nguyên bản, được thiết kế bởi các nghệ nhân lành nghề. Cấu trúc lỗ khổng nhỏ li ti giúp ấm có khả năng giữ nhiệt cực tốt, lưu giữ và tôn vinh hương vị đặc trưng của các loại trà Oolong và Phổ Nhĩ.",
//     features: [
//       "Chất đất nguyên khoáng tự nhiên, không pha tẩm",
//       "Nắp ấm khít, thao tác ngắt nước chuẩn xác",
//       "Khả năng lưu hương trà xuất sắc",
//       "Càng dùng lâu ấm càng bóng đẹp (nhuận sắc)",
//     ],
//     careInstructions:
//       "Rửa sạch bằng nước sôi sau mỗi lần sử dụng. Tuyệt đối KHÔNG dùng xà phòng hay nước rửa chén. Dùng khăn mềm lau khô phần vỏ ngoài và mở nắp để khô tự nhiên.",
//     benefits:
//       "Làm mềm nước, khử mùi tạp chất, giúp hương vị trà trở nên tròn đầy và ngọt hậu hơn.",
//   },
//   "chen-kien-yao": {
//     id: "chen-kien-yao",
//     name: "Chén Kiến Yêu (Jian Zhan)",
//     price: 450000,
//     image: "/placeholder.jpg",
//     rating: 4.8,
//     reviews: 95,
//     category: "Chén trà",
//     material: "Men gốm tự nhiên",
//     origin: "Kiến Dương",
//     capacity: "100ml",
//     description:
//       "Chén Kiến Yêu được nung ở nhiệt độ trên 1300 độ C, tạo ra những vệt men lông thỏ hoặc giọt dầu độc bản. Một tuyệt tác của lửa và đất không có chiếc thứ hai trùng lặp.",
//     features: [
//       "Hoa văn men độc nhất vô nhị",
//       "Cốt gốm dày dặn, giữ nhiệt siêu tốt",
//       "Tôn lên màu sắc của nước trà xanh/vàng",
//       "Hàm lượng sắt cao",
//     ],
//     careInstructions:
//       'Rửa sạch bằng nước ấm. Trước khi uống nên tráng qua nước sôi để "đánh thức" chén và làm ấm thành chén.',
//     benefits:
//       "Hàm lượng sắt trong men giúp cân bằng ion trong nước, làm vị trà thanh khiết và êm dịu hơn.",
//   },
//   "khay-tra-tre": {
//     id: "khay-tra-tre",
//     name: "Khay Trà Tre Tự Nhiên",
//     price: 850000,
//     image: "/placeholder.jpg",
//     rating: 4.7,
//     reviews: 156,
//     category: "Khay trà",
//     material: "Tre già tự nhiên",
//     origin: "Việt Nam",
//     capacity: "Size lớn (50x30cm)",
//     description:
//       "Khay trà được chế tác từ tre già tự nhiên nguyên khối, đã qua xử lý hấp sấy chống mối mọt và cong vênh. Thiết kế tinh tế với khay nhựa hứng nước bên dưới vô cùng tiện dụng.",
//     features: [
//       "Tre tự nhiên thân thiện với môi trường",
//       "Rãnh thoát nước thông minh, nhanh chóng",
//       "Màu vân tre mộc mạc, sang trọng",
//       "Khay hứng nước nhựa ABS dễ dàng tháo lắp vệ sinh",
//     ],
//     careInstructions:
//       "Lau sạch bằng khăn mềm ẩm sau mỗi buổi trà. Tránh ngâm trực tiếp trong nước lâu hoặc phơi dưới ánh nắng gắt.",
//     benefits:
//       "Tạo ra không gian pha trà gọn gàng, sạch sẽ, chuẩn phong cách nghệ thuật trà đạo.",
//   },
//   "bo-dung-cu": {
//     id: "bo-dung-cu",
//     name: "Bộ Dụng Cụ Pha Trà 6 Món",
//     price: 320000,
//     image: "/placeholder.jpg",
//     rating: 4.9,
//     reviews: 87,
//     category: "Dụng cụ pha trà",
//     material: "Gỗ mun",
//     origin: "Việt Nam",
//     capacity: "Bộ 6 chiếc",
//     description:
//       'Bộ "Lục Bảo" dụng cụ pha trà chuyên nghiệp làm từ gỗ mun cao cấp, bao gồm: gắp trà, xúc trà, kim thông vòi, muỗng trà, kẹp chén và cóng đựng.',
//     features: [
//       "Gỗ mun cứng cáp, chịu nước tốt",
//       "Chạm khắc tinh xảo, tỉ mỉ",
//       "Đầy đủ công cụ cho mọi thao tác pha trà",
//       "Độ bền cao lên đến hàng chục năm",
//     ],
//     careInstructions:
//       "Rửa nhanh qua nước sạch và lau khô ngay. Thỉnh thoảng lau qua bằng một lớp dầu ô liu mỏng để bảo dưỡng vân gỗ.",
//     benefits:
//       "Giúp các thao tác pha trà trở nên vệ sinh, chuyên nghiệp và thanh tao hơn, tránh dùng tay chạm trực tiếp vào lá trà.",
//   },
//   "loc-tra-su": {
//     id: "loc-tra-su",
//     name: "Lọc Trà Sứ Trắng",
//     price: 120000,
//     image: "/placeholder.jpg",
//     rating: 4.6,
//     reviews: 42,
//     category: "Dụng cụ pha trà",
//     material: "Sứ cao cấp",
//     origin: "Đài Loan",
//     capacity: "Vừa mọi loại tống",
//     description:
//       "Lọc bã trà với lưới inox 304 siêu mịn kết hợp với vành sứ trắng thanh lịch. Giúp nước trà rót ra trong vắt, không bị vướng cặn tơ.",
//     features: [
//       "Lưới lọc inox 304 chống rỉ sét",
//       "Mắt lưới siêu nhỏ lọc sạch cả vụn trà li ti",
//       "Vành sứ cách nhiệt, dễ cầm nắm không bỏng",
//       "Dễ dàng vệ sinh dưới vòi nước",
//     ],
//     careInstructions:
//       "Rửa sạch dưới vòi nước mạnh ngay sau khi dùng. Có thể dùng bàn chải đánh răng mềm để chải sạch cặn bám trên lưới.",
//     benefits:
//       "Mang lại một tách trà trong trẻo, đẹp mắt, nâng cao tối đa trải nghiệm thưởng thức.",
//   },
//   "hop-dung-tra": {
//     id: "hop-dung-tra",
//     name: "Hộp Đựng Trà Gốm Sứ",
//     price: 280000,
//     image: "/placeholder.jpg",
//     rating: 4.8,
//     reviews: 112,
//     category: "Bảo quản trà",
//     material: "Gốm sứ",
//     origin: "Trung Quốc",
//     capacity: "Đựng được 150g trà",
//     description:
//       "Hộp gốm đựng trà với thiết kế nắp bọc vải nhung siêu kín khí. Đóng vai trò như một hầm chứa thu nhỏ, cách ly hoàn toàn lá trà với không khí, ánh sáng và độ ẩm bên ngoài.",
//     features: [
//       "Nắp đậy siêu kín khí, giữ trọn hương trà",
//       "Bảo vệ trà khỏi ánh sáng (chống oxy hóa)",
//       "Họa tiết hoa văn vẽ tay thủ công sắc nét",
//       "Chất gốm tráng men không bám mùi",
//     ],
//     careInstructions:
//       "Lau sạch bên trong bằng khăn khô, mềm. Tuyệt đối không rửa bằng nước để tránh làm ẩm bên trong hũ ảnh hưởng đến trà.",
//     benefits:
//       "Giữ cho lá trà luôn tươi mới như lúc mới mua, không bị mất mùi hoặc nhiễm mùi lạ từ môi trường xung quanh.",
//   },
//   "khan-lau-tra": {
//     id: "khan-lau-tra",
//     name: "Khăn Lau Bàn Trà",
//     price: 50000,
//     image: "/placeholder.jpg",
//     rating: 4.5,
//     reviews: 230,
//     category: "Vệ sinh bàn trà",
//     material: "Vải dệt vi sợi (Microfiber)",
//     origin: "Việt Nam",
//     capacity: "30x30cm",
//     description:
//       "Khăn trà đạo chuyên dụng (Trà Cân) siêu thấm hút. Được dệt từ chất liệu vi sợi đặc biệt không đổ lông, đảm bảo không làm xước bề mặt các loại ấm chén đắt tiền.",
//     features: [
//       "Thấm hút nước cực nhanh chỉ với một lần lau",
//       "Không để lại vệt nước hay xơ vải trên mặt bàn",
//       "Mềm mại, an toàn tuyệt đối cho bề mặt ấm Tử Sa",
//       "Màu sắc trang nhã, giấu vết ố màu trà cực tốt",
//     ],
//     careInstructions:
//       "Giặt tay hoặc giặt máy với nước ấm. Chú ý không dùng các loại nước xả vải vì sẽ làm mất đi khả năng thấm hút của sợi vải.",
//     benefits:
//       'Công cụ đắc lực giữ cho bàn trà luôn khô ráo, sạch sẽ. Là vật bất ly thân để nghệ nhân "dưỡng ấm" Tử Sa hàng ngày.',
//   },
//   "am-thuy-tinh": {
//     id: "am-thuy-tinh",
//     name: "Ấm Thủy Tinh Chịu Nhiệt",
//     price: 350000,
//     image: "/placeholder.jpg",
//     rating: 4.7,
//     reviews: 145,
//     category: "Ấm trà",
//     material: "Thủy tinh Borosilicate",
//     origin: "Đài Loan",
//     capacity: "600ml",
//     description:
//       "Ấm trà làm từ thủy tinh Borosilicate cao cấp, có khả năng chịu được sự thay đổi nhiệt độ đột ngột từ -20°C đến 150°C mà không nứt vỡ. Đi kèm lõi lọc thủy tinh tinh tế cắt laser.",
//     features: [
//       "Khả năng chịu sốc nhiệt cực tốt, đun được trên bếp hồng ngoại",
//       "Độ trong suốt hoàn hảo, không bị ố vàng",
//       "Tích hợp lõi lọc thủy tinh tiện dụng",
//       "Thiết kế miệng vòi rót ngắt nước cực tốt",
//     ],
//     careInstructions:
//       "Rửa nhẹ nhàng bằng miếng bọt biển mềm. Nếu có mảng bám ố vàng của trà, có thể vệ sinh dễ dàng bằng baking soda hoặc chanh.",
//     benefits:
//       "Sự lựa chọn hoàn hảo để pha các loại trà hoa, trà xanh. Cho phép bạn chiêm ngưỡng trọn vẹn vẻ đẹp của lá trà và màu nước đang dần lan tỏa.",
//   },
// };

export default function AccessoriesDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const slug = params.slug as string;

  const [accessory, setAccessory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const isOutOfStock = selectedVariant?.stock === 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetProductDetailAPI(slug);
        const data = res.data;
        console.log(slug);
        console.log("Fetched product detail:", data);
        const attributes = data.attributes
          ? Object.entries(data.attributes).map(([key, value]) => ({
              attribute_name: key,
              attribute_value: value,
            }))
          : [];

        const mapped = {
          id: data.id,
          name: data.name,
          image: data.images?.[0]?.url || "/placeholder.jpg",
          price: selectedVariant?.price || data.variants?.[0]?.price || 0,
          rating: 4.8,
          reviews: 0,

          material:
            attributes.find((a: any) => a.attribute_name === "Chất liệu")
              ?.attribute_value || "",

          origin:
            attributes.find((a: any) => a.attribute_name === "Xuất xứ")
              ?.attribute_value || "",

          capacity:
            attributes.find((a: any) => a.attribute_name === "Dung tích")
              ?.attribute_value || "",

          description: data.description || "",

          features: attributes.map(
            (a: any) => `${a.attribute_name}: ${a.attribute_value}`,
          ),

          careInstructions: data.brewing_guide || "",
          benefits: data.ingredients || "",
          variants: data.variants || [],
        };

        setAccessory(mapped);
        setAccessory(mapped);
        setSelectedVariant(data.variants?.[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <p>Đang tải...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!accessory) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div>
            <h1>Không tìm thấy phụ kiện</h1>
            <Link href="/accessories">Quay lại</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Vui lòng chọn loại sản phẩm!");
      return;
    }

    if (!selectedVariant.price) {
      alert("Variant chưa có giá!");
      return;
    }

    setIsAdding(true);

    addItem(selectedVariant.id, quantity);
    console.log("Added to cart:", {
      variantId: selectedVariant.id,
      quantity,
    });
    setQuantity(1);
    setIsAdding(false);
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-muted-foreground">
          <Link href="/accessories" className="hover:text-foreground">
            Phụ kiện
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{accessory.name}</span>
        </div>

        {/* MAIN */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* IMAGE */}
            <div className="relative bg-muted rounded-lg overflow-hidden h-96 md:h-full min-h-96">
              <Image
                src={accessory.image}
                alt={accessory.name}
                fill
                className="object-cover"
              />
            </div>

            {/* INFO */}
            <div className="flex flex-col gap-6">
              {/* TITLE + PRICE */}
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {accessory.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-secondary">
                    {selectedVariant?.price
                      ? selectedVariant.price.toLocaleString("vi-VN") + " đ"
                      : "Liên hệ"}
                  </span>
                </div>

                {/* RATING */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(accessory.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {accessory.rating} ({accessory.reviews} đánh giá)
                  </span>
                </div>
              </div>
              {/* VARIANTS */}
              {accessory?.variants?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Loại</h3>
                  <div className="flex gap-2">
                    {accessory.variants.map((v: any) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1 border rounded-lg text-sm ${
                          selectedVariant?.id === v.id
                            ? "bg-primary text-white border-primary"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        {v.option_name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* THÔNG TIN */}
              {/* {accessory && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  {accessory.material && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Chất liệu</span>
                      <span className="font-medium">{accessory.material}</span>
                    </div>
                  )}

                  {accessory.origin && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Xuất xứ</span>
                      <span className="font-medium">{accessory.origin}</span>
                    </div>
                  )}

                  {accessory.capacity && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Dung tích</span>
                      <span className="font-medium">{accessory.capacity}</span>
                    </div>
                  )}
                </div>
              )} */}

              {/* FEATURES */}
              {accessory.features?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3">ĐẶC ĐIỂM</h3>
                  <div className="space-y-2">
                    {accessory.features.map((f: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center">
                          <span className="text-xs text-secondary">✓</span>
                        </div>
                        <span className="text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {isOutOfStock && (
                <p className="text-red-500 text-sm">
                  Sản phẩm này hiện đã hết hàng
                </p>
              )}
              {/* CART */}
              <div className="flex items-center gap-4 py-4">
                <div className="flex items-center gap-3 border rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || isOutOfStock}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShoppingCart size={20} />
                  {isAdding ? "ĐANG THÊM..." : "THÊM VÀO GIỎ"}
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 border rounded-lg"
                >
                  <Heart
                    size={20}
                    className={isFavorite ? "fill-red-500 text-red-500" : ""}
                  />
                </button>
              </div>

              {/* SHIPPING */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                <div>🚚 Miễn phí ship đơn trên 500k</div>
                <div>📦 Giao hàng 2-3 ngày</div>
                <div>↩️ Đổi trả 7 ngày</div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="border-b mb-8">
            <div className="flex gap-8">
              {["description", "careInstructions", "benefits"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold border-b-2 ${
                    activeTab === tab
                      ? "border-secondary text-secondary"
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  {tab === "description" && "MÔ TẢ"}
                  {tab === "careInstructions" && "HƯỚNG DẪN"}
                  {tab === "benefits" && "LỢI ÍCH"}
                </button>
              ))}
            </div>
          </div>

          {/* TAB CONTENT */}
          <div className="mb-16">
            {activeTab === "description" && (
              <p className="text-muted-foreground">{accessory.description}</p>
            )}

            {activeTab === "careInstructions" && (
              <p className="text-muted-foreground">
                {accessory.careInstructions}
              </p>
            )}

            {activeTab === "benefits" && (
              <p className="text-muted-foreground">{accessory.benefits}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
