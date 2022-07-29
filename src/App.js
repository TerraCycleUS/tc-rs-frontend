import React from 'react'
import { IntlProvider } from 'react-intl'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Admin from './pages/Admin'
import Home from './pages/Home'
import { detectLanguage, loadLocales } from './utils/intl'
import RegistrationRoutes from './pages/RegistrationRoutes'
import ResetPasswordRoutes from './pages/ResetPasswordRoutes'
import SignIn from './pages/SignIn'
import { DEFAULT_LANGUAGE } from './utils/const'
import SocialLogin from './pages/SocialLogin'
import EmailSetup from './pages/EmailSetup'
import RecyclingBinRoutes from './pages/RecyclingBinRoutes'
import { RecyclingBinDataProvider } from './context/recyclingBinData'
import Scan from './pages/Scan'
import MapPage from './pages/MapPage'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import AuthRoute from './components/AuthRoute'
import ChangePassword from './pages/ChangePassword'
import Language from './pages/Language'
import MonoprixId from './pages/MonoprixId'
import DropOffBin from './pages/DropOffBin'
import Coupons from './pages/Coupons'
import GlobalHeader from './components/GlobalHeader'

export default function App() {
  const user = useSelector((state) => state.user)
  const [messages, setMessages] = React.useState({})
  const location = useLocation()
  const lang = user?.lang || detectLanguage()

  React.useEffect(() => {
    loadLocales(lang)
      .then((mod) => setMessages(mod.default))
      .catch(() => {
        loadLocales(DEFAULT_LANGUAGE)
          .then((mod) => setMessages(mod.default))
          .catch(console.log)
      })
  }, [lang])

  return (
    <IntlProvider locale={lang} defaultLocale="en" messages={messages}>
      <GlobalHeader />
      <TransitionGroup component={null}>
        <CSSTransition timeout={600} key={location.pathname} classNames="anim">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="admin" element={<Admin />} />
            <Route path="map" element={<MapPage />} />
            <Route path="profile">
              <Route
                index
                element={
                  <AuthRoute>
                    <Profile />
                  </AuthRoute>
                }
              />
              <Route
                path="edit"
                element={
                  <AuthRoute>
                    <EditProfile />
                  </AuthRoute>
                }
              />
              {!user || user.socialProvider ? null : (
                <Route
                  path="change-password"
                  element={
                    <AuthRoute>
                      <ChangePassword />
                    </AuthRoute>
                  }
                />
              )}
              <Route
                path="language"
                element={
                  <AuthRoute>
                    <Language />
                  </AuthRoute>
                }
              />
              <Route
                path="monoprix-id"
                element={
                  <AuthRoute>
                    <MonoprixId />
                  </AuthRoute>
                }
              />
            </Route>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="registration/*" element={<RegistrationRoutes />} />
            <Route path="reset-password/*" element={<ResetPasswordRoutes />} />
            <Route path="scan" element={<Scan />} />
            <Route path="social-login">
              <Route index element={<SocialLogin />} />
              <Route path="email-setup" element={<EmailSetup />} />
            </Route>
            <Route
              path="recycling-bin/*"
              element={
                <RecyclingBinDataProvider>
                  <RecyclingBinRoutes />
                </RecyclingBinDataProvider>
              }
            />
            <Route path="drop-off" element={<DropOffBin />} />
            <Route path="rewards" element={<Coupons />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </IntlProvider>
  )
}
