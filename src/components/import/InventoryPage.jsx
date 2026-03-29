"use client";

import { useEffect, useMemo, useState } from "react";

import SummaryCard from "./SummaryCard";
import InventoryTable from "./InventoryTable";
import InventoryFilter from "./InventoryFilter";

import { getInventory } from "@/util/api";
import useDebounce from "@/hooks/useDebounce.";
import Link from "next/link";

export default function InventoryPage() {
  const [rawData, setRawData] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const debouncedKeyword = useDebounce(keyword, 400);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minProducts, setMinProducts] = useState("");
  const [maxProducts, setMaxProducts] = useState("");
  // FETCH DATA
  const fetchData = async () => {
    const res = await getInventory();

    const formatted = res.data.map((item) => {
      const totalProducts = item.items.length;

      const totalStock = item.items.reduce(
        (sum, i) => sum + i.stockAfterImport,
        0,
      );

      return {
        id: item.id,
        importCode: item.importCode,
        importDate: item.importDate,
        supplierName: item.supplierName,
        totalAmount: item.totalAmount,
        status: item.status,

        items: item.items,

        totalProducts,
        totalStock,
      };
    });

    setRawData(formatted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FILTER DATA
  const filteredData = useMemo(() => {
    return rawData.filter((item) => {
      const date = new Date(item.importDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // SEARCH
      const matchKeyword =
        item.importCode
          .toLowerCase()
          .includes(debouncedKeyword.toLowerCase()) ||
        item.supplierName
          .toLowerCase()
          .includes(debouncedKeyword.toLowerCase());

      // DATE FILTER
      const matchDate = (!start || date >= start) && (!end || date <= end);

      // PRICE FILTER
      const matchPrice =
        (!minPrice || item.totalAmount >= Number(minPrice)) &&
        (!maxPrice || item.totalAmount <= Number(maxPrice));

      // PRODUCT COUNT FILTER
      const matchProducts =
        (!minProducts || item.totalProducts >= Number(minProducts)) &&
        (!maxProducts || item.totalProducts <= Number(maxProducts));

      return matchKeyword && matchDate && matchPrice && matchProducts;
    });
  }, [
    rawData,
    debouncedKeyword,
    startDate,
    endDate,
    minPrice,
    maxPrice,
    minProducts,
    maxProducts,
  ]);

  return (
    <div className="p-8 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold">Quản lý nhập hàng</h2>
          <p className="text-gray-500 mt-1">
            Theo dõi và cập nhật số lượng tồn kho
          </p>
        </div>

        <Link
          href="/inventory/create"
          className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold flex gap-2 items-center"
        >
          <i className="fa fa-plus"></i>
          Nhập hàng mới
        </Link>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-4 gap-6">
        <SummaryCard
          icon="box"
          title="Tổng sản phẩm"
          value="1,240"
          color="bg-green-100 text-green-600"
        />
        <SummaryCard
          icon="triangle-exclamation"
          title="Sắp hết"
          value="12"
          color="bg-yellow-100 text-yellow-600"
        />
        <SummaryCard
          icon="ban"
          title="Hết hàng"
          value="5"
          color="bg-red-100 text-red-600"
        />
        <SummaryCard
          icon="cart-shopping"
          title="Giá trị kho"
          value="$45,200"
          color="bg-blue-100 text-blue-600"
        />
      </div>

      {/* FILTER */}
      <InventoryFilter
        keyword={keyword}
        setKeyword={setKeyword}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minProducts={minProducts}
        setMinProducts={setMinProducts}
        maxProducts={maxProducts}
        setMaxProducts={setMaxProducts}
      />

      {/* TABLE */}
      <InventoryTable data={filteredData} />
    </div>
  );
}
