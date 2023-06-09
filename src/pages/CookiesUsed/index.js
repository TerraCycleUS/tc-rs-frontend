import React, { useEffect } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { useLocation } from 'react-router-dom'
import Page from '../../Layouts/Page'
import classes from './CookiesUsed.module.scss'

export default function CookiesUsed() {
  // helps OneTrust to render
  // in Single Page Applications
  const location = useLocation()

  useEffect(() => {
    window?.OneTrust?.initializeCookiePolicyHtml(true)
    if (!location.state?.dontOpenSetting) window?.OneTrust?.ToggleInfoDisplay()
  }, [])

  return (
    <Page>
      <div id="ot-sdk-cookie-policy"></div>
      <button
        className={classNames(classes.manageCookies)}
        type="button"
        onClick={() => window.OneTrust.ToggleInfoDisplay()}
      >
        <FormattedMessage
          id="privacyPolicy:CookieSettings"
          defaultMessage="Manage cookies"
        />
      </button>
    </Page>
  )
}
