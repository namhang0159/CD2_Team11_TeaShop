"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function BlogSidebar() {

  const [image, setImage] = useState(null);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [status, setStatus] = useState("Chờ duyệt");
  const [time, setTime] = useState("Ngay lập tức");



  // ================= upload =================

  const onDrop = useCallback((files) => {

    const file = files[0];

    if (file) {

      setImage(URL.createObjectURL(file));

    }

  }, []);

  const { getRootProps, getInputProps } =
    useDropzone({ onDrop });



  // ================= tag =================

  const addTags = (text) => {

    if (!text) return;

    const newTags = text
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const unique = newTags.filter(
      (t) => !tags.includes(t)
    );

    setTags([...tags, ...unique]);

    setTagInput("");

  };



  const removeTag = (index) => {

    setTags(
      tags.filter((_, i) => i !== index)
    );

  };



  return (

    <div className="w-80 flex flex-col gap-6">


      {/* ================= IMAGE ================= */}

      <div className="bg-white rounded-xl p-4 shadow">

        <p className="font-bold mb-3">
          Hình ảnh nổi bật
        </p>

        <div
          {...getRootProps()}
          className="
            h-40
            border-2
            border-dashed
            border-green-300
            flex
            items-center
            justify-center
            cursor-pointer
          "
        >

          <input {...getInputProps()} />

          {image ? (

            <img
              src={image}
              className="h-full object-cover"
            />

          ) : (

            <p className="text-gray-400">
              Kéo thả hoặc click để tải lên
            </p>

          )}

        </div>

      </div>



      {/* ================= CATEGORY ================= */}

      <div className="bg-white rounded-xl p-4 shadow">

        <p className="font-bold mb-3">
          Chuyên mục
        </p>

        <label className="block">
          <input type="checkbox" /> Kiến thức trà
        </label>

        <label className="block">
          <input type="checkbox" /> Nghệ thuật pha trà
        </label>

        <label className="block">
          <input type="checkbox" /> Tin tức
        </label>

        <label className="block">
          <input type="checkbox" /> Văn hóa trà
        </label>

        <label className="block">
          <input type="checkbox" /> Sản phẩm
        </label>

      </div>



      {/* ================= TAG ================= */}

      <div className="bg-white rounded-xl p-4 shadow">

        <p className="font-bold mb-2">
          Thẻ (Tags)
        </p>


        {/* tag list */}

        <div className="flex flex-wrap gap-2 mb-2">

          {tags.map((t, i) => (

            <span
              key={i}
              className="
                flex
                items-center
                gap-1
                px-2
                py-1
                bg-green-100
                text-green-700
                rounded
                text-sm
              "
            >

              {t}

              <button
                onClick={() => removeTag(i)}
                className="text-xs"
              >
                ✕
              </button>

            </span>

          ))}

        </div>


        {/* input */}

        <div className="flex gap-2">

          <input
            value={tagInput}
            onChange={(e) =>
              setTagInput(e.target.value)
            }

            onKeyDown={(e) => {

              if (e.key === "Enter") {

                e.preventDefault();
                addTags(tagInput);

              }

            }}

            placeholder="thêm thẻ tag"
            className="flex-1 border p-2 rounded"

          />

          <button
            onClick={() => addTags(tagInput)}
            className="
              px-3
              bg-green-600
              text-white
              rounded
            "
          >
            +
          </button>

        </div>
 <p className="text-xs text-gray-500 mt-1">
    Tách các thẻ bằng dấu phẩy
  </p>

      </div>



      {/* ================= PUBLISH ================= */}

      <div className="bg-white rounded-xl p-4 shadow">

        <p className="font-bold mb-3">
          Thiết lập xuất bản
        </p>


        <div className="flex justify-between text-sm mb-2">

          <span>Trạng thái</span>

          <select className="text-amber-400 font-bold text-lg "
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option>Chờ duyệt</option>
            <option>Bản nháp</option>
            <option>Đã đăng</option>
          </select>

        </div>


        <div className="flex justify-between text-sm mb-2">

          <span>Thời gian</span>

          <select
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
          >
            <option>Ngay lập tức</option>
            <option>Lên lịch</option>
          </select>

        </div>


        <div className="flex justify-between text-sm">

          <span>Hiển thị</span>

          <span>Công khai</span>

        </div>

      </div>


    </div>

  );

}