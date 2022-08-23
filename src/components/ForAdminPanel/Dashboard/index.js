import * as React from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import '@coreui/coreui/scss/coreui-utilities.scss'
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
