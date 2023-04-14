import React, { useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import '@coreui/coreui/scss/coreui-utilities.scss'
import '../Dashboard/_dashboard.scss'
import '../Reporting/_reporting.scss'
import { Button, Link } from '@mui/material'
import 'react-day-picker/dist/style.css'
import http from '../../../utils/http'
import useApiCall from '../../../utils/useApiCall'

export default function PictureExport() {
  const getUserExport = useApiCall()
  const [fileName, setFileName] = useState()
  function generateUserExport() {
    getUserExport(
      () => http.get('/api/admin/export/generateUserExport'),
      (response) => {
        setFileName(response.data)
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
        <Link
          variant="button"
          href={`${process.env.REACT_APP_SERVER_API_URL}/api/file/download/${fileName}`}
          target="_blank"
          underline="none"
          disabled={!fileName}
          sx={{ marginLeft: '15px' }}
        >
          {fileName ? 'Click to download' : 'No report'}
        </Link>
      </CCol>
    </CRow>
  )
}
