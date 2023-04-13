import React from 'react'
import { CRow, CCol } from '@coreui/react'
import '@coreui/coreui/scss/coreui-utilities.scss'
import '../Dashboard/_dashboard.scss'
import '../Reporting/_reporting.scss'
import { Button, Link } from '@mui/material'
import 'react-day-picker/dist/style.css'

export default function PictureExport() {
  function generateLink(file) {
    if (!file) return null
    return window.URL.createObjectURL(file)
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
        >
          Generate report
        </Button>

        <Link
          variant="button"
          href={generateLink()}
          target="_blank"
          download="Report.xlsx"
          underline="none"
          sx={{ marginLeft: '15px' }}
        >
          Click to download
        </Link>
      </CCol>
    </CRow>
  )
}
