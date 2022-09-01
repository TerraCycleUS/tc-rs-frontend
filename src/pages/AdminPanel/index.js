import React from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin'
import { useSelector } from 'react-redux'
import DataProvider from '../../components/ForAdminPanel/DataProvider'
import Dashboard from '../../components/ForAdminPanel/Dashboard'
import AuthProvider from '../../components/ForAdminPanel/AuthProvider'
import UserList from '../../components/ForAdminPanel/User/UserList'
import UserEdit from '../../components/ForAdminPanel/User/UserEdit'

export default function AdminPanel() {
  const user = useSelector((state) => state.user)
  const httpClient = (url, options = {}) => {
    if (!options.headers) {
      // eslint-disable-next-line no-param-reassign
      options.headers = new Headers({ Accept: 'application/json' })
    }
    options.headers.set('Authorization', `Bearer ${user?.authorization}`)
    return fetchUtils.fetchJson(url, options)
  }
  const dataProvider = DataProvider(httpClient)

  return (
    <Admin
      dashboard={Dashboard}
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={AuthProvider}
    >
      {/* commented until admin requests for coupons and categories created */}
      {/* <Resource name="coupon" list={CouponList} edit={CouponEdit} /> */}
      {/* <Resource name="category" list={CategoryList} edit={CategoryEdit} /> */}
      <Resource name="user" list={UserList} edit={UserEdit} />
    </Admin>
  )
}
