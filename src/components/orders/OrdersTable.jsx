"use client";

import { UpdateOrderStatusAPI } from "@/util/orders";
import Link from "next/link";
import { useState } from "react";

export default function OrdersTable({ orders }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const statusFlow = {
    Pending: ["Processing", "Cancelled"],
    Processing: ["Shipped", "Cancelled"],
    Shipped: ["Delivered"],
    Delivered: [],
    Cancelled: [],
  };

  const statusStyle = (s) => {
    switch (s) {
      case "Pending":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
      case "Shipping":
        return "bg-sky-50 text-sky-700 ring-1 ring-sky-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
      default:
        return "bg-gray-50 text-gray-600 ring-1 ring-gray-200";
    }
  };

  const paymentStyle = (s) =>
    s === "Paid"
      ? "text-emerald-600 bg-emerald-50"
      : "text-rose-600 bg-rose-50";

  const formatMoney = (n) => Number(n).toLocaleString("vi-VN") + "₫";

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  const isCOD =
    selectedOrder?.payment_method?.name == "Thanh toán khi nhận hàng (COD)";

  const canEdit =
    selectedOrder && (selectedOrder.payment_status === "Paid" || isCOD);

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setOpenModal(true);
  };

  const openCancel = (order) => {
    setSelectedOrder(order);
    setNewStatus("Cancelled");
    setOpenModal(true);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-4 flex justify-between border-b border-gray-200 bg-slate-50">
        <div>
          <h2 className="font-bold text-lg">Orders</h2>
          <p className="text-sm text-gray-500">Manage all orders</p>
        </div>

        <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          Total: {orders?.total || 0}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Order</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Total</th>
              <th className="px-6 py-4 text-left">Payment</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => {
              const canCancel = o.status === "Pending";

              return (
                <tr
                  key={o.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  {/* ORDER */}
                  <td className="px-6 py-4 font-semibold">#{o.id}</td>

                  {/* CUSTOMER */}
                  <td className="px-6 py-4">
                    <div>{o.user?.full_name}</div>
                    <div className="text-xs text-gray-400">{o.user?.email}</div>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(o.created_at)}
                  </td>

                  {/* TOTAL */}
                  <td className="px-6 py-4 font-bold">
                    {formatMoney(o.total_amount)}
                  </td>

                  {/* PAYMENT */}
                  <td className="px-6 py-4">
                    <div>{o.payment_method?.name}</div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${paymentStyle(o.payment_status)}`}
                    >
                      {o.payment_status}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${statusStyle(o.status)}`}
                    >
                      {o.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* VIEW */}
                      <Link
                        href={`/orders/${o.id}`}
                        className="p-2 bg-blue-50 text-blue-600 rounded"
                      >
                        <i class="fa fa-eye" aria-hidden="true"></i>
                      </Link>

                      {/* EDIT */}
                      <button
                        onClick={() => openEditModal(o)}
                        disabled={
                          o.payment_status === "Unpaid" &&
                          o.payment_method?.name !==
                            "Thanh toán khi nhận hàng (COD)"
                        }
                        className="p-2 bg-green-50 text-green-600 rounded disabled:opacity-40"
                      >
                        <i class="fa fa-edit" aria-hidden="true"></i>
                      </button>

                      {/* CANCEL (ONLY PENDING) */}
                      {canCancel && (
                        <button
                          onClick={() => openCancel(o)}
                          className="p-2 bg-gray-50 text-red-600 rounded"
                        >
                          <i class="fa fa-xmark" aria-hidden="true"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {openModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] p-6 rounded-xl space-y-4">
            <h2 className="text-lg font-bold">Order #{selectedOrder.id}</h2>

            {/* BLOCK RULE */}
            {selectedOrder.payment_status === "Unpaid" &&
            selectedOrder.payment_method?.name !==
              "Thanh toán khi nhận hàng (COD)" ? (
              <p className="text-red-500">Cannot edit this order (Unpaid)</p>
            ) : (
              <>
                <label className="text-sm">Status</label>

                <select
                  className="w-full border border-gray-200 p-2 rounded"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value={selectedOrder.status}>
                    {selectedOrder.status}
                  </option>

                  {(statusFlow[selectedOrder.status] || []).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-100 rounded"
              >
                Cancel
              </button>

              <button
                disabled={newStatus === selectedOrder.status}
                onClick={async () => {
                  console.log("UPDATE:", selectedOrder.id, newStatus);
                  await UpdateOrderStatusAPI(selectedOrder.id, newStatus);
                  setOpenModal(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-40"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
