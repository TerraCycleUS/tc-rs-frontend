import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import PropTypes from 'prop-types'
import { ReactComponent as GooglePlus } from '../../assets/icons/google-plus.svg'
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg'
import LogInButton from '../Button/LoginButton'
import Text from '../Text'

export default function SocialLogin({ language }) {
  const state = {
    lang: language,
  }
  return (
    <Wrapper>
      <Text className="text-center">
        <FormattedMessage
          id="signUp:SocialLogin"
          defaultMessage="or use your social account for log in:"
        />
      </Text>
      <div className="buttons-row">
        <LogInButton
          className="google"
          as="a"
          href={`${process.env.REACT_APP_SERVER_API_URL}/api/auth/google/auth?lang=${language}`}
        >
          <GooglePlus/>
        </LogInButton>
        <LogInButton
          className="facebook"
          as="a"
          href={`https://www.facebook.com/v14.0/dialog/oauth?scope=email,public_profile&state=${JSON.stringify(state)}&client_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&redirect_uri=${process.env.REACT_APP_SERVER_API_URL}/api/auth/facebook/code`}
        >
          <Facebook/>
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
