export default function SupplierCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-bold text-lg mb-6">Nhà cung cấp</h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase">Tên</p>
          <p className="font-semibold text-lg">{data.supplierName}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">Liên hệ</p>
            <p className="text-sm font-medium">{data.phone}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">Mã NCC</p>
            <p className="text-sm font-medium">NCC-{data.supplierId}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase">Địa chỉ</p>
          <p className="text-sm">{data.address}</p>
        </div>
      </div>
    </div>
  );
}
const ImportInfoCard = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-bold text-lg mb-6">Thông tin nhập kho</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">Ngày nhập</p>
            <p className="font-semibold">{data.importDate.split(" ")[0]}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">Mã phiếu</p>
            <p className="font-semibold">{data.importCode}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase">Trạng thái</p>
          <span className="inline-block mt-1 text-xs px-3 py-1 border rounded-full">
            {data.status}
          </span>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase">Ghi chú</p>
          <p className="text-sm text-gray-600">{data.note}</p>
        </div>
      </div>
    </div>
  );
};
const TimelineCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-bold text-lg mb-6">Lịch sử</h3>

      <div className="border-l pl-4 space-y-6 text-sm">
        <div>
          <p className="font-semibold">Đã nhận hàng</p>
          <p className="text-xs text-gray-500">14/05/2024</p>
        </div>

        <div className="text-gray-400">
          <p>Đang vận chuyển</p>
          <p className="text-xs">13/05/2024</p>
        </div>

        <div className="text-gray-400">
          <p>Đã đặt hàng</p>
          <p className="text-xs">12/05/2024</p>
        </div>
      </div>
    </div>
  );
};
export { SupplierCard, ImportInfoCard, TimelineCard };
