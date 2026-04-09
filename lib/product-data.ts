export interface ProductDetail {
  id: string;
  name: string;
  price: string;
  weight: string;
  image: string;
  rating: number;
  reviews: number;
  sold: number;
  description: string;
  shortDescription: string;
  features: string[];
  ingredients: string[];
  brewingMethod: string;
  healthBenefits: string[];
  origin: string;
  aroma: string;
  taste: string;
  pairing: string;
}

export const productDetails: Record<string, ProductDetail> = {
  "tra-den": {
    id: "tra-den",
    name: "Trà Đen Cao Cấp",
    price: "350.000",
    weight: "100g",
    image: "/products/tra-den.jpg",
    rating: 4.5,
    reviews: 25,
    sold: 156,
    description:
      "Trà đen cao cấp từ những vùng trồng trà nổi tiếng nhất Việt Nam. Với hương vị đậm đà, cay nồng và vị ngọt tự nhiên, trà đen của chúng tôi mang lại trải nghiệm uống trà tuyệt vời.",
    shortDescription:
      "Trà đen cao cấp 100% từ Việt Nam, với hương vị đậm đà và độc đáo",
    features: [
      "100% nguyên liệu tự nhiên",
      "Không chứa bảo quản",
      "Giúp tăng năng lượng, tỉnh táo",
      "Hỗ trợ tiêu hoá tốt",
    ],
    ingredients: ["Lá trà đen nguyên chất", "Không có gia vị bổ sung"],
    brewingMethod:
      "Pha với nước sôi 80-90°C trong 3-5 phút. Có thể pha lại 3-4 lần.",
    healthBenefits: [
      "Giàu chất chống oxy hóa",
      "Hỗ trợ sức khỏe tim mạch",
      "Giúp tỉnh táo, tập trung",
      "Hỗ trợ tiêu hoá",
      "Giảm căng thẳng, thư giãn",
    ],
    origin: "Vùng trà Phú Thọ, Việt Nam",
    aroma: "Thơm đậm, hương sâu, có mùi malt nhẹ",
    taste: "Vị ngọt tự nhiên, cay nồng, hậu vị kéo dài",
    pairing: "Bánh nướng, bánh quy, các món ăn vặt",
  },
  "tra-xanh": {
    id: "tra-xanh",
    name: "Trà Xanh Thiên Thảo",
    price: "320.000",
    weight: "100g",
    image: "/products/tra-xanh.jpg",
    rating: 4.8,
    reviews: 42,
    sold: 203,
    description:
      "Trà xanh tinh khiết được chế biến theo phương pháp truyền thống, giữ nguyên độ tươi sống và hương thơm tự nhiên. Mang đến cảm giác thư thái, sảng khoái cho từng tách trà.",
    shortDescription:
      "Trà xanh thuần chất với hương thơm tự nhiên và vị thanh mát",
    features: [
      "100% lá trà xanh nguyên chất",
      "Không pha trộn hương liệu",
      "Giảm căng thẳng, dễ ngủ",
      "Hỗ trợ tiêu hóa, khử độc",
    ],
    ingredients: ["Lá trà xanh tươi", "Xử lý bằng phương pháp khô nóng"],
    brewingMethod:
      "Pha với nước ấm 60-70°C trong 2-3 phút. Pha lại được 4-5 lần, càng pha sau càng thơm.",
    healthBenefits: [
      "Giàu polyphenol, chất chống oxy hóa",
      "Hỗ trợ giảm cân, đốt cháy mỡ",
      "Giảm stress, lo âu",
      "Tốt cho sức khỏe da",
      "Nâng cao miễn dịch",
    ],
    origin: "Vùng trà Tam Đảo, Vĩnh Phúc",
    aroma: "Thơm nhẹ, hương cỏ tươi, mùi đất thoang thoảng",
    taste: "Vị thanh mát, ngọt tự nhiên, không cay",
    pairing: "Bánh chưng, bánh tráng nướng, các món ăn nhẹ",
  },
  "tra-oolong": {
    id: "tra-oolong",
    name: "Trà Oolong Cao Cấp",
    price: "420.000",
    weight: "100g",
    image: "/products/tra-oolong.jpg",
    rating: 4.7,
    reviews: 18,
    sold: 87,
    description:
      "Trà Oolong được lên men bán phần, kết hợp giữa hương thơm của trà xanh và độ sâu của trà đen. Mang lại trải nghiệm uống trà tuyệt vời với hương vị phức tạp, thú vị.",
    shortDescription:
      "Trà Oolong lên men bán phần với hương vị phức tạp và độc đáo",
    features: [
      "100% nguyên liệu tự nhiên cao cấp",
      "Lên men bán phần tự nhiên",
      "Giảm căng thẳng, thư giãn",
      "Hỗ trợ sức khỏe, tăng sắc đẹp",
    ],
    ingredients: ["Lá trà Oolong tuyển chọn", "Không pha trộn bất kỳ chất gì"],
    brewingMethod:
      "Pha với nước sôi 85-95°C trong 3-5 phút. Có thể pha lại 5-7 lần, mỗi lần thêm 30 giây.",
    healthBenefits: [
      "Cân bằng giữa hương thơm xanh và độ sâu đen",
      "Giúp tiêu hóa tốt",
      "Hỗ trợ đốt cháy calo",
      "Làm chậm quá trình lão hóa",
      "Giảm cholesterol xấu",
    ],
    origin: "Tây Nguyên, Việt Nam",
    aroma: "Thơm phức tạp, có hương hoa, hương trái cây nhẹ",
    taste: "Vị ngọt, mềm mại, có chút khoan khoái, hậu vị kéo dài",
    pairing: "Bánh ngọt, bánh thập cẩm, các món tráng miệng",
  },
  "tra-matcha": {
    id: "tra-matcha",
    name: "Matcha Nguyên Chất",
    price: "580.000",
    weight: "50g",
    image: "/products/tra-matcha.jpg",
    rating: 4.9,
    reviews: 31,
    sold: 124,
    description:
      "Matcha nguyên chất từ Nhật Bản, được xay từ những lá trà xanh mịn nhất. Giàu dinh dưỡng, năng lượng cao, giúp tỉnh táo và tập trung. Lý tưởng cho những ai yêu thích uống trà truyền thống.",
    shortDescription:
      "Matcha nguyên chất từ Nhật Bản, mịn màng và giàu dinh dưỡng",
    features: [
      "100% Matcha nguyên chất nhập khẩu",
      "Không chứa chất bảo quản",
      "Giàu chất dinh dưỡng, tăng năng lượng",
      "Hỗ trợ tập trung, sáng tạo",
    ],
    ingredients: ["Lá trà xanh tuyển chọn xay mịn", "Không có thành phần khác"],
    brewingMethod:
      "Lấy 1-2 muỗng cà phê matcha, thêm nước nóng 70-80°C, dùng matcha whisk để khuấy đều. Có thể thêm sữa hoặc mật ong.",
    healthBenefits: [
      "Toàn bộ lá trà được hấp thụ, dinh dưỡng cao hơn",
      "Giàu L-theanine, hỗ trợ tập trung",
      "Chất chống oxy hóa cao nhất trong các loại trà",
      "Tăng sức đề kháng, miễn dịch",
      "Giúp giảm mệt mỏi, tăng năng lượng bền vững",
    ],
    origin: "Nhật Bản - Uji",
    aroma: "Thơm cỏ tươi, hương biển nhẹ, hương thanh mát tao nhã",
    taste: "Vị thanh, hơi đắng nhẹ, ngọt tự nhiên hậu vị kéo dài",
    pairing: "Bánh matcha, bánh bông lan, tráng miệng nhẹ",
  },
};

export function getProductDetail(id: string): ProductDetail | undefined {
  return productDetails[id];
}
