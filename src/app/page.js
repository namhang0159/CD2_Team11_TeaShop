"use client";

import { Login } from "@/util/auth";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: call API login
    const res = await Login(e.target.email.value, e.target.password.value);
    if (res.status === 200) {
      alert("Login successful");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      alert("Login failed");
    }
    console.log("Login...");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8f6] text-[#0f170f] font-serif">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-b from-green-500/10 to-transparent">
        <div className="text-2xl font-bold text-green-600">Thiên An Tea</div>

        <div className="hidden md:flex gap-8">
          <a className="text-gray-500 hover:text-green-600">Support</a>
          <a className="text-gray-500 hover:text-green-600">Security</a>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          {/* Left Image */}
          <div className="hidden lg:block relative">
            <Image
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
              className="w-full h-full object-cover"
              width={500}
              height={500}
              alt="Background"
            />
            <div className="absolute inset-0 bg-green-500/20" />

            <div className="absolute bottom-10 left-10 text-white">
              <h2 className="text-3xl font-bold mb-2">Thiên An Tea</h2>
              <p className="italic opacity-90">
                The art of tea is the art of life.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="p-8 lg:p-14 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Đăng nhập Admin</h1>
              <p className="text-gray-500 mt-2 text-sm">
                Nhập thông tin để truy cập hệ thống
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="text-xs font-bold uppercase text-gray-500">
                  Email
                </label>
                <div className="relative mt-1">
                  <i className="fa fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="admin@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold uppercase text-gray-500">
                  Mật khẩu
                </label>
                <div className="relative mt-1">
                  <i className="fa fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    name="password"
                    className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Ghi nhớ
                </label>

                <a className="text-green-600 hover:underline">Quên mật khẩu?</a>
              </div>

              {/* Button */}
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
