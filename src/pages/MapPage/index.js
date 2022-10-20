import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import { CSSTransition } from 'react-transition-group'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FooterNav from '../../components/FooterNav'
import init, { getMarkerLogo, hideMarkers } from './mapUtils'
import ErrorPopup from './ErrorPopup'
import LocationSearch from '../../components/LocationSearch'
import MapPointList from '../../components/MapPointList'
import markerSelectedUrl from '../../assets/icons/marker-selected.svg'
import DetailsPopup from './DetailsPopup'
import DropOffPopup from '../../components/PopUps/DropOff'
import useApiCall from '../../utils/useApiCall'
import LoadingScreen from '../../components/LoadingScreen'
import classes from './MapPage.module.scss'
import { getPosition } from '../../utils/geoLocation'
import { ReactComponent as Navigate } from '../../assets/icons/green-arrow-navigate.svg'
import { ReactComponent as FilterIcon } from '../../assets/icons/filter-icon.svg'
import http from '../../utils/http'
import ChooseRetailers from '../../components/PopUps/ChooseRetailers'
import { detectLanguage } from '../../utils/intl'

export default function MapPage() {
  const [errorPopup, setErrorPopup] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentItem, setCurrentItem] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [locations, setLocations] = useState([])
  const [showList, setShowList] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showDropOff, setShowDropOff] = useState(false)
  const [retailers, setRetailers] = useState([])
  const [showRetailerList, setShowRetailerList] = useState(false)
  const user = useSelector((state) => state.user)
  const apiCall = useApiCall()
  const getMyRetailersApiCall = useApiCall()
  const navigate = useNavigate()

  const watchIdRef = React.useRef(-1)
  const domRef = React.useRef()
  const userMarkerRef = React.useRef()
  const mapRef = React.useRef()
  const lang = detectLanguage()

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  function selectMarker(item) {
    const { lat, lng } = item
    setCurrentItem((prevMarker) => {
      if (item.id === prevMarker?.id) return prevMarker

      item.marker.setIcon(markerSelectedUrl)
      prevMarker?.marker.setIcon(getMarkerLogo(item.retailerId))
      return item
    })
    setShowDetails(true)
    mapRef.current.panTo({ lat, lng })
  }

  function resetIcon(marker) {
    marker.marker.setIcon(getMarkerLogo(marker.retailerId))
  }

  function resetMarker() {
    setCurrentItem((prevMarker) => {
      resetIcon(prevMarker)
      return null
    })
  }

  useEffect(() => {
    apiCall(
      () =>
        init({
          setErrorPopup,
          setLocations,
          node: domRef.current,
          userMarkerNode: userMarkerRef.current,
          watchIdRef,
          onMarkerClick: selectMarker,
          retailers,
        }),
      (map) => {
        mapRef.current = map
      },
      null,
      () => setLoading(false),
    )

    return () => navigator.geolocation.clearWatch(watchIdRef.current)
  }, [])

  useEffect(() => {
    if (!mapRef.current) return
    hideMarkers({
      retailers,
      setLocations,
      locations,
    })
  }, [retailers])

  function getRetailers() {
    if (!user) {
      return http.get(`/api/retailer/public-retailers?lang=${lang}`, config)
    }
    return http.get('/api/retailer/my-retailers', config)
  }

  useEffect(() => {
    getMyRetailersApiCall(
      () => getRetailers(),
      (response) => {
        setRetailers(
          response.data?.map((retailer) => ({
            ...retailer,
            selected: true,
          })),
        )
      },
      null,
      null,
      { message: false },
    )
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
        retailers={retailers}
      />
    )
  }

  function start() {
    const { location, address, city, id } = currentItem
    navigate({
      pathname: '/scan',
      search: queryString.stringify({ location, address, city, id }),
    })
  }

  useEffect(() => {
    if (errorPopup === true) {
      setLoading(false)
    }
  }, [errorPopup])

  function renderLoader() {
    if (loading) return <LoadingScreen />
    return null
  }

  async function backToUserLocation() {
    try {
      const currentPosition = await getPosition()
      const { latitude, longitude } = currentPosition.coords
      mapRef.current.panTo({ lat: latitude, lng: longitude })
    } catch (err) {
      if (err instanceof window.GeolocationPositionError) {
        setErrorPopup(true)
      }
    }
  }

  return (
    <Wrapper className="hide-on-exit">
      <div id="map" ref={domRef} />
      <LocationSearch
        className="search-bar"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        focused={showList}
        setFocus={setShowList}
      />
      <div className={classes.magickResizer}>
        <button
          onClick={() => setShowRetailerList(true)}
          className={classes.filteringBtn}
          type="button"
        >
          <FilterIcon />
        </button>
      </div>
      <button
        onClick={() => backToUserLocation()}
        className={classes.centering}
        type="button"
      >
        <Navigate className={classes.navigateIcon} />
      </button>
      <div
        id="user"
        ref={userMarkerRef}
        className="d-flex justify-content-center align-items-center"
      />
      {errorPopup ? <ErrorPopup onClick={() => setErrorPopup(false)} /> : null}
      {showRetailerList ? (
        <ChooseRetailers
          setRetailers={setRetailers}
          retailers={retailers}
          closePop={() => setShowRetailerList(false)}
        />
      ) : null}
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
            onClick={() => setShowDropOff(true)}
            onClose={() => {
              resetIcon(currentItem)
              setShowDetails(false)
            }}
          />
        </CSSTransition>
      ) : null}
      {showDropOff ? (
        <DropOffPopup setShow={setShowDropOff} onStart={start} />
      ) : null}
      {renderLoader()}
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
