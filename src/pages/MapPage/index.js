import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { PopContainer, PopWrapper } from '../../components/PopUps/GenericPop'
import Button from '../../components/Button'
import Text, { H2 } from '../../components/Text'

export default function MapPage() {
  const [errorPopup, setErrorPopup] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [currentLocation, setCurrentLocation] = React.useState({})

  React.useEffect(() => {
    window.navigator?.geolocation.getCurrentPosition(
      () => {
        window.navigator.geolocation.watchPosition(setCurrentLocation)
        setLoading(false)
      },
      () => {
        setErrorPopup(true)
        setLoading(false)
      },
    )
  }, [])
  const { latitude, longitude } = currentLocation?.coords || {}
  const content = loading ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <H2>Map</H2>
      <Text>
        Latitude: {latitude}; Longitude: {longitude}
      </Text>
    </>
  )

  return (
    <>
      {content}
      {errorPopup ? <ErrorPopup onClick={() => setErrorPopup(false)} /> : null}
    </>
  )
}

function ErrorPopup({ onClick }) {
  return (
    <PopWrapper>
      <PopupContainer className="popup-container">
        <H2 className="title">
          <FormattedMessage
            id="map:ErrorPopupTitle"
            defaultMessage="Location disabled"
          />
        </H2>
        <Text className="description">
          <FormattedMessage
            id="map:ErrorPopupDescription"
            defaultMessage="Enables your location settings to find your nearest drop-off point."
          />
        </Text>
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
`
