import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Registration from '../Registration'
import PasswordSetup from '../PasswordSetup'
import EmailCheck from '../EmailCheck'

export default function RegistrationRoutes() {
  return (
    <Routes>
      <Route index element={<Registration />} />
      <Route path="pw-setup" element={<PasswordSetup />} />
      <Route path="email-check" element={<EmailCheck />} />
    </Routes>
  )
}
