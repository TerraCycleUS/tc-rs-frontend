import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Scan from '../../pages/Scan'
import AuthRoute from '../AuthRoute'
import BarcodeScan from '../../pages/BarcodeScan'

export default function RoutesComponent() {
  const location = useLocation()

  return (
    <Routes location={location}>
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
      <Route element={null} />
    </Routes>
  )
}
