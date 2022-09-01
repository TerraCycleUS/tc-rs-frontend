import React from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin'
import { useSelector } from 'react-redux'
import DataProvider from '../../components/ForAdminPanel/DataProvider'
import CouponList from '../../components/ForAdminPanel/CouponList'
import CategoryList from '../../components/ForAdminPanel/CategoryList'
import Dashboard from '../../components/ForAdminPanel/Dashboard'
import AuthProvider from '../../components/ForAdminPanel/AuthProvider'

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
      <Resource name="coupon" list={CouponList} />
      <Resource name="category" list={CategoryList} />
    </Admin>
  )
}
