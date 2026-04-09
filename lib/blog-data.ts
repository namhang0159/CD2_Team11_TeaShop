export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  author: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "cach-pha-tra-oolong",
    title: "Cách pha trà Oolong chuẩn vị nghệ nhân",
    excerpt:
      "Khám phá bí quyết nhiệt độ nước và thời gian hãm trà để đánh thức trọn vẹn hương vị của những búp trà Oolong cao cấp.",
    content: [
      "Trà Oolong là sự giao thoa tuyệt vời giữa trà xanh và trà đen. Để pha được một ấm trà Oolong ngon, bạn không chỉ cần trà tốt mà còn cần một chút tinh tế trong cách pha.",
      'Thứ nhất, về nhiệt độ nước: Không nên dùng nước sôi 100°C vì sẽ làm "cháy" lá trà, khiến trà bị chát. Nhiệt độ lý tưởng nhất là từ 90°C - 95°C.',
      "Thứ hai, đánh thức trà (tráng trà): Rót một chút nước nóng vào ấm, lắc nhẹ trong 5 giây rồi đổ nước đó đi. Bước này giúp lá trà nở ra và tỏa hương thơm nồng nàn nhất.",
      "Cuối cùng là thời gian hãm: Lần nước đầu tiên chỉ nên hãm khoảng 30-40 giây. Các nước tiếp theo cộng thêm 10-15 giây. Một ấm Oolong ngon có thể pha được 5-7 nước mà vẫn giữ được hương vị ngọt ngào nơi hậu vị.",
    ],
    image: "/tea-hero.jpg",
    date: "15/03/2026",
    author: "Thiên An",
    category: "Kiến thức Trà",
  },
  {
    id: "cau-chuyen-shan-tuyet",
    title: "Huyền thoại cây trà cổ thụ Shan Tuyết hàng trăm năm tuổi",
    excerpt:
      "Hành trình lên đỉnh núi mờ sương Tây Bắc để tìm kiếm và thu hái những búp trà mang đậm tinh hoa của đất trời.",
    content: [
      "Nằm ẩn mình trên những đỉnh núi cao hơn 1500m so với mực nước biển, những cây trà cổ thụ Shan Tuyết sừng sững giữa sương mù mây phủ.",
      'Tên gọi "Shan Tuyết" xuất phát từ lớp lông tơ trắng muốt bám trên bề mặt búp trà, trông như những bông tuyết nhỏ. Để hái được loại trà này, những người dân bản địa phải trèo lên những cành cây cổ thụ rêu phong, cao hàng chục mét.',
      "Hương vị của Shan Tuyết không chát xít như trà mạn vùng thấp, mà mang một vị thanh mát, ngọt hậu rất sâu, phảng phất hương thơm của núi rừng tự nhiên. Đó là thức quà quý giá mà thiên nhiên ban tặng.",
    ],
    image: "/tea-field.jpg",
    date: "10/03/2026",
    author: "Khách Trà",
    category: "Câu chuyện Trà",
  },
  {
    id: "nghe-nhan-sao-tra",
    title: "Nghệ thuật sao trà thủ công - Khi đôi bàn tay là nhiệt kế",
    excerpt:
      "Trò chuyện cùng nghệ nhân sao trà truyền thống về quy trình vò và sấy trà hoàn toàn bằng phương pháp thủ công.",
    content: [
      "Trong thời đại công nghiệp hóa, việc sao trà bằng máy móc đã trở nên phổ biến. Tuy nhiên, những mẻ trà ngon nhất vẫn được tạo ra từ đôi bàn tay trần của các nghệ nhân.",
      'Quá trình "diệt men" và "sao khô" đòi hỏi nghệ nhân phải cảm nhận nhiệt độ chảo bằng chính đôi tay của mình. Đảo liên tục, đều đặn để lá trà mất nước từ từ mà không bị gãy vụn.',
      "Mỗi mẻ trà thủ công mang trong mình không chỉ hương vị của lá trà tươi, mà còn chứa đựng cả tâm huyết, mồ hôi và tình yêu nghề của người làm trà.",
    ],
    image: "/tea-plant.jpg",
    date: "05/03/2026",
    author: "Ban Biên Tập",
    category: "Nghệ nhân Trà",
  },
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}
