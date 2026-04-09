"use client";
import { GetBlogDetailByIdAPI } from "@/util/blog";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BlogClient = ({ slug }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!slug) return;
      try {
        const res = await GetBlogDetailByIdAPI(slug);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Đang tải bài viết...</div>
    );
  }

  if (!blog) {
    return (
      <div className="p-10 text-center text-red-500">
        Không tìm thấy bài viết
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* BREADCRUMB */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / <span className="text-gray-700">{blog.title}</span>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-4 leading-tight">{blog.title}</h1>

      {/* META */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <span>✍ {blog.author_name}</span>
        <span>
          📅 {new Date(blog.published_at).toLocaleDateString("vi-VN")}
        </span>
        <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
          {blog.category?.name}
        </span>
      </div>

      {/* THUMBNAIL */}
      <img
        src={blog.thumbnail}
        className="w-full h-[400px] object-cover rounded-xl mb-6"
        onError={(e) => (e.target.src = "/no-image.png")}
      />

      {/* EXCERPT */}
      <p className="text-lg text-gray-600 mb-6 italic">{blog.excerpt}</p>

      {/* CONTENT */}
      <div
        className="prose max-w-none prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* FOOTER */}
      <div className="mt-10 pt-6 border-t text-sm text-gray-500 flex justify-between">
        <span>
          Ngày tạo: {new Date(blog.created_at).toLocaleString("vi-VN")}
        </span>
        <span>
          Cập nhật: {new Date(blog.updated_at).toLocaleString("vi-VN")}
        </span>
      </div>
    </div>
  );
};

export default BlogClient;
