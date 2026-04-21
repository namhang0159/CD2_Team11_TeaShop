export default function SummaryCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
      >
        <i className={`fa fa-${icon} text-xl`}></i>
      </div>

      <p className="text-sm text-gray-500 mt-3">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}
