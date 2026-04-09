"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Package, MapPin, User, LogOut, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) return null;

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* SIDEBAR */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-lg p-6 sticky top-24">
                {/* USER */}
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-white text-3xl font-bold">
                    {user.full_name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-lg font-bold">{user.full_name}</h3>
                  <p className="text-sm text-secondary font-medium">
                    Thành viên
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {user.email}
                  </p>
                </div>
                <nav className="space-y-2">
                  {/* MENU */}
                  <Link
                    href="/account"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      isActive("/account")
                        ? "bg-secondary text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <ShoppingBag size={18} />
                    Tổng quan
                  </Link>

                  <Link
                    href="/account/orders"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      isActive("/account/orders")
                        ? "bg-secondary text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Package size={18} />
                    Đơn hàng
                  </Link>

                  <Link
                    href="/account/addresses"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      isActive("/account/addresses")
                        ? "bg-secondary text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <MapPin size={18} />
                    Địa chỉ
                  </Link>

                  <Link
                    href="/account/profile"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      isActive("/account/profile")
                        ? "bg-secondary text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <User size={18} />
                    Tài khoản
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg border-t mt-4 pt-4"
                  >
                    <LogOut size={18} />
                    Đăng xuất
                  </button>
                </nav>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="md:col-span-3">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
