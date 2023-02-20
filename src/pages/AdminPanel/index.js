import React from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin'
import { useSelector } from 'react-redux'
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
import CategoryEdit from '../../components/ForAdminPanel/Category/CategoryEdit'

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
    >
      <Resource name="coupon" list={CouponList} edit={CouponEdit} />
      {/* commented until admin requests for categories created */}
      <Resource name="category" list={CategoryList} edit={CategoryEdit} />
      <Resource name="user" list={UserList} edit={UserEdit} />
      <Resource name="page" list={PageList} edit={PageEdit} />
      <Resource
        name="retailer"
        list={RetailerList}
        edit={RetailerEdit}
        create={RetailerCreate}
      />
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
