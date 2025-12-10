import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import {Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./containers/Lagout";
import Connexion from "./components/Authentification/Connexion";
import Dashboard from "./containers/Dashboard";
import PrivateRoute from "./components/Authentification/PrivateRoute"; 
import ForgotPassword from "./components/Authentification/ForgotPassword";
// import { PermitProvider } from '@permitio/permit-react';

function App() {
  const [gridApi, setGridApi] = useState(null);
  // const user = {
  //   id: "ca:show-menu-partners",
  //   roles: ["Admin"],
  // };
  return (
    // <PermitProvider
    //   sdkKey="permit_key_3j0Gl3KNQXtw9oevSwhvz2xt5CxZuuEll7Y9Bo4PZmXitpww6UdscV2w0J3P577sKI5cTlHB5gLWp1Hex1V0qf"
    //   user={user}
    // >
    <Router>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/MotPassOublié" element={<ForgotPassword />}/>
          <Route element={<Layout gridApi={gridApi} setGridApi={setGridApi} />}>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard setGridApi={setGridApi} />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<div>Page non trouvée</div>} />
          </Route>
        </Routes>
      </SidebarProvider>
    </Router>
    // </PermitProvider>
  );
}

export default App;
