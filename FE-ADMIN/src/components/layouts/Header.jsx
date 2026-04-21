export default function Header() {
  return (
    <header className="bg-white dark:bg-background-dark border-b border-green-600/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-green-600">
          <i className="fa fa-address-book" aria-hidden="true"></i>
        </span>

        <h2 className="text-xl font-bold text-black">Tea Shop Management</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>

          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            className="pl-10 pr-4 py-2 bg-background-light  border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-green-600/50 text-black"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-green-600/10 text-green-600 hover:bg-green-600/20 relative">
            <span className="material-symbols-outlined">
              <i className="fa fa-bell" aria-hidden="true"></i>
            </span>

            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
