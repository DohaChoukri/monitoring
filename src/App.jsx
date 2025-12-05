import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Header from "@/components/header";
import CardStats from "./components/card";
import GridExample from "./components/table/table";

function App() {
  const [gridApi, setGridApi] = useState(null);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header gridApi={gridApi} />
          <main className="flex-1 overflow-auto">
            <CardStats />
            <GridExample onGridReady={(api) => setGridApi(api)} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
