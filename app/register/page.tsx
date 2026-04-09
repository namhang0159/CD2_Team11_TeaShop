"use client";

import { Header } from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { RegisterAPI, RegisterPayload } from "@/util/api";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState<RegisterPayload>({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  // ========================
  // HANDLE CHANGE
  // ========================
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ========================
  // SUBMIT
  // ========================
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await RegisterAPI(form);
      console.log("Register success:", res.data);
      // lưu token
      localStorage.setItem("token", res.data.token);

      alert("✅ Đăng ký thành công");

      router.push("/");
    } catch (err: any) {
      console.error(err);

      const message = err?.response?.message || "Đăng ký thất bại";

      alert("❌ " + message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Form */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Registration Page
              </h1>
              <p className="text-lg text-green-600 font-semibold mb-8">
                Join our premium tea community and explore the art of brewing.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      name="full_name"
                      onChange={handleChange}
                      value={form.full_name}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg bg-green-50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                    <svg
                      className="absolute left-3 top-3.5 w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        name="email"
                        onChange={handleChange}
                        value={form.email}
                        type="email"
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg bg-green-50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                      <svg
                        className="absolute left-3 top-3.5 w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        name="phone_number"
                        onChange={handleChange}
                        value={form.phone_number}
                        type="tel"
                        placeholder="+84 000 000 00"
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg bg-green-50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                      <svg
                        className="absolute left-3 top-3.5 w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.636 1.636 2.013 3.013 3.649 3.649l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Password and Confirm */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        onChange={handleChange}
                        value={form.password}
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg bg-green-50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                      <svg
                        className="absolute left-3 top-3.5 w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg bg-green-50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                      <svg
                        className="absolute left-3 top-3.5 w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 border-2 border-green-300 rounded cursor-pointer"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-semibold text-green-600 hover:text-green-700"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>

                {/* Create Account Button */}
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-700">
                  Already have an account?{" "}
                  <Link
                    href="/"
                    className="font-semibold text-green-600 hover:text-green-700"
                  >
                    Log in here
                  </Link>
                </p>
              </form>
            </div>

            {/* Right: Image with Quote */}
            <div className="hidden lg:block relative h-96 rounded-3xl overflow-hidden">
              <Image
                src="/tea-plant.jpg"
                alt="Tea plant"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/70 flex flex-col justify-end p-8">
                <div className="bg-green-600/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <svg
                    className="w-8 h-8 text-white/80 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5-6 0-6.002 5.75-6.002 8.972C-3.075 15.89-1.080 21 3 21zm19.8-7.566c-1.439-.555-2.64-.95-1.2-2.764 1.095-1.472 1.536-2.654 1.536-5.494C23.336 3 20.63 0 16.5 0c-5.151 0-5.44 5.563-5.44 7.451 0 5.795.141 6.179 5.243 9.595C21.438 21.884 22.929 23.72 23.8 13.434z"></path>
                  </svg>
                  <p className="text-xl italic text-white font-light leading-relaxed mb-4">
                    "Tea is more than just a beverage; it's a moment of
                    tranquility in a chaotic world."
                  </p>
                  <p className="text-white font-semibold tracking-widest text-sm">
                    — THIÊN AN HERITAGE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
