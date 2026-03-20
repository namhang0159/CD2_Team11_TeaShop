import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";

export const metadata = {
  title: "Thiên An Tea Admin",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <Header />

            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
