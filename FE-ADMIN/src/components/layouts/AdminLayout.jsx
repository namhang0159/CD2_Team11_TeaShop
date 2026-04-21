import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">

        <Header />

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {children}
        </div>

      </main>

    </div>
  );
}