import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import '@coreui/coreui/scss/coreui-utilities.scss'
import './_dashboard.scss'
import http from '../../../utils/http'
import useApiCall from '../../../utils/useApiCall'
import 'react-day-picker/dist/style.css'

export default function Dashboard() {
  const [userCounter, setUserCounter] = useState(0)
  const [productCounter, setProductCounter] = useState(0)
  const [unlockedCouponCounter, setUnlockedCouponCounter] = useState(0)
  const getDashboardDataApiCall = useApiCall()

  function getData() {
    return getDashboardDataApiCall(
      () => http.get('/api/admin/dashboard-info'),
      (response) => {
        setUserCounter(response.data?.userCounter)
        setProductCounter(response.data?.productCounter)
        setUnlockedCouponCounter(response.data?.unlockedCouponCounter)
      },
      null,
      null,
      { message: false },
    )
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    document.addEventListener('refresh', getData)

    return () => {
      document.removeEventListener('refresh', getData)
    }
  }, [])

  return (
    <CRow className="dashBoardContainer">
      <CCol sm={4}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={<div className="fs-4 fw-semibold">{userCounter}</div>}
          title="Registered users"
        />
      </CCol>
      <CCol sm={4}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <div className="fs-4 fw-semibold">{unlockedCouponCounter}</div>
          }
          title="Coupons redeemed"
        />
      </CCol>
      <CCol sm={4}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={<div className="fs-4 fw-semibold">{productCounter}</div>}
          title="Products scanned"
        />
      </CCol>
    </CRow>
  )
}
