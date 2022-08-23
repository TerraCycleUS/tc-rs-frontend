import * as React from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import './_dashboard.scss'

export default function Dashboard() {
  return (
    <CRow className="dashBoardContainer">
      <CCol sm={4}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={<>0</>}
          title="Registered users"
        />
      </CCol>
      <CCol sm={4}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={<>0</>}
          title="Coupons redeemed"
        />
      </CCol>
      <CCol sm={4}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={<>0</>}
          title="Products scanned"
        />
      </CCol>
    </CRow>
  )
}
