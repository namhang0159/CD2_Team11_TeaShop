"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addProductAPI } from "@/util/products";

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    category_id: 1,
    name: "",
    description: "",
    ingredients: "",
    brewing_guide: "",
    is_organic: 1,
    status: "active",

    images: [""],
    attributes: [{ name: "", value: "" }],
    variants: [{ option_name: "", price: "" }],
  });

  // ========================
  // BASIC INPUT
  // ========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ========================
  // DESCRIPTION FIX
  // ========================
  const handleDescriptionChange = (e) => {
    setForm({ ...form, description: e.target.value });
  };

  // ========================
  // IMAGE
  // ========================
  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImage = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  // ========================
  // ATTRIBUTE
  // ========================
  const handleAttrChange = (index, field, value) => {
    const newAttrs = [...form.attributes];
    newAttrs[index][field] = value;
    setForm({ ...form, attributes: newAttrs });
  };

  const addAttr = () => {
    setForm({
      ...form,
      attributes: [...form.attributes, { name: "", value: "" }],
    });
  };

  // ========================
  // VARIANT
  // ========================
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...form.variants];
    newVariants[index][field] = value;
    setForm({ ...form, variants: newVariants });
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { option_name: "", price: "" }],
    });
  };

  // ========================
  // SUBMIT FIX
  // ========================
  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        is_organic: Number(form.is_organic),

        images: form.images.filter((img) => img.trim() !== ""),

        variants: form.variants.map((v) => ({
          option_name: v.option_name,
          price: Number(v.price),
        })),
      };

      const res = await addProductAPI(payload);

      alert("✅ Thêm sản phẩm thành công");
      console.log("API Response:", res);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi tạo sản phẩm");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen p-8">
      {/* HEADER (GIỮ UI CŨ) */}
      <header className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-900">Add New Product</h2>

          <p className="text-gray-600 mt-2">
            Create a new listing for your premium tea collection.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/products">
            <button className="px-6 py-2 rounded-lg border border-gray-300">
              Cancel
            </button>
          </Link>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-green-600 text-white"
          >
            Save Product
          </button>
        </div>
      </header>

      {/* GRID (GIỮ UI CŨ) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* GENERAL */}
          <section className="bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              General Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  Product Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-green-50 p-3"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Category
                </label>

                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-green-50 p-3"
                >
                  <option value={1}>Oolong</option>
                  <option value={2}>Green</option>
                  <option value={3}>Black</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={handleDescriptionChange}
                  rows="6"
                  className="w-full p-3 border rounded-lg bg-green-50"
                />
              </div>

              <div>
                <input
                  name="ingredients"
                  value={form.ingredients}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-green-50"
                  placeholder="Ingredients"
                />
              </div>

              <div>
                <input
                  name="brewing_guide"
                  value={form.brewing_guide}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-green-50"
                  placeholder="Brewing guide"
                />
              </div>
            </div>
          </section>

          {/* MEDIA (GIỮ UI CŨ, chỉ bind input) */}
          <section className="bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Product Media
            </h3>

            {form.images.map((img, i) => (
              <input
                key={i}
                value={img}
                onChange={(e) => handleImageChange(i, e.target.value)}
                className="w-full p-3 border rounded-lg mb-2"
                placeholder="Image URL"
              />
            ))}

            <button onClick={addImage} className="text-green-600 mt-2">
              + Add Photo
            </button>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          {/* STATUS */}
          <section className="bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Status & Price
            </h3>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Product Status</span>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="p-2 border rounded-lg bg-green-50"
              >
                <option value="active">Live</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </section>

          {/* ATTRIBUTES */}
          <section className="bg-white p-8 rounded-xl border">
            <h3 className="text-xl font-bold mb-4">Attributes</h3>

            {form.attributes.map((a, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={a.name}
                  onChange={(e) => handleAttrChange(i, "name", e.target.value)}
                  className="w-1/2 p-2 border rounded"
                  placeholder="Name"
                />

                <input
                  value={a.value}
                  onChange={(e) => handleAttrChange(i, "value", e.target.value)}
                  className="w-1/2 p-2 border rounded"
                  placeholder="Value"
                />
              </div>
            ))}

            <button onClick={addAttr} className="text-green-600 mt-2">
              + Add attribute
            </button>
          </section>

          {/* VARIANTS */}
          <section className="bg-white p-8 rounded-xl border">
            <h3 className="text-xl font-bold mb-4">Variants</h3>

            {form.variants.map((v, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={v.option_name}
                  onChange={(e) =>
                    handleVariantChange(i, "option_name", e.target.value)
                  }
                  className="w-1/2 p-2 border rounded"
                  placeholder="Option"
                />

                <input
                  value={v.price}
                  onChange={(e) =>
                    handleVariantChange(i, "price", e.target.value)
                  }
                  className="w-1/2 p-2 border rounded"
                  placeholder="Price"
                />
              </div>
            ))}

            <button onClick={addVariant} className="text-green-600 mt-2">
              + Add variant
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
