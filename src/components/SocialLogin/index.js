import React from 'react'
import { FormattedMessage } from 'react-intl'

import PropTypes from 'prop-types'
import { ReactComponent as GooglePlus } from '../../assets/icons/google-plus.svg'
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg'
import LogInButton from '../Button/LoginButton'
import Text from '../Text'
import { fbLoginUrl, googleLoginUrl } from '../../utils/socialLoginUrl'
import classes from './SocialLogin.module.scss'

export default function SocialLogin({ language }) {
  return (
    <div className={classes.wrapper}>
      <Text className="text-center">
        <FormattedMessage
          id="signUp:SocialLogin"
          defaultMessage="or use your social account for log in:"
        />
      </Text>
      <div className={classes.buttonsRow}>
        <LogInButton className={classes.google} href={googleLoginUrl(language)}>
          <GooglePlus />
        </LogInButton>
        <LogInButton className={classes.facebook} href={fbLoginUrl(language)}>
          <Facebook />
        </LogInButton>
      </div>
    </div>
  )
}

SocialLogin.propTypes = {
  language: PropTypes.string,
}
