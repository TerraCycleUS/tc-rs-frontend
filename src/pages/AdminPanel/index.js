import React from 'react'
import { Admin, Resource, fetchUtils, CustomRoutes } from 'react-admin'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import DataProvider from '../../components/ForAdminPanel/DataProvider'
import Dashboard from '../../components/ForAdminPanel/Dashboard'
import AuthProvider from '../../components/ForAdminPanel/AuthProvider'
import UserList from '../../components/ForAdminPanel/User/UserList'
import UserEdit from '../../components/ForAdminPanel/User/UserEdit'
import CouponList from '../../components/ForAdminPanel/Coupon/CouponList'
import CouponEdit from '../../components/ForAdminPanel/Coupon/CouponEdit'
import RetailerList from '../../components/ForAdminPanel/Retailer/RetailerList'
import RetailerEdit from '../../components/ForAdminPanel/Retailer/RetailerEdit'
import RetailerCreate from '../../components/ForAdminPanel/Retailer/RetailerCreate'
import PageEdit from '../../components/ForAdminPanel/StaticPage/PageEdit'
import PageList from '../../components/ForAdminPanel/StaticPage/PageList'
import CustomLayout from '../../components/ForAdminPanel/CustomLayout'
import useLanguageContext, { LangProvider } from '../../context/adminLang'
import CategoryList from '../../components/ForAdminPanel/Category/CategoryList'
import BrandList from '../../components/ForAdminPanel/Brands/BrandList'
import Reporting from '../../components/ForAdminPanel/Reporting'
import LogList from '../../components/ForAdminPanel/Log/LogList'
import CustomLoginPage from '../../components/ForAdminPanel/CustomLogin'
import SetupTwoFactor from '../../components/ForAdminPanel/SetupTwoFactor'

function AdminPanelComponent() {
  const user = useSelector((state) => state.user)
  const [language, setLanguage] = useLanguageContext()
  const httpClient = (url, options = {}) => {
    if (!options.headers) {
      // eslint-disable-next-line no-param-reassign
      options.headers = new Headers({ Accept: 'application/json' })
    }
    options.headers.set('Authorization', `Bearer ${user?.authorization}`)
    return fetchUtils.fetchJson(url, options)
  }
  const dataProvider = DataProvider(
    httpClient,
    language.value,
    user?.authorization,
  )

  return (
    <Admin
      dashboard={Dashboard}
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={AuthProvider}
      layout={(props) => (
        <CustomLayout
          other={{ ...props }}
          language={language}
          setLanguage={setLanguage}
        />
      )}
      loginPage={CustomLoginPage}
    >
      <Resource name="coupon" list={CouponList} edit={CouponEdit} />
      <Resource name="brand" list={BrandList} />
      <Resource name="category" list={CategoryList} />
      <Resource name="user" list={UserList} edit={UserEdit} />
      <Resource name="page" list={PageList} edit={PageEdit} />
      <Resource
        name="retailer"
        list={RetailerList}
        edit={RetailerEdit}
        create={RetailerCreate}
      />
      <Resource name="log" list={LogList} />
      <CustomRoutes>
        <Route
          path="/reporting"
          element={<Reporting language={language.value} />}
        />
      </CustomRoutes>
      <CustomRoutes noLayout>
        <Route path="/setup-two-factor" element={<SetupTwoFactor />} />
      </CustomRoutes>
    </Admin>
  )
}

export default function AdminPanel() {
  return (
    <LangProvider>
      <AdminPanelComponent />
    </LangProvider>
  )
}
