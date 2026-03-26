"use client";

import { addProduct } from "@/data/products";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function AddProductPage() {
    const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = () => {
  addProduct({
    id: Date.now(),
    name: form.name,
    price: Number(form.price),
    stock: Number(form.stock),
    status: "inStock",
    category: "tra",
    sku: "NEW-" + Date.now(),
    image: "https://picsum.photos/200",
  });

  router.push("/products");
};
  return (
    
    <div className="bg-gray-50 min-h-screen p-8">

      {/* HEADER */}

      <header className="flex flex-wrap justify-between items-end gap-4 mb-8">

        <div className="max-w-2xl">

          <h2 className="text-4xl font-bold text-gray-900">
            Add New Product
          </h2>

          <p className="text-gray-600 mt-2">
            Create a new listing for your premium tea collection.
          </p>

        </div>

        <div className="flex gap-3">

          <button className="px-6 py-2 rounded-lg border border-gray-300">
            Cancel
          </button>

          <button
  onClick={handleSubmit}
  className="px-6 py-2 rounded-lg bg-green-600 text-white"
>
  Save Product
</button>

        </div>

      </header>



      {/* GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


        {/* LEFT COLUMN */}

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
  onChange={handleChange}
  className="w-full rounded-lg border border-gray-300 p-3"
  placeholder="Product name"
/>

              </div>


              <div>

                <label className="block mb-2 text-sm font-medium">
                  SKU
                </label>

                <input
                  className="w-full rounded-lg border border-gray-300 p-3"
                  placeholder="SKU"
                />

              </div>


              <div>

                <label className="block mb-2 text-sm font-medium">
                  Category
                </label>

                <select className="w-full rounded-lg border border-gray-300 p-3">

                  <option>Select Category</option>
                  <option>Oolong</option>
                  <option>Green</option>
                  <option>Black</option>

                </select>

              </div>


              <div className="md:col-span-2">

                <label className="block mb-2 text-sm font-medium">
                  Description
                </label>
<div className="border border-gray-300 rounded-lg overflow-hidden">

  <div className="bg-gray-100 border-b p-2 flex gap-2">

    <button className="px-2 py-1 text-sm">B</button>
    <button className="px-2 py-1 text-sm">I</button>
    <button className="px-2 py-1 text-sm">•</button>
    <button className="px-2 py-1 text-sm">Link</button>

  </div>

  <textarea
    rows="6"
    className="w-full p-3 outline-none"
    placeholder="Description..."
  />

</div>
              </div>


            </div>

          </section>



          {/* MEDIA */}

          <section className="bg-white p-8 rounded-xl border border-gray-200">

            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Product Media
            </h3>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">


              <div className="aspect-square border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">

  <span className="text-2xl">+</span>

  <span className="text-xs">
    Add Photo
  </span>

</div>


              <div className="aspect-square border border-gray-200 overflow-hidden relative group">

  <img
    className="w-full h-full object-cover"
    src="https://picsum.photos/200"
  />

  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">

    <button className="bg-white px-2 py-1 text-sm rounded">
      Edit
    </button>

    <button className="bg-white px-2 py-1 text-sm rounded text-red-600">
      Delete
    </button>

  </div>

</div>

              <div className="aspect-square border border-gray-200 overflow-hidden">

                <img
                  className="w-full h-full object-cover"
                  src="https://picsum.photos/201"
                />

              </div>


            </div>

          </section>


        </div>



        <div className="space-y-8">


  {/* STATUS & PRICE */}

  <section className="bg-white p-8 rounded-xl border border-gray-200">

    <h3 className="text-xl font-bold mb-6 text-gray-800">
      Status & Price
    </h3>

    <div className="space-y-6">


      {/* STATUS */}

      <div className="flex items-center justify-between">

        <span className="text-sm font-medium text-gray-700">
          Product Status
        </span>

        <div className="flex items-center gap-2">

          <span className="text-xs text-gray-500">
            Draft
          </span>

          <button className="w-10 h-5 bg-green-600 rounded-full relative">

            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />

          </button>

          <span className="text-xs text-green-600">
            Live
          </span>

        </div>

      </div>


      {/* PRICE */}

      <div>

        <label className="block mb-2 text-sm font-medium">
          Retail Price ($)
        </label>

       <input
  name="price"
  onChange={handleChange}
  type="number"
  className="w-full rounded-lg border border-gray-300 p-3"
  placeholder="0.00"
/>

      </div>


    </div>

  </section>



  {/* INVENTORY */}

  <section className="bg-white p-8 rounded-xl border border-gray-200">

    <h3 className="text-xl font-bold mb-6 text-gray-800">
      Inventory Management
    </h3>

    <div className="space-y-6">


      {/* STOCK */}

      <div>

        <label className="block mb-2 text-sm font-medium">
          Stock Quantity
        </label>

       <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

  <button className="px-3 py-2 bg-gray-100">
    -
  </button>

  <input
  name="stock"
  onChange={handleChange}
  type="number"
  defaultValue={0}
  className="w-full text-center outline-none"
/>

  <button className="px-3 py-2 bg-gray-100">
    +
  </button>

</div>

      </div>


      {/* LOW STOCK */}

      <div>

        <label className="block mb-2 text-sm font-medium">
          Low Stock Alert Threshold
        </label>

        <input
          type="number"
          className="w-full rounded-lg border border-gray-300 p-3"
          placeholder="5"
        />

        <p className="text-xs text-gray-500 mt-2 italic">
          Notification will be sent when stock drops to this level.
        </p>

      </div>


    </div>

  </section>



  {/* ATTRIBUTES */}

  <section className="bg-white p-8 rounded-xl border border-gray-200">

    <h3 className="text-xl font-bold mb-6 text-gray-800">
      Attributes
    </h3>


    {/* TAGS */}

    <div className="mb-4">

      <label className="block mb-2 text-sm font-medium">
        Product Tags
      </label>

      <div className="flex gap-2 mb-3">

       <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
  Organic ✕
</span>

        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
          Export
        </span>

      </div>

      <input
        className="w-full rounded-lg border border-gray-300 p-3"
        placeholder="Add tag..."
      />

    </div>


    {/* ORIGIN */}

    <div>

      <label className="block mb-2 text-sm font-medium">
        Origin
      </label>

      <input
        className="w-full rounded-lg border border-gray-300 p-3"
        placeholder="Vietnam"
      />

    </div>


  </section>


</div>

      </div>

    </div>
  );
}