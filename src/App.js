import React from 'react'
import { IntlProvider } from 'react-intl'
import { Routes, Route } from 'react-router-dom'

import Admin from './pages/Admin'
import Home from './pages/Home'
import { useLocale } from './context/locale'
import { loadLocales } from './utils/intl'
import RegistrationRoutes from './pages/RegistrationRoutes'
import { RegistrationDataProvider } from './context/registrationData'

export default function App() {
  const [messages, setMessages] = React.useState({})

  const [locale] = useLocale()

  React.useEffect(() => {
    loadLocales(locale)
      .then((mod) => setMessages(mod.default))
      .catch(console.log)
  }, [locale])

  return (
    <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route
          path="registration/*"
          element={
            <RegistrationDataProvider>
              <RegistrationRoutes />
            </RegistrationDataProvider>
          }
        />
      </Routes>
    </IntlProvider>
  )
}
