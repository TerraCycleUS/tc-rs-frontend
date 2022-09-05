import React, { useState } from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin'
import { useSelector } from 'react-redux'
import DataProvider from '../../components/ForAdminPanel/DataProvider'
import Dashboard from '../../components/ForAdminPanel/Dashboard'
import AuthProvider from '../../components/ForAdminPanel/AuthProvider'
import UserList from '../../components/ForAdminPanel/User/UserList'
import UserEdit from '../../components/ForAdminPanel/User/UserEdit'
import CouponList from '../../components/ForAdminPanel/Coupon/CouponList'
import CouponEdit from '../../components/ForAdminPanel/Coupon/CouponEdit'
import CustomLayout from '../../components/ForAdminPanel/CustomLayout'

import PageEdit from '../../components/ForAdminPanel/StaticPage/PageEdit'
import PageList from '../../components/ForAdminPanel/StaticPage/PageList'

const languages = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
]

export default function AdminPanel() {
  const user = useSelector((state) => state.user)
  const [language, setLanguage] = useState(
    languages.find((lang) => lang.value === user.lang),
  )

  const httpClient = (url, options = {}) => {
    if (!options.headers) {
      // eslint-disable-next-line no-param-reassign
      options.headers = new Headers({ Accept: 'application/json' })
    }
    options.headers.set('Authorization', `Bearer ${user?.authorization}`)
    return fetchUtils.fetchJson(url, options)
  }
  const dataProvider = DataProvider(httpClient, language.value)

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
      {/* <Resource name="category" list={CategoryList} edit={CategoryEdit} /> */}
      <Resource name="user" list={UserList} edit={UserEdit} />
      <Resource name="page" list={PageList} edit={PageEdit} />
    </Admin>
  )
}
