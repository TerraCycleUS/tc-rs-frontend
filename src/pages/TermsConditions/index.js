import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'
import { detectLanguage } from '../../utils/intl'

export default function TermsConditions() {
  const [pageContent, setPageContent] = useState()
  const getContentApiCall = useApiCall()
  const user = useSelector((state) => state.user)
  const location = useLocation()

  let lang = user?.lang

  if (!lang) {
    lang = queryString.parse(location.search).language
  }

  if (!lang) {
    lang = detectLanguage()
  }

  useEffect(() => {
    getContentApiCall(
      () => http.get(`/api/page/3?lang=${lang}`),
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
      {pageContent ? (
        <div dangerouslySetInnerHTML={{ __html: pageContent.body }} />
      ) : null}
    </Page>
  )
}
