"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ImportInventoryAPI } from "@/util/import";
import { getProductsAPI } from "@/util/products";
import { GetSuppliers } from "@/util/suppliers";

export default function InventoryCreatePage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    supplier_id: "",
    importDate: "",
    status: "completed",
    note: "",
    discount: 0,
    vat: 8,
    items: [],
  });
  const [productOptions, setProductOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsAPI();
        setProductOptions(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
    const fetchSuppliers = async () => {
      try {
        const res = await GetSuppliers();
        setSupplierOptions(res.data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      }
    };
    fetchSuppliers();
  }, []);
  const variantOptions = productOptions.flatMap((product) =>
    product.variants.map((variant) => ({
      label: `${product.name} - ${variant.option_name}`,
      value: variant.id,
      price: variant.price,
    })),
  );

  // =====================
  // ADD ITEM
  // =====================
  const handleAddItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          variant_id: "",
          batch_code: "",
          quantity: 1,
          price: 0,
          expiry_date: "",
        },
      ],
    }));
  };

  // =====================
  // CHANGE ITEM
  // =====================
  const handleChangeItem = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  // =====================
  // REMOVE ITEM
  // =====================
  const handleRemoveItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  // =====================
  // CALCULATE TOTAL
  // =====================
  const total = form.items.reduce(
    (sum, i) => sum + (i.quantity || 0) * (i.price || 0),
    0,
  );

  const discountAmount = (total * form.discount) / 100;
  const vatAmount = ((total - discountAmount) * form.vat) / 100;
  const finalTotal = total - discountAmount + vatAmount;

  // =====================
  // SUBMIT API
  // =====================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        supplier_id: Number(form.supplier_id),
        import_date: form.importDate,
        status: form.status,
        items: form.items.map((i) => ({
          variant_id: Number(i.variant_id),
          batch_code: i.batch_code,
          quantity: Number(i.quantity),
          price: Number(i.price),
          expiry_date: i.expiry_date || null,
        })),
      };

      const res = await ImportInventoryAPI(payload);

      alert("Nhập kho thành công!");
      console.log(res);

      // reset form
      setForm({
        supplier_id: "",
        importDate: "",
        status: "completed",
        note: "",
        discount: 0,
        vat: 8,
        items: [],
      });
    } catch (err) {
      alert(err?.message || "Lỗi nhập kho");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f8f6] min-h-screen p-8 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-800">Nhập hàng mới</h1>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg hover:bg-emerald-50">
            Hủy bỏ
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu phiếu"}
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="font-bold text-lg text-emerald-900">
            Thông tin chung
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {/* SUPPLIER ID */}
            <select
              className="bg-gray-50 p-3 rounded-lg"
              value={form.supplier_id}
              onChange={(e) =>
                setForm({ ...form, supplier_id: e.target.value })
              }
            >
              <option value="">Chọn nhà cung cấp</option>
              {supplierOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* DATE */}
            <input
              type="date"
              className="bg-gray-50 p-3 rounded-lg"
              value={form.importDate}
              onChange={(e) => setForm({ ...form, importDate: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Ghi chú"
            className="bg-gray-50 p-3 rounded-lg w-full"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex justify-between">
            <span>Tổng tiền</span>
            <span className="font-bold">{total.toLocaleString()}đ</span>
          </div>

          <div className="flex justify-between">
            <span>Chiết khấu (%)</span>
            <input
              type="number"
              value={form.discount}
              onChange={(e) =>
                setForm({ ...form, discount: Number(e.target.value) })
              }
              className="w-16 bg-gray-50 p-1 text-right"
            />
          </div>

          <div className="flex justify-between">
            <span>VAT ({form.vat}%)</span>
            <span>{vatAmount.toLocaleString()}đ</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-lg font-bold text-emerald-600">
            <span>Tổng thanh toán</span>
            <span>{finalTotal.toLocaleString()}đ</span>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="font-bold text-lg text-emerald-900">
            Danh sách sản phẩm
          </h2>

          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg"
          >
            <Plus size={16} /> Thêm dòng
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Variant ID</th>
              <th className="p-4">Batch code</th>
              <th className="p-4 text-right">Giá</th>
              <th className="p-4 text-center">SL</th>
              <th className="p-4">Expiry</th>
              <th className="p-4 text-right">Thành tiền</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {form.items.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <select
                    className="bg-gray-50 p-2 rounded-lg w-full"
                    value={item.variant_id}
                    onChange={(e) => {
                      const selected = variantOptions.find(
                        (v) => v.value == e.target.value,
                      );

                      handleChangeItem(i, "variant_id", e.target.value);

                      if (selected) {
                        handleChangeItem(i, "price", selected.price);
                      }
                    }}
                  >
                    <option value="">Chọn sản phẩm</option>
                    {variantOptions.map((v) => (
                      <option key={v.value} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-4">
                  <input
                    className="bg-gray-50 p-2 rounded-lg w-full"
                    value={item.batch_code}
                    onChange={(e) =>
                      handleChangeItem(i, "batch_code", e.target.value)
                    }
                  />
                </td>

                <td className="p-4 text-right">
                  <input
                    type="number"
                    className="bg-gray-50 p-2 rounded-lg w-24 text-right"
                    value={item.price}
                    onChange={(e) =>
                      handleChangeItem(i, "price", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-4 text-center">
                  <input
                    type="number"
                    className="bg-gray-50 p-2 rounded-lg w-20 text-center"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChangeItem(i, "quantity", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-4">
                  <input
                    type="date"
                    className="bg-gray-50 p-2 rounded-lg"
                    value={item.expiry_date}
                    onChange={(e) =>
                      handleChangeItem(i, "expiry_date", e.target.value)
                    }
                  />
                </td>

                <td className="p-4 text-right font-bold">
                  {(item.quantity * item.price).toLocaleString()}đ
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleRemoveItem(i)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
