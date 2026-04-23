"use client";

import { useEffect, useState } from "react";
import { AddCategory, DeleteCategory, GetCategories } from "@/util/catgories";

const API_URL = "http://localhost:8000/api/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    image_url: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GetCategories();


        const sorted = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );

        setCategories(sorted);
      } catch (err) {
        console.error("Lỗi load categories:", err);
      }
    };
    fetchCategories();
  }, []);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await AddCategory(form);
      alert("Thêm thành công: " + res.data.name);

      setForm({
        name: "",
        slug: "",
        image_url: "",
        description: "",
      });

      fetchCategories();
    } catch (err) {
      console.error("Lỗi thêm:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Xóa thật không?")) return;

    try {
      const res = await DeleteCategory(id);
      alert("Xóa thành công: ");

      fetchCategories();
    } catch (err) {
      console.error("Lỗi xóa:", err);
    }
  };


  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getImage = (url) => {
    if (!url) return "/no-image.png";
    if (!url.startsWith("http")) {
      return `http://localhost:8000/storage/${url}`;
    }
    return url;
  };


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  return (
    <div className="p-8 flex flex-col gap-6  min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Danh mục sản phẩm</h1>
        <p className="text-gray-500 text-sm mt-1">
          Quản lý danh mục và số lượng sản phẩm.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow p-4 grid grid-cols-4 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên danh mục"
          className="bg-gray-50 p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="bg-gray-50 p-2.5 rounded-lg"
        />

        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="bg-gray-50 p-2.5 rounded-lg"
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Mô tả"
          className="bg-gray-50 p-2.5 rounded-lg"
        />

        <button
          onClick={handleSubmit}
          className="col-span-4 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold"
        >
          Thêm danh mục
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Tìm danh mục..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-50 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-green-50 text-green-600 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Ngày tạo</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                {/* CATEGORY */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={getImage(c.image_url)}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-gray-400">ID: {c.id}</p>
                  </div>
                </td>

                {/* SLUG */}
                <td className="px-6 py-4 text-gray-600">{c.slug}</td>

                {/* PRODUCT COUNT */}
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {c.products_count} sản phẩm
                  </span>
                </td>

                {/* CREATED */}
                <td className="px-6 py-4 text-gray-500">
                  {formatDate(c.created_at)}
                </td>

                {/* ACTION */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
