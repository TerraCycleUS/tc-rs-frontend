import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
import DropOffBin from '../../pages/DropOffBin'
import Coupons from '../../pages/Coupons'
import Registration from '../../pages/Registration'
import PasswordSetup from '../../pages/PasswordSetup'
import EmailCheck from '../../pages/EmailCheck'
import ConfirmationCode from '../../pages/ConfirmationCode'
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
import TutorialRoute from '../TutorialRoute'
import SelectRetailer from '../../pages/SelectRetailer'
import RetailerListPage from '../../pages/RetailerListPage'
import RetailersIdEdit from '../../pages/RetailerIdEdit'
import RewardsWallet from '../../pages/RewardsWallet'
import ScanLoyalty from '../../pages/ScanLoyalty'
import SetLoyaltyId from '../../pages/SetLoyaltyId'

export default function RoutesComponent() {
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const detectedLang = detectLanguage()

  return (
    <Routes location={location}>
      <Route
        path="/"
        element={
          <TutorialRoute>
            <Home />
          </TutorialRoute>
        }
      />
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
        <Route
          path="retailer-list"
          element={
            <AuthRoute>
              <RetailerListPage />
            </AuthRoute>
          }
        />
        <Route
          path="retailer-id-edit"
          element={
            <AuthRoute>
              <RetailersIdEdit />
            </AuthRoute>
          }
        />
      </Route>
      <Route path="sign-in" element={<SignIn language={detectedLang} />} />
      <Route path="registration">
        <Route index element={<Registration language={detectedLang} />} />
        <Route path="pw-setup" element={<PasswordSetup />} />
        <Route path="email-check" element={<EmailCheck />} />
        <Route path="confirm-code" element={<ConfirmationCode />} />
        <Route path="select-retailer" element={<SelectRetailer />} />
        <Route path="retailers-id" element={<SetLoyaltyId />} />
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
      <Route path="rewards-wallet">
        <Route index element={<RewardsWallet />} />
        <Route path="rewards" element={<Coupons />} />
        <Route path="landing" element={<CouponLanding />} />
      </Route>
      <Route path="scan-loyalty-card" element={<ScanLoyalty />} />
    </Routes>
  )
}
