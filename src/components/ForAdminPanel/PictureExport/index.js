import React, { useEffect, useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import '@coreui/coreui/scss/coreui-utilities.scss'
import '../Dashboard/_dashboard.scss'
import '../Reporting/_reporting.scss'
import { Button, Link } from '@mui/material'
import 'react-day-picker/dist/style.css'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import http from '../../../utils/http'
import useApiCall from '../../../utils/useApiCall'

export default function PictureExport() {
  const getUserExport = useApiCall()
  const location = useLocation()
  const [fileName] = useState(queryString.parse(location.search))
  const [file, setFile] = useState()
  const [wasClicked, setWasClicked] = useState(false)
  function generateUserExport() {
    getUserExport(
      () => http.get('/api/admin/export/generateUserExport'),
      () => {
        setWasClicked(true)
      },
      null,
      null,
    )
  }

  function generateLink() {
    if (!file) return null
    return window.URL.createObjectURL(file)
  }

  useEffect(() => {
    if (fileName) getZip()
  }, [fileName])

  function getZip() {
    getUserExport(
      () =>
        http.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/file/download/${fileName}`,
          {
            responseType: 'blob',
          },
        ),
      (response) => {
        setFile(response.data)
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
          href={generateLink()}
          target="_blank"
          underline="none"
          disabled={!fileName}
          sx={{ marginLeft: '15px' }}
        >
          {fileName ? 'Click to download' : 'No report'}
        </Link>
        {wasClicked && (
          <p>You will get an email when file will finish to generate</p>
        )}
      </CCol>
    </CRow>
  )
}
