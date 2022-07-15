import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Loader } from '@googlemaps/js-api-loader'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { PopContainer, PopWrapper } from '../../components/PopUps/GenericPop'
import Button from '../../components/Button'
import Text, { H2 } from '../../components/Text'

function getPosition(options) {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

function loadMap(loader, node, options) {
  return loader.load().then((google) => new google.maps.Map(node, options))
}

async function getMap({ setErrorPopup, node }) {
  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
  })

  const options = {
    center: {
      lat: 48.8566,
      lng: 2.3522,
    },
    zoom: 15,
  }

  try {
    const currentPosition = await getPosition({ enableHighAccuracy: true })
    const { latitude, longitude } = currentPosition.coords
    options.center = {
      lat: latitude,
      lng: longitude,
    }
  } catch (err) {
    if (err instanceof window.GeolocationPositionError) {
      setErrorPopup(true)
    }
  }

  const map = await loadMap(loader, node, options)

  return map
}

async function init({ setErrorPopup, node }) {
  const map = await getMap({ setErrorPopup, node })
  return map
}

export default function MapPage() {
  const [errorPopup, setErrorPopup] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const domRef = React.useRef()

  React.useEffect(() => {
    init({ setErrorPopup, node: domRef.current })
      .then(console.log)
      .finally(() => setLoading(false))
  }, [])

  return (
    <Wrapper>
      {loading ? <H2>Loading...</H2> : null}
      <div id="map" ref={domRef}></div>
      {errorPopup ? <ErrorPopup onClick={() => setErrorPopup(false)} /> : null}
    </Wrapper>
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

const Wrapper = styled.div`
  height: 100%;

  #map {
    height: 100%;
  }
`

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
