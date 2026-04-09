"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full mx-4 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Image */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-900 to-green-700 relative overflow-hidden">
            <Image
              src="/tea-field.jpg"
              alt="Tea fields"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 to-green-700/60 flex flex-col justify-end p-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Nurturing your soul with every sip of nature.
              </h2>
              <p className="text-white/90 text-lg">
                Experience the purest essence of high-mountain tea leaves,
                handcrafted for excellence.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-1/2 p-8 md:p-12">
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              type="button"
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 mb-8">
              Please enter your details to access your account.
            </p>

            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                try {
                  await login(email, password);
                  onClose();
                } catch (error) {
                  console.error("Login failed:", error);
                  setErrorMessage("Invalid email or password");
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  />
                  <svg
                    className="absolute right-4 top-3.5 w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-secondary hover:text-secondary/80"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    {errorMessage && (
                      <span className="text-red-500">{errorMessage}</span>
                    )}
                  </h4>
                </div>
              </div>
              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang đăng nhập..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    ></path>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="w-full py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                  Facebook
                </button>
              </div>

              {/* Register Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-secondary hover:text-secondary/80"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
