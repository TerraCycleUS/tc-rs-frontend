import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RecyclingBin from '../RecyclingBin'
import ScanItem from '../ScanItem'
import SaveItem from '../SaveItem'

export default function RecyclingBinRoutes() {
  return (
    <Routes>
      <Route index element={<RecyclingBin />} />
      <Route path="scan-item" element={<ScanItem />} />
      <Route path="save-item" element={<SaveItem />} />
    </Routes>
  )
}
