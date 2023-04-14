import React from 'react'
import { CRow, CCol } from '@coreui/react'
import '@coreui/coreui/scss/coreui-utilities.scss'
import '../Dashboard/_dashboard.scss'
import '../Reporting/_reporting.scss'
import { Button } from '@mui/material'
import 'react-day-picker/dist/style.css'
import { useNotify } from 'react-admin'
import http from '../../../utils/http'
import useApiCall from '../../../utils/useApiCall'

export default function PictureExport() {
  const getUserExport = useApiCall()
  const notify = useNotify()
  function generateUserExport() {
    getUserExport(
      () => http.get('/api/admin/export/generateUserExport'),
      (response) => {
        notify(response.data)
      },
      null,
      null,
    )
  }

  return (
    <CRow className="dashBoardContainer">
      <CCol sm={12}>
        <h2 className="admin-heading">Picture export:</h2>
        <Button
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
          variant="contained"
          onClick={() => generateUserExport()}
        >
          Generate user export
        </Button>
      </CCol>
    </CRow>
  )
}
