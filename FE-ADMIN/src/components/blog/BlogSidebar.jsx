"use client";

import { uploadAPI } from "@/util/auth";
import { CreateBlogCategoryAPI } from "@/util/blog";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function BlogSidebar({ form, onChange, categories }) {
  const [image, setImage] = useState(null);
  const [showmodal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const onDrop = useCallback(
    async (files) => {
      const file = files[0];
      if (!file) return;
      console.log("Selected file:", file);
      try {
        const res = await uploadAPI(file);
        console.log("Upload response:", res);
        const data = res.data;

        // URL thật từ server
        setImage(data.url);
        onChange("thumbnail", data.url);
      } catch (err) {
        console.error(err);
        alert("Upload ảnh thất bại");
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);
  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await CreateBlogCategoryAPI(categoryName);
      alert("Tạo danh mục thành công");
      setShowModal(false);
      setCategoryName("");
    } catch (err) {
      console.error(err);
      alert("Tạo danh mục thất bại");
    }
  };
  return (
    <div className="w-80 flex flex-col gap-6">
      <div className="bg-white rounded-xl p-4 shadow">
        <p className="font-bold mb-3">Hình ảnh nổi bật</p>

        <div
          {...getRootProps()}
          className="h-40 border-2 border-dashed border-green-300 flex items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />

          {image ? (
            <img src={image} className="h-full w-full object-cover rounded" />
          ) : (
            <p className="text-gray-400">Kéo thả hoặc click để tải lên</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow">
        <p className="font-bold mb-3">Slug</p>
        <input
          value={form.slug}
          onChange={(e) => onChange("slug", e.target.value)}
          placeholder="slug-bai-viet"
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="bg-white rounded-xl p-4 shadow">
        <p className="font-bold mb-3">Tác giả</p>
        <input
          value={form.author_name}
          onChange={(e) => onChange("author_name", e.target.value)}
          placeholder="Tên tác giả"
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="bg-white rounded-xl p-4 shadow">
        <p className="font-bold mb-3">Danh mục</p>

        <select
          value={form.category_id}
          onChange={(e) => onChange("category_id", e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Chọn danh mục</option>
          {categories?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <p
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setShowModal(true)}
        >
          + Thêm danh mục
        </p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow">
        <p className="font-bold mb-3">Thiết lập xuất bản</p>

        <div className="flex justify-between text-sm mb-2">
          <span>Trạng thái</span>
          <select
            value={form.status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            <option value="draft">Bản nháp</option>
            <option value="published">Đã đăng</option>
          </select>
        </div>
      </div>
      {showmodal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-96">
            <h3 className="font-bold mb-4">Thêm danh mục</h3>

            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Tên danh mục"
              className="w-full border p-2 rounded mb-4"
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handle}
            >
              Thêm
            </button>
            <button
              className="ml-2 px-4 py-2 rounded border"
              onClick={() => setShowModal(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
