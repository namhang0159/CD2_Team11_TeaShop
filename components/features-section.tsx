import { Leaf, CheckCircle2, Truck, Gift } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Leaf,
      title: '400+ CÀI TRÀ',
      description: 'Bộ sưu tập trà đa dạng từ những vùng trà tốt nhất',
    },
    {
      icon: CheckCircle2,
      title: 'CAM KẾT VỀ CHẤT LƯỢNG',
      description: 'Mỗi sản phẩm được kiểm tra kỹ lưỡng đảm bảo chất lượng tốt nhất',
    },
    {
      icon: Truck,
      title: 'MIỄN PHÍ VẬN CHUYỂN',
      description: 'Giao hàng miễn phí cho tất cả đơn hàng trên toàn quốc',
    },
    {
      icon: Gift,
      title: 'ƯU ĐÃI HÀO PHÁT',
      description: 'Các ưu đãi và quà tặng độc quyền cho khách hàng thân thiết',
    },
  ]

  return (
    <section className="py-12 md:py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm md:text-base text-foreground">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors text-sm">
            TÌM HIỂU THÊM
          </button>
        </div>
      </div>
    </section>
  )
}
