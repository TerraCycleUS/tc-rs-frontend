import React from 'react'
import Page from '../../Layouts/Page'
import { ReactComponent as RecycleSave } from '../../assets/icons/recycle-save.svg'
import classes from './Tutorial.module.scss'

export default function Tutorial() {
  return (
    <Page>
      <RecycleSave className={classes.icon} />
      <div className={classes.stepsContainer}>
        <div className={classes.step}>
          <h3 className={classes.stepTitle}>Scan your items</h3>
          <p className={classes.stepText}>
            Scan accepted products and packaging to save them in your recycling
            bin.
          </p>
        </div>
        <div className={classes.step}>
          <h3 className={classes.stepTitle}>Drop them off</h3>
          <p className={classes.stepText}>
            Find your local Monoprix and drop off your scanned products and
            packaging at the dedicated recycling point.
          </p>
        </div>
        <div className={classes.step}>
          <h3 className={classes.stepTitle}>Get Rewards</h3>
          <p className={classes.stepText}>
            The more you recycle, the more rewards you will earn.
          </p>
        </div>
      </div>
    </Page>
  )
}
