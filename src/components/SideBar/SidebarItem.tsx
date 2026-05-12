import { NavLink } from "react-router-dom";
import type { MenuItem } from "../../types/MenuItem";
import { useRef } from "react";

export const SidebarItem = ({ item }: { item: MenuItem }) => {
  const Icon = item.icon;
  const ref = useRef<HTMLLIElement | null>(null);

  const createRipple = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const span = document.createElement("span");

    span.className = "ripple";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;

    el.appendChild(span);

    setTimeout(() => {
      span.remove();
    }, 500);
  };

  return (
    <NavLink to={item.path}>
      {({ isActive }) => (
        <li
          ref={ref}
          onMouseDown={createRipple}
          className={`relative overflow-hidden flex items-center gap-4 py-3 px-4 my-2 rounded-xl cursor-pointer transition-all duration-200
          ${
            isActive
              ? "bg-red-50 text-(--main-color)"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <Icon className="w-6 h-6 shrink-0" />

          <span className="font-medium">
            {item.label}
          </span>
        </li>
      )}
    </NavLink>
  );
};