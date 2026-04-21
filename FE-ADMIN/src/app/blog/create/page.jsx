"use client";

import Editor from "@/components/blog/Editor";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateBlogAPI, GetBlogCategoriesAPI } from "@/util/blog";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-");

export default function CreateBlogPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category_id: "",
    thumbnail: "",
    author_name: "",
    status: "draft",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GetBlogCategoriesAPI();
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => {
      if (key === "title") {
        const autoSlug = slugify(value);
        const shouldAutoUpdateSlug =
          !prev.slug || prev.slug === slugify(prev.title);

        return {
          ...prev,
          title: value,
          slug: shouldAutoUpdateSlug ? autoSlug : prev.slug,
        };
      }

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmit = async (status) => {
    console.log("FORM:", form);

    if (!form.title || !form.content) {
      alert("Thiếu title hoặc content");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        category_id: Number(form.category_id),
        status,
        published_at:
          status === "published"
            ? new Date().toISOString().slice(0, 19).replace("T", " ")
            : null,
      };

      await CreateBlogAPI(payload);

      alert("Tạo bài viết thành công!");
      router.push("/blog");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Lỗi tạo bài viết!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f6f8f6]">
      <div className="h-16 bg-white border-b border-green-100 flex items-center justify-between px-8">
        <h2 className="text-xl font-bold">Viết bài mới</h2>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Hủy bỏ
          </button>

          <button
            disabled={loading}
            onClick={() => handleSubmit("draft")}
            className="px-4 py-2 bg-green-100 text-green-700 rounded disabled:opacity-50"
          >
            Lưu bản nháp
          </button>

          <button
            disabled={loading}
            onClick={() => handleSubmit("published")}
            className="px-6 py-2 bg-green-600 text-white rounded shadow disabled:opacity-50"
          >
            {loading ? "Đang đăng..." : "Đăng bài viết"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto flex gap-8">
          <Editor
            value={form.content}
            onChange={(val) => handleChange("content", val)}
            title={form.title}
            setTitle={(val) => handleChange("title", val)}
            excerpt={form.excerpt}
            setExcerpt={(val) => handleChange("excerpt", val)}
          />

          <BlogSidebar
            form={form}
            categories={categories}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
