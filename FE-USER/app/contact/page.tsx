import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export const metadata = {
  title: "Liên Hệ | Thiên An Tea",
  description:
    "Liên hệ với Thiên An Tea để được tư vấn về các loại trà cao cấp.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Banner Section */}
        <div className="relative h-[30vh] md:h-[40vh] w-full bg-muted">
          <Image
            src="/tea-hero.jpg" // Dùng lại ảnh có sẵn của bạn
            alt="Liên hệ Thiên An Tea"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Hãy Trò Chuyện Cùng Chúng Tôi
            </h1>
            <p className="text-white/80 max-w-2xl text-lg">
              Thiên An Tea luôn sẵn lòng lắng nghe và chia sẻ niềm đam mê trà
              đạo cùng bạn.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Cột thông tin liên hệ */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Thông Tin Liên Hệ
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dù bạn cần tư vấn về cách chọn trà, hướng dẫn pha trà chuẩn
                  vị, hay có bất kỳ thắc mắc nào về đơn hàng, đừng ngần ngại
                  liên hệ với chúng tôi.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      Trà Quán Thiên An
                    </h3>
                    <p className="text-muted-foreground">
                      123 Đường Trà Đạo, Phường Yên Tĩnh, Quận Trung Tâm, TP. Hà
                      Nội
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      Hotline Tư Vấn
                    </h3>
                    <p className="text-muted-foreground">
                      0912 345 678 (Zalo/Viber)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      Thư Tín Điện Tử
                    </h3>
                    <p className="text-muted-foreground">
                      thuongtra@thienantea.vn
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      Giờ Mở Cửa
                    </h3>
                    <p className="text-muted-foreground">
                      Thứ 2 - Chủ Nhật: 08:00 - 21:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột Form gửi tin nhắn */}
            <div className="bg-muted/30 p-8 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Gửi Lời Nhắn
              </h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                      placeholder="Nhập tên của bạn"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-foreground"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-foreground"
                  >
                    Chủ đề quan tâm
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all cursor-pointer"
                  >
                    <option value="tu-van">Tư vấn chọn trà</option>
                    <option value="don-hang">Thông tin đơn hàng</option>
                    <option value="hop-tac">Hợp tác kinh doanh (B2B)</option>
                    <option value="khac">Vấn đề khác</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Nội dung
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all resize-none"
                    placeholder="Bạn muốn chia sẻ điều gì với chúng tôi?"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Gửi Tin Nhắn</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bản đồ (Chỉ là hình khối xám thay thế vì nhúng iframe thật sẽ làm chậm web) */}
        {/* Bản đồ Google Maps Thật */}
        <div className="w-full h-96 relative border-t border-border">
          <iframe
            // Bạn thay đoạn link src="..." dưới đây bằng link bạn vừa copy ở Bước 1 nhé:
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9544104258935!2d106.67525717529713!3d10.737997189408455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2sSaigon%20Technology%20University!5e0!3m2!1sen!2s!4v1774811854813!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            // Hiệu ứng đen trắng sang trọng, di chuột vào hiện màu
            className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
