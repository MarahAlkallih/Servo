import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";
import { DarkModeToggle } from "../components/DarkModeToggle/DarkModeToggle";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--light-color)" }} dir="rtl">
      <Sidebar />
      <main className="flex-1 mr-72 p-4">
        <header className="mb-4 flex items-center justify-end rounded-xl px-4 py-3">
          <DarkModeToggle />
        </header>
        <Outlet />
      </main>
    </div>
  );
};