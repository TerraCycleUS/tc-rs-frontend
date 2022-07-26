import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RecyclingBin from '../RecyclingBin'
import ScanItem from '../ScanItem'
import SaveItem from '../SaveItem'
import TakePhoto from '../TakePhoto'

export default function RecyclingBinRoutes() {
  return (
    <Routes>
      <Route index element={<RecyclingBin />} />
      <Route path="scan-item" element={<ScanItem />} />
      <Route path="take-photo" element={<TakePhoto />} />
      <Route path="save-item" element={<SaveItem />} />
    </Routes>
  )
}
