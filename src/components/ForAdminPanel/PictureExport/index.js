import React, { useState } from 'react'
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
  const [wasClicked, setWasClicked] = useState(false)
  const notify = useNotify()
  function generateUserExport() {
    setWasClicked(true)
    getUserExport(
      () => http.get('/api/admin/export/generateUserExport'),
      null,
      (error) => {
        notify(error?.response?.data?.message || 'Error')
      },
      null,
      { retry: false, message: false },
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
          disabled={wasClicked}
          onClick={() => generateUserExport()}
        >
          Generate user export
        </Button>
        {wasClicked && (
          <p className="instructions">
            The export is being generated, you will receive an email with the
            link once it is ready.
          </p>
        )}
      </CCol>
    </CRow>
  )
}
