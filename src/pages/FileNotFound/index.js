import React from 'react'
import classNames from 'classnames'
import Page from '../../Layouts/Page'
import classes from './FileNotFound.module.scss'

export default function FileNotFound() {
  return (
    <Page className={classes.wrapper} innerClassName={classes.innerContainer}>
      <p className={classes.number}>404</p>
      <h2 className={classNames(classes.text, 'my-text-h2')}>File not found</h2>
    </Page>
  )
}
