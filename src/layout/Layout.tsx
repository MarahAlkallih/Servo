import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/SideBar";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-white" dir="rtl">
      <Sidebar />
      <main className="flex-1 mr-72 p-4">
        <Outlet />
      </main>

    </div>
  );
};