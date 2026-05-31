import { SidebarItem } from "./SidebarItem";
import { menuItems } from "./menuItems";
import moto_logo2 from "../../assets/moto_logo2.png";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed right-0 top-0 z-30 h-screen border-l border-gray-200 shadow-sm transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
      style={{ backgroundColor: "var(--light-color)" }}
      dir="rtl"
    >
      <nav className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-gray-100">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <img
                src={moto_logo2}
                alt="Moto Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          )}

          <IconButton
            size="small"
            onClick={() => setCollapsed((s) => !s)}
            className="!bg-gray-100 hover:!bg-gray-200 transition"
          >
            {collapsed ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        {/* Menu */}
        <ul className={`flex-1 py-3 ${collapsed ? "px-2" : "px-3"}`}>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}