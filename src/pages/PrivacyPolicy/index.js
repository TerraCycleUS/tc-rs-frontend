import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'

export default function PrivacyPolicy() {
  const [pageContent, setPageContent] = useState()
  const getContentApiCall = useApiCall()
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const { language } =
    { language: user?.lang } || queryString.parse(location.search)

  useEffect(() => {
    getContentApiCall(
      () => http.get(`/api/page/1?lang=${language}`),
      (response) => {
        setPageContent(response.data)
      },
      null,
      null,
      { message: false },
    )
  }, [])

  return (
    <Page>
      <p className="my-text textPrimary">{pageContent?.body}</p>
    </Page>
  )
}
