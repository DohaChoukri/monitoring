// Layout.jsx
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Header from "../components/header";

export default function Layout({ gridApi, setGridApi }) {
  return (
    <div className="flex w-full min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header gridApi={gridApi} />
        <main className="flex-1 overflow-auto">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
