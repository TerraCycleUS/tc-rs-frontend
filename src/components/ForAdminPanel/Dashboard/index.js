import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import '@coreui/coreui/scss/coreui-utilities.scss'
import './_dashboard.scss'
import CircularProgress from '@mui/material/CircularProgress'
import http from '../../../utils/http'
import useApiCall from '../../../utils/useApiCall'
import 'react-day-picker/dist/style.css'

export default function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState()
  const getDashboardDataApiCall = useApiCall()

  function getData() {
    return getDashboardDataApiCall(
      () => http.get('/api/admin/dashboard-info'),
      (response) => {
        setDashboardInfo(response.data)
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {dashboardInfo ? (
        <>
          <CRow className="dashBoardContainer">
            <CCol sm={4}>
              <CWidgetStatsA
                className="mb-4"
                color="primary"
                value={
                  <div className="fs-4 fw-semibold">
                    {dashboardInfo.userCounter}
                  </div>
                }
                title="Registered users"
              />
            </CCol>
            <CCol sm={4}>
              <CWidgetStatsA
                className="mb-4"
                color="info"
                value={
                  <div className="fs-4 fw-semibold">
                    {dashboardInfo.unlockedCouponCounter}
                  </div>
                }
                title="Coupons unlocked"
              />
            </CCol>
            <CCol sm={4}>
              <CWidgetStatsA
                className="mb-4"
                color="warning"
                value={
                  <div className="fs-4 fw-semibold">
                    {dashboardInfo.productCounter}
                  </div>
                }
                title="Products scanned"
              />
            </CCol>
          </CRow>
          <CRow className="dashBoardContainer">
            <CCol sm={4}>
              <CWidgetStatsA
                className="mb-4"
                color="danger"
                value={
                  <div className="fs-4 fw-semibold">
                    {dashboardInfo.droppedProductCounter}
                  </div>
                }
                title="Items dropped"
              />
            </CCol>
            <CCol sm={4}>
              <CWidgetStatsA
                className="mb-4"
                color="dark"
                value={
                  <div className="fs-4 fw-semibold">
                    {dashboardInfo.exchangedProductCounter}
                  </div>
                }
                title="Items exchanged"
              />
            </CCol>
          </CRow>
        </>
      ) : (
        <div className="loaderWrapper">
          <CircularProgress />
        </div>
      )}
    </>
  )
}
