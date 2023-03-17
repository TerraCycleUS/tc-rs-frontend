import React, { useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import '@coreui/coreui/scss/coreui-utilities.scss'
import '../Dashboard/_dashboard.scss'
import './_reporting.scss'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import { Button, Link } from '@mui/material'
// import http from '../../../utils/http'
// import useApiCall from '../../../utils/useApiCall'
import 'react-day-picker/dist/style.css'

export default function Reporting() {
  // const getReportFIle = useApiCall()
  const [date, setDate] = useState()
  const [file, setFile] = useState()

  let footer = <p>Please pick date interval.</p>
  if (date?.to && date?.from) {
    footer = (
      <p>
        You picked from {format(date?.from, 'PP')} to {format(date?.to, 'PP')}.
      </p>
    )
  }

  return (
    <CRow className="dashBoardContainer">
      <CCol sm={12}>
        <h2 className="admin-heading">Reporting:</h2>
        <p className="admin-description">
          Please choose a date range in order to generate report
        </p>
        <DayPicker
          captionLayout="dropdown"
          mode="range"
          selected={date}
          onSelect={setDate}
          footer={footer}
        />
        <Button
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
          disabled={!date?.to || !date?.from}
          variant="contained"
          onClick={() =>
            setFile(
              'https://east-fruit.com/wp-content/uploads/2020/08/25a81692c9b41a9f4214a3db411586c6.jpg',
            )
          }
        >
          Generate report
        </Button>

        <Link
          variant="button"
          href={file}
          download="Report"
          underline="none"
          disabled={!file}
          sx={{ marginLeft: '15px' }}
        >
          {file ? 'Click to download' : 'No report'}
        </Link>
      </CCol>
    </CRow>
  )
}
