import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { PopContainer, PopWrapper } from '../../components/PopUps/GenericPop'
import Button from '../../components/Button'
import Text, { H2 } from '../../components/Text'
import detectIos from '../../utils/detectIos'

export default function ErrorPopup({ onClick }) {
  const isIos = detectIos()
  return (
    <PopWrapper>
      <PopupContainer className="popup-container">
        <H2 className="title">
          <FormattedMessage
            id="map:ErrorPopupTitle"
            defaultMessage="Location disabled"
          />
        </H2>
        <Text className="description text-center">
          <FormattedMessage
            id="map:ErrorPopupDescription"
            defaultMessage="Enables your location settings to find your nearest drop-off point."
          />
        </Text>
        {isIos && (
          <>
            <Text className="instructions text-center">
              <FormattedMessage
                id="map:IosSettings1"
                defaultMessage="Settings > Privacy > Location Services"
              />
            </Text>
            <Text className="instructions text-center">
              <FormattedMessage
                id="map:IosSettings2"
                defaultMessage="Settings > Privacy > Location Services"
              />
            </Text>
            <Text className="instructions text-center">
              <FormattedMessage
                id="map:IosSettings3"
                defaultMessage="Settings > Privacy > Location Services"
              />
            </Text>
          </>
        )}
        <Button onClick={onClick}>
          <FormattedMessage
            id="map:ErrorPopupButton"
            defaultMessage="Continue"
          />
        </Button>
      </PopupContainer>
    </PopWrapper>
  )
}

ErrorPopup.propTypes = {
  onClick: PropTypes.func,
}

const PopupContainer = styled(PopContainer)`
  padding-top: 40px;
  padding-bottom: 30px;

  .title {
    margin-bottom: 18px;
  }

  .description {
    margin-bottom: 30px;
  }

  .instructions {
    margin-bottom: 10px;
  }
`
