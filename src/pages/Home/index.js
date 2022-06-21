import React from 'react'
import { Link } from 'react-router-dom'
import Page from '../../Layouts/Page'

export default function Home() {
  return (
    <Page title="Home">
      <Link to="/registration">Registration</Link>
      <Link to="/registration/pw-setup">Password setup</Link>
      <Link to="/registration/email-check">Email check</Link>
      <Link to="/registration/confirm-code">Confirm code</Link>
    </Page>
  )
}
