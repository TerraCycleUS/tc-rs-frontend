import React from 'react'
import { IntlProvider } from 'react-intl'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
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
import CouponLanding from './pages/CouponLanding'
import ContactUs from './pages/ContactUs'
import History from './pages/History'
import Tutorial from './pages/Tutorial'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'

export default function App() {
  const user = useSelector((state) => state.user)
  const seenTutorial = useSelector((state) => state.seenTutorial)
  const [messages, setMessages] = React.useState({})
  const location = useLocation()
  const detectedLang = detectLanguage()
  const lang = user?.lang || detectedLang
  const [message, , clear] = useMessageContext()
  const navigate = useNavigate()
  React.useEffect(() => {
    loadLocales(lang)
      .then((mod) => setMessages(mod.default))
      .catch(() => {
        loadLocales(DEFAULT_LANGUAGE).then((mod) => setMessages(mod.default))
      })
  }, [lang])

  React.useEffect(() => {
    if (!seenTutorial) navigate('/profile/tutorial')
  }, [])

  function errorNotHandle() {}

  return (
    <IntlProvider
      locale={lang}
      defaultLocale={DEFAULT_LANGUAGE}
      messages={messages}
      onError={errorNotHandle}
    >
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
                <Route
                  path="contact-us"
                  element={
                    <AuthRoute>
                      <ContactUs />
                    </AuthRoute>
                  }
                />
                <Route
                  path="history"
                  element={
                    <AuthRoute>
                      <History />
                    </AuthRoute>
                  }
                />
                <Route path="tutorial" element={<Tutorial />} />
                <Route
                  path="faq"
                  element={
                    <AuthRoute>
                      <FAQ />
                    </AuthRoute>
                  }
                />
                <Route
                  path="privacy"
                  element={
                    <AuthRoute>
                      <PrivacyPolicy />
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
              <Route
                path="scan"
                element={
                  <AuthRoute>
                    <Scan />
                  </AuthRoute>
                }
              />
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
              <Route
                path="drop-off"
                element={
                  <AuthRoute>
                    <DropOffBin />
                  </AuthRoute>
                }
              />
              <Route path="rewards">
                <Route index element={<Coupons />} />
                <Route path="landing" element={<CouponLanding />} />
              </Route>
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
