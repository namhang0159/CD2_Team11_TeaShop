import Link from 'next/link'
import Image from 'next/image'

export function CTASection() {
  return (
    <section className="py-12 md:py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance">
              Ưu Đãi Đặc Biệt Cho Doanh Nghiệp
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Chúng tôi cung cấp giải pháp trà chuyên nghiệp cho các nhà hàng, quán cà phê, khách sạn và các sự kiện công ty. Với các gói đặc biệt, giá cả cạnh tranh và dịch vụ tư vấn miễn phí, chúng tôi cam kết đem lại giá trị tốt nhất cho doanh nghiệp của bạn.
            </p>

            <Link
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors w-fit"
            >
              TƯ VẤN MIỄN PHÍ
            </Link>
          </div>

          {/* Right: Image */}
          <div className="relative h-64 md:h-96 bg-secondary/20 rounded-lg overflow-hidden order-1 md:order-2">
            <Image
              src="/business-package.jpg"
              alt="Business tea package"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
