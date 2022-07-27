import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import classes from './DropButton.module.scss'
import Button from '../Button'

export default function DropButton({ drop }) {
  return (
    <div className={classes.dropWrapper}>
      <Button className={classes.dropButton} onClick={drop}>
        <FormattedMessage
          id="dropButton:DropNow"
          defaultMessage="Drop-off now"
        />
      </Button>
    </div>
  )
}

DropButton.propTypes = {
  drop: PropTypes.func,
}
