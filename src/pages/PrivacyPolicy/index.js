import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'
import classes from './PrivacyPolicy.module.scss'

export default function PrivacyPolicy() {
  const [pageContent, setPageContent] = useState()
  const getContentApiCall = useApiCall()
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const { language } = user?.lang
    ? { language: user?.lang }
    : queryString.parse(location.search)

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

  useEffect(() => {
    window.OneTrust?.initializeCookiePolicyHtml()
  }, [])

  return (
    <Page>
      {pageContent ? (
        <div
          className="default-font"
          dangerouslySetInnerHTML={{ __html: pageContent.body }}
        />
      ) : null}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="ot-sdk-show-settings">Cookies Settings</a>
      <Link className={classes.cookieList} to="/profile/privacy/cookie-list">
        Cookies used
      </Link>
    </Page>
  )
}
