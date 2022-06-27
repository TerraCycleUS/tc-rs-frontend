import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ResetPassword from '../ResetPassword'
import EmailCheck from '../EmailCheck'
import PasswordSetup from '../PasswordSetup'

export default function ResetPasswordRoutes() {
  return (
    <Routes>
      <Route index element={<ResetPassword />} />
      <Route path="email-check" element={<EmailCheck forResetPw />} />
      <Route path="set-password" element={<PasswordSetup forResetPw />} />
    </Routes>
  )
}
