import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { PopContainer, PopWrapper } from '../GenericPop'
import Button from '../../Button'
import classes from './CameraDenied.module.scss'

export default function CameraDenied({ setShowPop }) {
  return (
    <PopWrapper className="disable-on-enter">
      <PopContainer className={classNames('max400', classes.container)}>
        <h2 className={classes.title}>
          <FormattedMessage
            id="cameraDenied:Denied"
            defaultMessage="Access Denied"
          />
        </h2>
        <p className={classes.text}>
          <FormattedMessage
            id="cameraDenied:Text"
            defaultMessage="Because you haven’t given access to your camera, you cannot scan your item."
          />
        </p>
        <Button onClick={() => setShowPop(false)} className={classes.button}>
          <FormattedMessage
            id="cameraDenied:Continue"
            defaultMessage="Continue"
          />
        </Button>
      </PopContainer>
    </PopWrapper>
  )
}

CameraDenied.propTypes = {
  setShowPop: PropTypes.func,
}
