"use client";

import Editor from "@/components/blog/Editor";
import BlogSidebar from "@/components/blog/BlogSidebar";

export default function CreateBlogPage() {
  return (
    <div className="flex flex-col h-screen bg-[#f6f8f6]">

      {/* HEADER */}

      <div className="h-16 bg-white border-b border-green-100 flex items-center justify-between px-8">

        <h2 className="text-xl font-bold">
          Viết bài mới
        </h2>

        <div className="flex gap-3">

          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Hủy bỏ
          </button>

          <button className="px-4 py-2 bg-green-100 text-green-700 rounded">
            Lưu bản nháp
          </button>

          <button className="px-6 py-2 bg-green-600 text-white rounded shadow">
            Đăng bài viết
          </button>

        </div>

      </div>


      {/* CONTENT */}

      <div className="flex-1 overflow-auto p-8">

        <div className="max-w-6xl mx-auto flex gap-8">

          <Editor />

          <BlogSidebar />

        </div>

      </div>

    </div>
  );
}