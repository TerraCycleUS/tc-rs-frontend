import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import PropTypes from 'prop-types'
import { ReactComponent as GooglePlus } from '../../assets/icons/google-plus.svg'
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg'
import LogInButton from '../Button/LoginButton'
import Text from '../Text'
import { fbLoginUrl, googleLoginUrl } from '../../utils/socialLoginUrl'

export default function SocialLogin({ language }) {
  return (
    <Wrapper>
      <Text className="text-center">
        <FormattedMessage
          id="signUp:SocialLogin"
          defaultMessage="or use your social account for log in:"
        />
      </Text>
      <div className="buttons-row">
        <LogInButton className="google" as="a" href={googleLoginUrl(language)}>
          <GooglePlus />
        </LogInButton>
        <LogInButton className="facebook" as="a" href={fbLoginUrl(language)}>
          <Facebook />
        </LogInButton>
      </div>
    </Wrapper>
  )
}

SocialLogin.propTypes = {
  language: PropTypes.string,
}

const Wrapper = styled.div`
  .buttons-row {
    margin-top: 10px;
    display: flex;
    justify-content: center;

    .google {
      background-color: #f06552;
      margin-right: 30px;
    }

    .facebook {
      background-color: #4267b2;
    }
  }
`
