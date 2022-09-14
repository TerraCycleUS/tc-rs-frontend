import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import Button from '../../Button'
import classes from '../ApiError/ApiError.module.scss'
import apiErrorImageUrl from '../../../assets/images/api-error.svg'
import { fbLoginUrl, googleLoginUrl } from '../../../utils/socialLoginUrl'
import { detectLanguage } from '../../../utils/intl'

export default function SocialLoginError({ type, onClose }) {
  const lang = detectLanguage()

  function retry() {
    let url = '/'
    if (type === 'google') {
      url = googleLoginUrl(lang)
    }

    if (type === 'fb') {
      url = fbLoginUrl(lang)
    }

    window.location.href = url
  }

  return (
    <PopWrapper className={classes.wrapper}>
      <PopContainer className={classes.container}>
        <Xmark onClick={onClose} className="close-btn" />
        <h3 className={classNames(classes.heading, 'my-color-textBlack')}>
          <FormattedMessage
            id="socialLoginError:Title"
            defaultMessage="Oops, Sorry!"
          />
        </h3>
        <img src={apiErrorImageUrl} alt="api error" className="d-block" />
        <p className="my-text my-color-textPrimary text-center">
          <FormattedMessage
            id="socialLoginError:Desc1"
            defaultMessage="Something went wrong. Please try to Sign In with {provider} again."
            values={{
              provider: type === 'fb' ? 'Facebook' : 'Google',
            }}
          />
        </p>
        <Button className={classes.retry} onClick={retry}>
          <FormattedMessage
            id="socialLoginError:Retry"
            defaultMessage="Try again"
          />
        </Button>
      </PopContainer>
    </PopWrapper>
  )
}

SocialLoginError.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}
