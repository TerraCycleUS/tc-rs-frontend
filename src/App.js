import React from 'react'
import { IntlProvider } from 'react-intl'
import { Routes, Route } from 'react-router-dom'

import Admin from './pages/Admin'
import Home from './pages/Home'
import Registration from './pages/Registration'
import PasswordSetup from './pages/PasswordSetup'
import { useLocale } from './context/locale'
import { loadLocales } from './utils/intl'

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
        <Route path="/admin" element={<Admin />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/pw-setup" element={<PasswordSetup />} />
      </Routes>
    </IntlProvider>
  )
}
