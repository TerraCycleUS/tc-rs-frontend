import React from 'react'
import { Link } from 'react-router-dom'
import Page from '../../Layouts/Page'

export default function Home() {
  return (
    <Page title="Home">
      <Link to="/registration">Registration</Link>
    </Page>
  )
}
