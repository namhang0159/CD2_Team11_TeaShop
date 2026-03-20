import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ icon, label, href }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
        active
          ? "bg-green-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-green-600/10"
      }`}
    >
      <i className={`fa ${icon}`}></i>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
