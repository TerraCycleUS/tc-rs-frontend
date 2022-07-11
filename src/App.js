import React from 'react'
import { IntlProvider } from 'react-intl'
import { Routes, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Admin from './pages/Admin'
import Home from './pages/Home'
import { useLocale } from './context/locale'
import { loadLocales } from './utils/intl'
import RegistrationRoutes from './pages/RegistrationRoutes'
import ResetPasswordRoutes from './pages/ResetPasswordRoutes'
import SignIn from './pages/SignIn'
import { DEFAULT_LANGUAGE } from './utils/const'
import SocialLogin from './pages/SocialLogin'
import EmailSetup from './pages/EmailSetup'
import RecyclingBin from './pages/RecyclingBin'

export default function App() {
  const [messages, setMessages] = React.useState({})
  const location = useLocation()
  const [locale] = useLocale()

  React.useEffect(() => {
    loadLocales(locale)
      .then((mod) => setMessages(mod.default))
      .catch(() => {
        loadLocales(DEFAULT_LANGUAGE)
          .then((mod) => setMessages(mod.default))
          .catch(console.log)
      })
  }, [locale])

  return (
    <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
      <TransitionGroup component={null}>
        <CSSTransition timeout={600} key={location.pathname} classNames="anim">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="admin" element={<Admin />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="registration/*" element={<RegistrationRoutes />} />
            <Route path="reset-password/*" element={<ResetPasswordRoutes />} />
            <Route path="social-login">
              <Route index element={<SocialLogin />} />
              <Route path="email-setup" element={<EmailSetup />} />
            </Route>
            <Route path="recycling-bin" element={<RecyclingBin />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </IntlProvider>
  )
}
