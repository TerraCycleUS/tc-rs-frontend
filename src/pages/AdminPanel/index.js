import React from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin'
import { useSelector } from 'react-redux'
import DataProvider from '../../components/ForAdminPanel/DataProvider'
import CouponList from '../../components/ForAdminPanel/Coupon/CouponList'
import CategoryList from '../../components/ForAdminPanel/Category/CategoryList'
import Dashboard from '../../components/ForAdminPanel/Dashboard'
import CouponEdit from '../../components/ForAdminPanel/Coupon/CouponEdit'
import CategoryEdit from '../../components/ForAdminPanel/Category/CategoryEdit'

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
    <Admin dashboard={Dashboard} basename="/admin" dataProvider={dataProvider}>
      <Resource name="coupon" list={CouponList} edit={CouponEdit} />
      <Resource name="category" list={CategoryList} edit={CategoryEdit} />
    </Admin>
  )
}
