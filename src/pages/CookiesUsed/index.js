import React, { useEffect } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import Page from '../../Layouts/Page'
import classes from './CookiesUsed.module.scss'

export default function CookiesUsed() {
  // helps OneTrust to render
  // in Single Page Applications
  useEffect(() => {
    window?.OneTrust?.initializeCookiePolicyHtml(true)
    window?.OneTrust?.ToggleInfoDisplay()
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
