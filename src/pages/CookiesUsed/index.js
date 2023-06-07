import React, { useEffect } from 'react'
import Page from '../../Layouts/Page'

export default function CookiesUsed() {
  // helps OneTrust to render
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    typeof window.OneTrust !== 'undefined' &&
      window.OneTrust.initializeCookiePolicyHtml(true)
  }, [])

  return (
    <Page>
      <div id="ot-sdk-cookie-policy"></div>
    </Page>
  )
}
