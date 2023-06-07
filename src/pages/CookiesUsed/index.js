import React, { useEffect } from 'react'
import Page from '../../Layouts/Page'

export default function CookiesUsed() {
  // helps OneTrust to render
  // in Single Page Applications
  useEffect(() => {
    window?.OneTrust?.initializeCookiePolicyHtml(true)
  }, [])

  return (
    <Page>
      <div id="ot-sdk-cookie-policy"></div>
    </Page>
  )
}
