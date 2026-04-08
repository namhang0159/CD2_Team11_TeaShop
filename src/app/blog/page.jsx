"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogs } from "@/util/api";
import { GetBlogListAPI } from "@/util/blog";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const perPage = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await GetBlogListAPI();
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  // ===== FILTER =====

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()),
  );
  const router = useRouter();
  // ===== PAGINATION =====

  const totalPages = Math.ceil(filtered.length / perPage);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const currentData = filtered.slice(start, end);

  // ===== STATS =====

  const total = blogs.length;

  const published = blogs.filter((b) => b.status === "published").length;

  const draft = blogs.filter((b) => b.status === "draft").length;

  const views = blogs.reduce((sum, b) => sum + b.views, 0);

  return (
    <div className="p-8   min-h-screen">
      {/* HEADER */}

      <div className="flex justify-between mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Bài viết</h1>
            <p className="text-gray-500 text-sm mt-1">
              Quản lý thông tin bài viết
            </p>
          </div>
        </div>

        <Link
          href="/blog/create"
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          + Viết bài mới
        </Link>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Stat title="Tổng bài viết" value={total} />

        <Stat title="Đã xuất bản" value={published} />

        <Stat title="Bản nháp" value={draft} />

        <Stat title="Lượt xem" value={views} />
      </div>

      {/* TABLE BOX */}

      <div className="bg-white rounded-xl ">
        {/* FILTER */}

        <div className="p-4 flex gap-4">
          <input
            placeholder="Tìm kiếm bài viết..."
            className="  px-4 py-2 rounded flex-1   "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="  px-3 py-2 rounded  ">
            <option>Tất cả danh mục</option>
          </select>

          <button className="  px-4 py-2 rounded">Bộ lọc</button>
        </div>

        {/* TABLE */}
        <table className="w-full table-fixed  -collapse">
          <thead className=" ">
            <tr>
              <th className="p-4 w-[35%] text-left">Bài viết</th>

              <th className="p-4 w-[15%] text-left">Danh mục</th>

              <th className="p-4 w-[15%] text-left">Tác giả</th>

              <th className="p-4 w-[15%] text-left">Ngày</th>

              <th className="p-4 w-[10%] text-left">Trạng thái</th>

              <th className="p-4 w-[10%] text-left">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                {/* Bài viết */}
                <td className="p-4 align-middle">
                  <div
                    className="flex items-center gap-3"
                    onClick={() => router.push(`/blog/${b.slug}`)}
                  >
                    <img
                      src={b.thumbnail}
                      className="w-16 h-10 object-cover rounded"
                    />

                    <span className="font-semibold">{b.title}</span>
                  </div>
                </td>

                {/* Danh mục */}
                <td className="p-4 align-middle text-amber-500">
                  {b.category?.name}
                </td>

                {/* Tác giả */}
                <td className="p-4 align-middle">{b.author_name}</td>

                {/* Ngày */}
                <td className="p-4 align-middle text-pink-400">
                  {new Date(b.published_at).toLocaleDateString("vi-VN")}
                </td>

                {/* Trạng thái */}
                <td className="p-4 align-middle">
                  {b.status === "published" ? (
                    <span className="bg-green-200 px-2 rounded">
                      Đã xuất bản
                    </span>
                  ) : (
                    <span className="bg-gray-200 px-2 rounded">Bản nháp</span>
                  )}
                </td>

                {/* Thao tác */}
                <td className="p-4 align-middle">
                  <div className="flex gap-2">
                    <button className="text-blue-600">Sửa</button>

                    <button className="text-red-600">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}

        <div className="p-4 flex justify-between  ">
          <span>
            Hiển thị {start + 1}-{Math.min(end, filtered.length)} /{" "}
            {filtered.length}
          </span>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded  
                ${page === p ? "bg-green-600 text-white" : ""}
                `}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl  ">
      <p>{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
