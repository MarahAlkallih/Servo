import { SidebarItem } from "./SidebarItem";
import { menuItems } from "./menuItems";

export default function Sidebar() {
  return (
    <aside
      className="fixed right-0 top-0 z-30 h-screen w-72 bg-white shadow-md border-l border-gray-100"
      dir="rtl"
    >
      <nav className="h-full flex flex-col">
        <div className="p-6 text-xl font-bold text-[var(--main-color)]">
          Dashboard
        </div>
        <ul className="flex-1 px-3">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </ul>

      </nav>
    </aside>
  );
}