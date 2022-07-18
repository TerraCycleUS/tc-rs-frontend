import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import markerUrl from '../../assets/icons/map-marker.svg'

import { H2 } from '../../components/Text'
import FooterNav from '../../components/FooterNav'
import init from './mapUtils'
import ErrorPopup from './ErrorPopup'

// function addMarker(google, map, marker) {
//   return new google.maps.Marker({
//     position: marker.position,
//     icon: marker.icon,
//     map: map,
//   });
// }

export default function MapPage() {
  const [errorPopup, setErrorPopup] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const watchIdRef = React.useRef(-1)
  const domRef = React.useRef()
  const userMarkerRef = React.useRef()

  React.useEffect(() => {
    init({
      setErrorPopup,
      node: domRef.current,
      userMarkerNode: userMarkerRef.current,
      watchIdRef,
    })
      .then(() => {})
      .finally(() => setLoading(false))

    return () => navigator.geolocation.clearWatch(watchIdRef.current)
  }, [])

  return (
    <Wrapper>
      {loading ? <H2 className="loading">Loading...</H2> : null}
      <div id="map" ref={domRef}></div>
      <div
        id="user"
        ref={userMarkerRef}
        className="d-flex justify-content-center align-items-center"
      ></div>
      {errorPopup ? <ErrorPopup onClick={() => setErrorPopup(false)} /> : null}
      <FooterNav />
    </Wrapper>
  )
}

ErrorPopup.propTypes = {
  onClick: PropTypes.func,
}

const Wrapper = styled.div`
  height: 100%;
  background-color: #f4f4f4;

  .footer-nav-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  #map {
    height: 100%;
  }

  // .map-popup-bubble {
  //   background-color: rgba(169, 222, 152, 0.4);
  //   border-radius: 50%;
  //   width: 48px;
  //   height: 48px;
  //   box-sizing: content-box;

  //   &::before {
  //     content: '';
  //     width: 16px;
  //     height: 16px;
  //     background-color: ${({ theme }) => theme.terraGreen};
  //     border-radius: 50%;
  //   }
  // }
  // .map-popup-container {
  //   cursor: auto;
  //   position: absolute;
  // }

  .map-popup-bubble {
    /* Position the bubble centred-above its parent. */
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -100%);
    /* Style the bubble. */
    background-color: white;
    padding: 5px;
    border-radius: 5px;
    font-family: sans-serif;
    overflow-y: auto;
    max-height: 60px;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.5);
  }

  /* The parent of the bubble. A zero-height div at the top of the tip. */
  .map-popup-bubble-anchor {
    /* Position the div a fixed distance above the tip. */
    position: absolute;
    width: 100%;
    bottom: 8px;
    left: 0;
  }

  /* This element draws the tip. */
  .map-popup-bubble-anchor::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    /* Center the tip horizontally. */
    transform: translate(-50%, 0);
    /* The tip is a https://css-tricks.com/snippets/css/css-triangle/ */
    width: 0;
    height: 0;
    /* The tip is 8px high, and 12px wide. */
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid white;
  }

  /* JavaScript will position this div at the bottom of the popup tip. */
  .map-popup-container {
    cursor: auto;
    height: 0;
    position: absolute;
    /* The max width of the info window. */
    width: 200px;
  }
`
