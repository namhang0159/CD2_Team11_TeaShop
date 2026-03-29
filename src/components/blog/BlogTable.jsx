"use client";

import { useEffect, useState } from "react";
import { getBlogs } from "@/util/api";

export default function BlogTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBlogs().then(setData);
  }, []);

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Bài viết</th>
            <th>Danh mục</th>
            <th>Tác giả</th>
            <th>Ngày</th>
            <th>Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          {data.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-4 flex gap-3">
                <img
                  src={b.image}
                  className="w-16 h-10 object-cover rounded"
                />
                <span className="font-bold">
                  {b.title}
                </span>
              </td>

              <td>{b.category}</td>
              <td>{b.author}</td>
              <td>{b.date}</td>

              <td>
                {b.status === "published" ? (
                  <span className="text-green-600">
                    Đã xuất bản
                  </span>
                ) : (
                  <span>Nháp</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}