import React from 'react'
import { IntlProvider } from 'react-intl'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Admin from './pages/Admin'
import Home from './pages/Home'
import { detectLanguage, loadLocales } from './utils/intl'
import SignIn from './pages/SignIn'
import { DEFAULT_LANGUAGE } from './utils/const'
import SocialLogin from './pages/SocialLogin'
import EmailSetup from './pages/EmailSetup'
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
import Registration from './pages/Registration'
import PasswordSetup from './pages/PasswordSetup'
import EmailCheck from './pages/EmailCheck'
import ConfirmationCode from './pages/ConfirmationCode'
import RetailersId from './pages/RetailersId'
import ResetPassword from './pages/ResetPassword'
import RecyclingBin from './pages/RecyclingBin'
import ScanItem from './pages/ScanItem'
import TakePhoto from './pages/TakePhoto'
import SaveItem from './pages/SaveItem'
import ApiError from './components/PopUps/ApiError'
import { useMessageContext } from './context/message'
import BackdropMessage from './components/Message/BackdropMessage'

export default function App() {
  const user = useSelector((state) => state.user)
  const [messages, setMessages] = React.useState({})
  const location = useLocation()
  const lang = user?.lang || detectLanguage()
  const [message, , clear] = useMessageContext()

  React.useEffect(() => {
    loadLocales(lang)
      .then((mod) => setMessages(mod.default))
      .catch(() => {
        loadLocales(DEFAULT_LANGUAGE).then((mod) => setMessages(mod.default))
      })
  }, [lang])

  return (
    <IntlProvider locale={lang} defaultLocale="en" messages={messages}>
      <GlobalHeader />
      <div className="position-relative flex-grow-1">
        <TransitionGroup component={null}>
          <CSSTransition
            timeout={600}
            key={location.pathname}
            onEnter={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          >
            <Routes location={location}>
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
              <Route path="registration">
                <Route index element={<Registration />} />
                <Route path="pw-setup" element={<PasswordSetup />} />
                <Route path="email-check" element={<EmailCheck />} />
                <Route path="confirm-code" element={<ConfirmationCode />} />
                <Route path="retailers-id" element={<RetailersId />} />
              </Route>
              <Route path="reset-password">
                <Route index element={<ResetPassword />} />
                <Route path="email-check" element={<EmailCheck forResetPw />} />
                <Route
                  path="set-password"
                  element={<PasswordSetup forResetPw />}
                />
              </Route>
              <Route path="scan" element={<Scan />} />
              <Route path="social-login">
                <Route index element={<SocialLogin />} />
                <Route path="email-setup" element={<EmailSetup />} />
              </Route>
              <Route path="recycling-bin">
                <Route index element={<RecyclingBin />} />
                <Route path="scan-item" element={<ScanItem />} />
                <Route path="take-photo" element={<TakePhoto />} />
                <Route path="save-item" element={<SaveItem />} />
              </Route>
              <Route path="drop-off" element={<DropOffBin />} />
              <Route path="rewards" element={<Coupons />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <ApiError />
      {message ? (
        <BackdropMessage onClose={clear} type={message.type}>
          {message.text}
        </BackdropMessage>
      ) : null}
    </IntlProvider>
  )
}
