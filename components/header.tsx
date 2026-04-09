"use client";

import { Search, Menu, X, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import LoginModal from "./login-modal";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍃</span>
              </div>
              <span className="hidden sm:inline font-semibold text-foreground">
                Thiên An Tea
              </span>
            </Link>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/products"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                SẢN PHẨM
              </Link>
              <Link
                href="/accessories"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                PHỤ KIỆN
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                BÀI VIẾT
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                LIÊN HỆ
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Search className="w-5 h-5 text-foreground" />
              </button>

              {/* Show cart and user icons if logged in */}
              {isLoggedIn && (
                <>
                  <Link
                    href="/cart"
                    className="p-2 hover:bg-muted rounded-lg transition-colors relative"
                  >
                    <ShoppingCart className="w-5 h-5 text-foreground" />
                    {itemCount > 0 && (
                      <span className="absolute top-1 right-1 min-w-[20px] h-5 bg-secondary text-white rounded-full text-xs flex items-center justify-center font-bold">
                        {itemCount}
                      </span>
                    )}
                  </Link>

                  <div className="hidden md:flex items-center gap-3 border-l border-border pl-4">
                    <div className="p-2 hover:bg-muted rounded-lg transition-colors group relative cursor-pointer">
                      <User className="w-5 h-5 text-foreground" />
                      <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg hidden group-hover:block z-50">
                        <div className="p-4 border-b border-border">
                          <p className="text-sm font-medium text-foreground">
                            {user?.full_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                        <Link
                          href="/account"
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          Tài khoản của tôi
                        </Link>
                        <Link
                          href="/account/orders"
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          Đơn hàng
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors border-t border-border"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Show login button if not logged in */}
              {!isLoggedIn && (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden md:block px-4 py-2 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                >
                  Đăng Nhập
                </button>
              )}

              <button
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t border-border flex flex-col gap-4">
              <Link
                href="/products"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                SẢN PHẨM
              </Link>
              <Link
                href="/accessories"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                PHỤ KIỆN
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                BÀI VIẾT
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                LIÊN HỆ
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}
