import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'

export default function PrivacyPolicy() {
  const [pageContent, setPageContent] = useState()
  const getContentApiCall = useApiCall()
  const user = useSelector((state) => state.user)

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  useEffect(() => {
    getContentApiCall(
      () => http.get('/api/page/1', config),
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
