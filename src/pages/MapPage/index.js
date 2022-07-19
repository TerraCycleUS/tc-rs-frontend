import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import markerUrl from '../../assets/icons/map-marker.svg'

import { useSelector } from 'react-redux'
import { H2 } from '../../components/Text'
import FooterNav from '../../components/FooterNav'
import init from './mapUtils'
import ErrorPopup from './ErrorPopup'
import http from '../../utils/http'
import LocationSearch from '../../components/LocationSearch'
import MapPointList from '../MapPointList'

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
  const [locations, setLocation] = useState([])
  const [showList, setShowList] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const user = useSelector((state) => state.user)

  const config = {
    headers: {
      Authorization: `Bearer ${user.authorization}`,
    },
  }
  useEffect(() => {
    http
      .get('/api/map-items', config)
      .then((response) => {
        setLocation(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
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

  function renderList() {
    if (showList) {
      return (
        <MapPointList
          locations={locations}
          searchValue={searchValue}
          className="point-list"
        />
      )
    }
    return ''
  }

  return (
    <Wrapper>
      {loading ? <H2 className="loading">Loading...</H2> : null}
      <div id="map" ref={domRef}></div>
      <LocationSearch
        className="search-bar"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        focused={showList}
        setFocus={setShowList}
      />
      <div
        id="user"
        ref={userMarkerRef}
        className="d-flex justify-content-center align-items-center"
      ></div>
      {errorPopup ? <ErrorPopup onClick={() => setErrorPopup(false)} /> : null}
      {renderList()}
      <FooterNav className="map-footer" />
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

  .search-bar {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 0;
    z-index: 18;
    width: calc(100% - 30px);
  }

  .point-list {
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    z-index: 17;
  }

  .map-footer {
    z-index: 16;
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

  .map-popup-bubble {
    position: absolute;
    top: -24px;
    left: -24px;
    background-color: rgba(169, 222, 152, 0.4);
    border-radius: 50%;
    box-sizing: content-box;
    width: 48px;
    height: 48px;

    &::after {
      content: '';
      background-color: ${({ theme }) => theme.terraGreen};
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: block;
    }
  }

  .map-popup-bubble-anchor {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }

  .map-popup-container {
    cursor: auto;
    height: 0;
    position: absolute;
    /* The max width of the info window. */
    width: 200px;
  }
`
