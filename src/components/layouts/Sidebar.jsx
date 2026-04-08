"use client";

import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { use, useEffect, useState } from "react";
import { FetchMe } from "@/util/auth";

export default function Sidebar() {
  const menu = [
    { icon: "fa-dashboard", label: "Dashboard", href: "dashboard" },
    { icon: "fa-reorder", label: "Order Management", href: "orders" },
    { icon: "fa-box", label: "Product Management", href: "products" },
    { icon: "fa-tags", label: "Category Management", href: "categories" },
    { icon: "fa-user", label: "Customer List", href: "customers" },
    { icon: "fa-adjust", label: "Blog Posts", href: "blog" },
    {
      icon: "fa-shopping-bag",
      label: "Inventory Management",
      href: "inventory",
    },
    { icon: "fa-box-open", label: "Import Management", href: "import" },
    { icon: "fa-truck", label: "Suppliers", href: "suppliers" },
    { icon: "fa-cog", label: "Settings", href: "settings" },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await FetchMe();
        setName(res.data.full_name);
        setEmail(res.data.email);
      } catch (err) {
        console.error(err);
      }
    };
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      fetchAdmin();
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <aside className="w-64 border-r border-green-600/10 bg-white flex flex-col justify-between p-4 h-screen">
      <div className="flex flex-col gap-8">
        {/* Logo */}

        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-green-600/20 overflow-hidden">
            <Image
              width={40}
              height={40}
              alt=""
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr_PSBk-3J1Fwg7e7VULIuEKPQeUTeVI1xKIxt_qQTx03N-6rI5RZ6ND-g5350YDILBbfuvzuVryVJofkeIMUi0pFo4R0wZS8xlLrl3IFPys-4nXeaq5d5XJ_AuYKg-N2qBPo5Ri5HJsAzMfr__-CT03NTO708skZjiRiJtqh-HptkhYnCBIPX0gL-8UIOfTk36Zb9mo5-xZelnGeGeEAqey8I1C20GYxOFeHT1Inm8nf_dETiD_F_sSzaLiGXiWohaY1VZBNrt24"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-black">Thiên An Tea</h1>
            <p className="text-xs text-green-600 font-medium">Admin Portal</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1">
          {menu.map((item, i) => (
            <SidebarItem key={i} {...item} href={`/${item.href}`} />
          ))}
        </nav>
      </div>

      {/* User */}
      <div className="pt-4 border-t border-green-600/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
            <Image
              width={32}
              height={32}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_3mv9fEu3a-mBf0xmTo5v4inAxjHOi5eNOxiJpQMYty86OwpY9LhJbNLxJJ0s4DMefSixMXAWuT0yZRSpRIT8YDrTIWCtzuUdh2BLUOTcj7dpBX0qR314zoTHWSFkAoWn9kvqXRI64fjR3x1NTACxUTgZzXWXDaRomQmQKTbR9TJkKg6BAOMEYQQzpI8Qzt8vAA1B2OBPo_YkX2fDcIPBU9XbYE5dqoaJiGWWXvbFSAhZJg0BahD7Jy-UB3zWvBOP5YlT1FBZI80"
              className="w-full h-full object-cover"
              alt="HH"
            />
          </div>

          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-black">{name}</span>
            <span className="text-[10px] text-slate-500 truncate">{email}</span>
          </div>

          <button
            className="ml-auto text-slate-400 hover:text-red-500"
            onClick={handleLogout}
          >
            <span className="material-symbols-outlined text-sm">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
