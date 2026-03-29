export default function TotalSection({ items }) {
  const total = items.reduce((s, i) => s + i.quantity * i.importPrice, 0);

  return (
    <div className="w-[360px] bg-white border border-gray-200 rounded-xl p-6">
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{total.toLocaleString()} ₫</span>
        </div>

        <div className="flex justify-between">
          <span>Giảm giá</span>
          <span>0 ₫</span>
        </div>

        <div className="flex justify-between">
          <span>Thuế</span>
          <span>0 ₫</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Tổng</span>
          <span>{total.toLocaleString()} ₫</span>
        </div>
      </div>
    </div>
  );
}
