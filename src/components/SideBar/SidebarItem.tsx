import { NavLink } from "react-router-dom";
import type { MenuItem } from "../../types/MenuItem";
import { useRef } from "react";

export const SidebarItem = ({
  item,
  collapsed = false,
}: {
  item: MenuItem;
  collapsed?: boolean;
}) => {
  const Icon = item.icon;
  const ref = useRef<HTMLLIElement | null>(null);

  const createRipple = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const span = document.createElement("span");

    span.style.position = "absolute";
    span.style.borderRadius = "9999px";
    span.style.pointerEvents = "none";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.backgroundColor = "rgba(139, 0, 0, 0.14)";
    span.style.transform = "scale(0)";
    span.style.opacity = "0.9";
    span.style.transition = "transform 500ms ease, opacity 500ms ease";

    el.appendChild(span);

    requestAnimationFrame(() => {
      span.style.transform = "scale(1)";
      span.style.opacity = "0";
    });

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
          className={`relative overflow-hidden flex items-center ${
            collapsed ? "justify-center" : "gap-4"
          } py-3 ${collapsed ? "px-2" : "px-4"} my-2 rounded-xl cursor-pointer transition-all duration-200
          ${
            isActive
              ? "bg-red-50 text-(--main-color)"
              : "hover:bg-gray-100 text-gray-700"
          }`}
          aria-label={item.label}
          title={collapsed ? item.label : undefined}
        >
          <Icon className="w-6 h-6 shrink-0" />

          {!collapsed && (
            <span className="font-medium">{item.label}</span>
          )}
        </li>
      )}
    </NavLink>
  );
};