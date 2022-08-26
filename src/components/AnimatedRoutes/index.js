import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AdminPanel from '../../pages/AdminPanel'
import Home from '../../pages/Home'
import { detectLanguage } from '../../utils/intl'
import SignIn from '../../pages/SignIn'
import SocialLogin from '../../pages/SocialLogin'
import EmailSetup from '../../pages/EmailSetup'
import MapPage from '../../pages/MapPage'
import Profile from '../../pages/Profile'
import EditProfile from '../../pages/EditProfile'
import AuthRoute from '../AuthRoute'
import ChangePassword from '../../pages/ChangePassword'
import Language from '../../pages/Language'
import MonoprixId from '../../pages/MonoprixId'
import DropOffBin from '../../pages/DropOffBin'
import Coupons from '../../pages/Coupons'
import Registration from '../../pages/Registration'
import PasswordSetup from '../../pages/PasswordSetup'
import EmailCheck from '../../pages/EmailCheck'
import ConfirmationCode from '../../pages/ConfirmationCode'
import RetailersId from '../../pages/RetailersId'
import ResetPassword from '../../pages/ResetPassword'
import RecyclingBin from '../../pages/RecyclingBin'
import ScanItem from '../../pages/ScanItem'
import TakePhoto from '../../pages/TakePhoto'
import SaveItem from '../../pages/SaveItem'
import CouponLanding from '../../pages/CouponLanding'
import ContactUs from '../../pages/ContactUs'
import History from '../../pages/History'
import Tutorial from '../../pages/Tutorial'
import FAQ from '../../pages/FAQ'
import PrivacyPolicy from '../../pages/PrivacyPolicy'
import TermsConditions from '../../pages/TermsConditions'

export default function RoutesComponent() {
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const detectedLang = detectLanguage()

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="admin/*" element={<AdminPanel />} />
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
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsConditions />} />
      </Route>
      <Route path="sign-in" element={<SignIn language={detectedLang} />} />
      <Route path="registration">
        <Route index element={<Registration language={detectedLang} />} />
        <Route path="pw-setup" element={<PasswordSetup />} />
        <Route path="email-check" element={<EmailCheck />} />
        <Route path="confirm-code" element={<ConfirmationCode />} />
        <Route path="retailers-id" element={<RetailersId />} />
      </Route>
      <Route path="reset-password">
        <Route index element={<ResetPassword />} />
        <Route path="email-check" element={<EmailCheck forResetPw />} />
        <Route path="set-password" element={<PasswordSetup forResetPw />} />
      </Route>
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
        <Route
          index
          element={
            <AuthRoute>
              <Coupons />
            </AuthRoute>
          }
        />
        <Route path="landing" element={<CouponLanding />} />
      </Route>
    </Routes>
  )
}
