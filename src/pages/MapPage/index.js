import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import { H2 } from '../../components/Text'
import FooterNav from '../../components/FooterNav'
import init from './mapUtils'
import ErrorPopup from './ErrorPopup'
import LocationSearch from '../../components/LocationSearch'
import MapPointList from '../../components/MapPointList'
import markerUrl from '../../assets/icons/map-marker.svg'
import markerSelectedUrl from '../../assets/icons/marker-selected.svg'
import DetailsPopup from './DetailsPopup'

export default function MapPage() {
  const [errorPopup, setErrorPopup] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [currentItem, setCurrentItem] = React.useState(null)
  const [showDetails, setShowDetails] = React.useState(false)
  const [locations, setLocations] = useState([])
  const [showList, setShowList] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const watchIdRef = React.useRef(-1)
  const domRef = React.useRef()
  const userMarkerRef = React.useRef()
  const mapRef = React.useRef()

  function selectMarker(item) {
    const { lat, lng } = item
    setCurrentItem((prevMarker) => {
      if (item.id === prevMarker?.id) return prevMarker

      item.marker.setIcon(markerSelectedUrl)
      prevMarker?.marker.setIcon(markerUrl)
      return item
    })
    setShowDetails(true)
    mapRef.current.panTo({ lat, lng })
  }

  function resetIcon(marker) {
    marker.marker.setIcon(markerUrl)
  }

  function resetMarker() {
    setCurrentItem((prevMarker) => {
      resetIcon(prevMarker)
      return null
    })
  }

  useEffect(() => {
    init({
      setErrorPopup,
      setLocations,
      node: domRef.current,
      userMarkerNode: userMarkerRef.current,
      watchIdRef,
      onMarkerClick: selectMarker,
    })
      .then((map) => {
        mapRef.current = map
      })
      .finally(() => setLoading(false))

    return () => navigator.geolocation.clearWatch(watchIdRef.current)
  }, [])

  function renderList() {
    if (!showList) return ''
    return (
      <MapPointList
        locations={locations}
        searchValue={searchValue}
        className="point-list"
        setCurrentItem={(item) => {
          selectMarker(item)
          setShowList(false)
        }}
      />
    )
  }

  return (
    <Wrapper className="hide-on-exit">
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
      {locations.length ? (
        <CSSTransition
          mountOnEnter
          unmountOnExit
          timeout={600}
          in={currentItem && !showList && !errorPopup && showDetails}
          onExited={resetMarker}
        >
          <DetailsPopup
            item={currentItem || locations[0]}
            onClose={() => {
              resetIcon(currentItem)
              setShowDetails(false)
            }}
          />
        </CSSTransition>
      ) : null}
    </Wrapper>
  )
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
    transition: opacity 1s ease-in-out;
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
