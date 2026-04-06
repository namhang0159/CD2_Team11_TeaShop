export default function OrderCustomer({ order }) {
  const user = order?.user;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">Customer Details</h3>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          👤
        </div>

        <div>
          <p className="font-bold">{user?.full_name}</p>
          <p className="text-sm text-slate-500">{user?.role}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <p>📧 {user?.email}</p>
        <p>📞 {user?.phone_number}</p>
      </div>
    </div>
  );
}
