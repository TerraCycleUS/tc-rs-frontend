import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import Page from '../../Layouts/Page'
import Button from '../../components/Button'
import CameraView from '../../components/CameraView'
import classes from './ScanItem.module.scss'

export default function ScanItem() {
  const user = useSelector((state) => state.user)

  function getNextRoute() {
    if (!user) return '/registration'
    return '../save-item'
  }

  return (
    <Page className={classes.animated}>
      <div className="d-flex flex-column align-items-center position-relative">
        <CameraView goTo="../take-photo" />
        <p
          className={classNames(
            classes.description,
            'text-center',
            'my-color-textBlack',
            'my-text',
          )}
        >
          <FormattedMessage
            id="scanItem:Description"
            defaultMessage="Please choose from the following options to provide details of your item:"
          />
        </p>
        <Link
          className={classNames(classes.barCode, 'w-100')}
          to="../camera-scan"
        >
          <Button>
            <FormattedMessage
              id="scanItem:BarCode"
              defaultMessage="Bar code scan"
            />
          </Button>
        </Link>

        <Link className="manual w-100" to={getNextRoute()}>
          <Button inverted>
            <FormattedMessage
              id="scanItem:Manual"
              defaultMessage="Manual setup"
            />
          </Button>
        </Link>
      </div>
    </Page>
  )
}
