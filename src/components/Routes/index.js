import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Scan from '../../pages/Scan'
import AuthRoute from '../AuthRoute'
import BarcodeScan from '../../pages/BarcodeScan'
import AdminPanel from '../../pages/AdminPanel'
import FileNotFound from '../../pages/FileNotFound'

export default function RoutesComponent() {
  const location = useLocation()

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
      <Route path="file-not-found" element={<FileNotFound />} />
      <Route element={null} />
    </Routes>
  )
}
