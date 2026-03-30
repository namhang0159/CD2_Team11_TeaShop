"use client";

import { getProductBySlugAPI, updateProductAPI } from "@/util/products";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductEditPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // ========================
  // FORMAT ATTRIBUTES
  // ========================
  const formatAttributes = (attrs) => {
    if (!attrs || typeof attrs !== "object") {
      return [{ name: "", value: "" }];
    }

    return Object.entries(attrs).map(([key, value]) => ({
      name: key,
      value: value?.value ?? "",
    }));
  };

  // ========================
  // FORM STATE (FIXED)
  // ========================
  const [form, setForm] = useState({
    category_id: 1,
    name: "",
    description: "",
    ingredients: "",
    brewing_guide: "",
    is_organic: 1,
    status: "active",
    slug: params.slug || "",
    images: [""],
    attributes: [{ name: "", value: "" }],
    variants: [{ option_name: "", price: "" }],
  });

  // ========================
  // LOAD DATA
  // ========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductBySlugAPI(params.slug);
        const item = res.data;

        setProduct(item);

        setForm({
          category_id: item.category?.id || 1,
          name: item.name || "",
          description: item.description || "",
          ingredients: item.ingredients || "",
          brewing_guide: item.brewing_guide || "",
          is_organic: item.is_organic ?? 1,
          status: item.status || "active",

          images: item.images?.length ? item.images : [""],

          // FIX: convert object → array
          attributes: formatAttributes(item.attributes),

          variants: item.variants?.length
            ? item.variants.map((v) => ({
                option_name: v.option_name || "",
                price: v.price || "",
              }))
            : [{ option_name: "", price: "" }],
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (params.slug) fetchData();
  }, [params.slug]);

  // ========================
  // BASIC CHANGE
  // ========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ========================
  // IMAGES
  // ========================
  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImage = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImage = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({
      ...form,
      images: newImages.length ? newImages : [""],
    });
  };

  // ========================
  // ATTRIBUTES
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

  const removeAttr = (index) => {
    const newAttrs = form.attributes.filter((_, i) => i !== index);
    setForm({
      ...form,
      attributes: newAttrs.length ? newAttrs : [{ name: "", value: "" }],
    });
  };

  // ========================
  // VARIANTS
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

  const removeVariant = (index) => {
    const newVariants = form.variants.filter((_, i) => i !== index);
    setForm({
      ...form,
      variants: newVariants.length
        ? newVariants
        : [{ option_name: "", price: "" }],
    });
  };

  // ========================
  // SAVE
  // ========================
  const handleSave = async () => {
    if (!product) {
      alert("Product not loaded yet");
      return;
    }

    try {
      const payload = {
        id: product.id,
        ...form,
        is_organic: Number(form.is_organic),

        images: form.images.filter((img) => img.trim() !== ""),

        // FIX: gửi attributes dưới dạng array, không phải object
        attributes: form.attributes
          .filter((a) => a.name.trim() !== "" && a.value.trim() !== "")
          .map((a) => ({
            name: a.name,
            value: a.value,
          })),

        variants: form.variants.map((v) => ({
          option_name: v.option_name,
          price: Number(v.price),
        })),
      };

      await updateProductAPI(product.id, payload);

      alert("✅ Update success");
      setTimeout(() => {
        router.push("/products");
      }, 500);
    } catch (err) {
      console.error(err);
      alert("❌ Update error");
    }
  };

  // ========================
  // LOADING
  // ========================
  if (loading) {
    return <div className="p-8 text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-green-50 min-h-screen p-8">
      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <Link href="/products">← Back</Link>

        <button
          onClick={handleSave}
          disabled={loading || !product}
          className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
        >
          Save Changes
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* GENERAL */}
          <section className="bg-white p-8 rounded-xl border">
            <h3 className="text-xl font-bold mb-4">General</h3>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded mb-3"
              placeholder="Name"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              rows={5}
            />
          </section>

          {/* IMAGES */}
          <section className="bg-white p-8 rounded-xl border">
            <h3 className="text-xl font-bold mb-4">Images</h3>

            {form.images.map((img, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={img}
                  onChange={(e) => handleImageChange(i, e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button onClick={() => removeImage(i)}>❌</button>
              </div>
            ))}

            <button onClick={addImage} className="text-green-600">
              + Add image
            </button>
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
                />

                <input
                  value={a.value}
                  onChange={(e) => handleAttrChange(i, "value", e.target.value)}
                  className="w-1/2 p-2 border rounded"
                />

                <button onClick={() => removeAttr(i)}>❌</button>
              </div>
            ))}

            <button onClick={addAttr} className="text-green-600">
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
                />

                <input
                  value={v.price}
                  onChange={(e) =>
                    handleVariantChange(i, "price", e.target.value)
                  }
                  className="w-1/2 p-2 border rounded"
                />

                <button onClick={() => removeVariant(i)}>❌</button>
              </div>
            ))}

            <button onClick={addVariant} className="text-green-600">
              + Add variant
            </button>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-xl border">
            <h3 className="font-bold mb-3">Status</h3>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </section>
        </div>
      </div>
    </div>
  );
}
