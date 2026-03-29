"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function InventoryCreatePage() {
  const [form, setForm] = useState({
    supplierName: "",
    importDate: "",
    note: "",
    discount: 0,
    vat: 8,
    items: [],
  });

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        {
          productName: "",
          sku: "",
          optionName: "",
          quantity: 1,
          importPrice: 0,
        },
      ],
    });
  };

  const handleChangeItem = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  const handleRemoveItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  const total = form.items.reduce(
    (sum, i) => sum + i.quantity * i.importPrice,
    0,
  );

  const discountAmount = (total * form.discount) / 100;
  const vatAmount = ((total - discountAmount) * form.vat) / 100;
  const finalTotal = total - discountAmount + vatAmount;

  return (
    <div className="bg-[#f6f8f6] min-h-screen p-8 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-800">Nhập hàng mới</h1>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg hover:bg-emerald-50">
            Hủy bỏ
          </button>
          <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700">
            Lưu phiếu
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="font-bold text-lg text-emerald-900">
            Thông tin chung
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <input
              placeholder="Nhà cung cấp"
              className="bg-gray-50 p-3 rounded-lg"
              value={form.supplierName}
              onChange={(e) =>
                setForm({ ...form, supplierName: e.target.value })
              }
            />

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

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex justify-between">
            <span>Tổng tiền</span>
            <span className="font-bold">{total.toLocaleString()}đ</span>
          </div>

          <div className="flex justify-between items-center">
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

          <button className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700">
            HOÀN TẤT
          </button>
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
              <th className="p-4 text-left">Sản phẩm</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Phân loại</th>
              <th className="p-4 text-right">Đơn giá</th>
              <th className="p-4 text-center">SL</th>
              <th className="p-4 text-right">Thành tiền</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {form.items.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <input
                    className="bg-gray-50 p-2 rounded-lg w-full"
                    placeholder="Tên sản phẩm"
                    value={item.productName}
                    onChange={(e) =>
                      handleChangeItem(i, "productName", e.target.value)
                    }
                  />
                </td>

                <td className="p-4">
                  <input
                    className="bg-gray-50 p-2 rounded-lg w-full"
                    value={item.sku}
                    onChange={(e) => handleChangeItem(i, "sku", e.target.value)}
                  />
                </td>

                <td className="p-4">
                  <input
                    className="bg-gray-50 p-2 rounded-lg w-full"
                    value={item.optionName}
                    onChange={(e) =>
                      handleChangeItem(i, "optionName", e.target.value)
                    }
                  />
                </td>

                <td className="p-4 text-right">
                  <input
                    type="number"
                    className="bg-gray-50 p-2 rounded-lg w-28 text-right"
                    value={item.importPrice}
                    onChange={(e) =>
                      handleChangeItem(i, "importPrice", Number(e.target.value))
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

                <td className="p-4 text-right font-bold">
                  {(item.quantity * item.importPrice).toLocaleString()}đ
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleRemoveItem(i)}
                    className="text-gray-400 hover:text-red-500"
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
