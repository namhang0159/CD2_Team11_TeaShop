import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">SẢN PHẨM</h3>
            <ul className="flex flex-col gap-2 text-sm opacity-90">
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Trà Đen
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Trà Xanh
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Trà Hỏa Hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Trà Matcha
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">CÔNG TY</h3>
            <ul className="flex flex-col gap-2 text-sm opacity-90">
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Liên Hệ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Tuyển Dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">CHÍNH SÁCH</h3>
            <ul className="flex flex-col gap-2 text-sm opacity-90">
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Điều Khoản Sử Dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Chính Sách Hoàn Trả
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Câu Hỏi Thường Gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">LIÊN HỆ</h3>
            <ul className="flex flex-col gap-3 text-sm opacity-90">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>contact@thienantea.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+84 123 456 789</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Đường Trà, Hà Nội</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-80">
          <p>&copy; {currentYear} Thiên An Tea. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:opacity-100 transition-opacity">
              Facebook
            </Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">
              Instagram
            </Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
