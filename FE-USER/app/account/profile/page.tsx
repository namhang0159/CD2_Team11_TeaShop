"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

import { User, Mail, Phone, Calendar } from "lucide-react";
import { FetchMeAPI } from "@/util/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ProfilePage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "default" | "destructive";
    title: string;
    description?: string;
  }>({
    show: false,
    type: "default",
    title: "",
    description: "",
  });
  // AUTH GUARD
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);
  useEffect(() => {
    if (!alert.show) return;

    const timer = setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 2500);

    return () => clearTimeout(timer);
  }, [alert.show]);
  // FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await FetchMeAPI();
        setProfile(res?.data || null);
      } catch (err) {
        console.error(err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (!isLoggedIn || !user) return null;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      {alert.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setAlert((prev) => ({ ...prev, show: false }))}
          />

          {/* MODAL */}
          <div className="relative w-full max-w-md mx-4 animate-in fade-in zoom-in duration-150">
            <Alert variant={alert.type} className="shadow-xl">
              <AlertTitle>{alert.title}</AlertTitle>

              {alert.description && (
                <AlertDescription>{alert.description}</AlertDescription>
              )}

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setAlert((prev) => ({ ...prev, show: false }))}
                className="absolute top-2 right-2 text-muted-foreground hover:text-black"
              >
                ✕
              </button>
            </Alert>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg p-6">
        <h1 className="text-2xl font-bold">Thông tin tài khoản</h1>
        <p className="text-muted-foreground">
          Quản lý thông tin cá nhân của bạn
        </p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-muted-foreground">Đang tải...</p>
      ) : !profile ? (
        <p className="text-red-500">Không tải được thông tin</p>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          {/* AVATAR */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center text-xl font-bold">
              {profile.full_name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <h2 className="text-lg font-bold">{profile.full_name}</h2>
              <p className="text-sm text-muted-foreground">ID: {profile.id}</p>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid gap-4">
            {/* NAME */}
            <div className="flex items-center gap-3">
              <User size={18} className="text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Họ tên</p>
                <p className="font-medium">{profile.full_name}</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Số điện thoại</p>
                <p className="font-medium">
                  {profile.phone_number || "Chưa cập nhật"}
                </p>
              </div>
            </div>

            {/* CREATED */}
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Ngày tham gia</p>
                <p className="font-medium">
                  {new Date(profile.created_at).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="pt-4 border-t border-border flex gap-3">
            <button
              className="px-4 py-2 bg-secondary text-white rounded-lg"
              onClick={() =>
                setAlert({
                  show: true,
                  type: "default",
                  title: "Chức năng đang được cập nhật",
                  description: "Tính năng chỉnh sửa profile sẽ sớm ra mắt",
                })
              }
            >
              Chỉnh sửa
            </button>

            <button
              className="px-4 py-2 border rounded-lg"
              onClick={() =>
                setAlert({
                  show: true,
                  type: "default",
                  title: "Chức năng đang được cập nhật",
                  description: "Tính năng chỉnh sửa profile sẽ sớm ra mắt",
                })
              }
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
