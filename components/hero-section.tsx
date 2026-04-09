import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="py-12 md:py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <div className="relative h-64 md:h-96 bg-primary rounded-lg overflow-hidden">
            <Image
              src="/tea-hero.jpg"
              alt="Premium tea collection"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                Mỗi ngày trôi qua đều mang một sắc thái riêng.
              </h1>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Mỗi ngày là một cơ hội để khám phá những hương vị tuyệt vời. Tại Thiên An, chúng tôi tin rằng mỗi giây phút cuộc sống cần được tô màu bởi những cảm xúc tinh tế. Chúng tôi cam kết mang đến cho bạn những sản phẩm trà chất lượng cao, được lựa chọn kỹ lưỡng từ những vùng trà nổi tiếng nhất.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                SẢN PHẨM TRÀ
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
              >
                TÌM HIỂU THÊM
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
