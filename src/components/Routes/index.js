import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Scan from "../../pages/Scan";
import AuthRoute from "../AuthRoute";
import BarcodeScan from "../../pages/BarcodeScan";
import AdminPanel from "../../pages/AdminPanel";
import CookiesUsed from "../../pages/CookiesUsed";

export default function RoutesComponent() {
  const location = useLocation();

  // IMPORTANT
  // Routes present here should also be in other components if they use <Routes>(AnimatedRoutes)
  // and page 404 <Route path="*" ...
  // for example: <Route path="admin/*" element={null} />
  return (
    <Routes location={location}>
      <Route path="/admin/*" element={<AdminPanel />} />
      <Route
        path="scan"
        element={
          <AuthRoute>
            <Scan />
          </AuthRoute>
        }
      />
      <Route path="recycling-bin">
        <Route path="camera-scan" element={<BarcodeScan />} />
      </Route>
      <Route path="profile/privacy/cookie-list" element={<CookiesUsed />} />
    </Routes>
  );
}
