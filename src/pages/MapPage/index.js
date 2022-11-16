import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import { CSSTransition } from 'react-transition-group'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FooterNav from '../../components/FooterNav'
import init, { getMarkerLogo, getNewMarkers } from './mapUtils'
import ErrorPopup from './ErrorPopup'
import LocationSearch from '../../components/LocationSearch'
import MapPointList from '../../components/MapPointList'
import markerSelectedUrl from '../../assets/icons/marker-selected.svg'
import DetailsPopup from './DetailsPopup'
import DropOffPopup from '../../components/PopUps/DropOff'
import LocationDropOffPopup from '../../components/PopUps/LocationDropOff'
import useApiCall from '../../utils/useApiCall'
import LoadingScreen from '../../components/LoadingScreen'
import classes from './MapPage.module.scss'
import { getPosition } from '../../utils/geoLocation'
import { ReactComponent as Navigate } from '../../assets/icons/green-arrow-navigate.svg'
import { ReactComponent as FilterIcon } from '../../assets/icons/filter-icon.svg'
import http from '../../utils/http'
import ChooseRetailers from '../../components/PopUps/ChooseRetailers'
import { detectLanguage } from '../../utils/intl'
import PleaseRegister from '../../components/PopUps/PleaseRegister'
import NoRetailersSelected from '../../components/PopUps/NoRetailersSelected'

export default function MapPage() {
  const [errorPopup, setErrorPopup] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentItem, setCurrentItem] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [locations, setLocations] = useState([])
  const [showList, setShowList] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showDropOff, setShowDropOff] = useState(false)
  const [showLocationDropOff, setShowLocationDropOff] = useState(false)
  const [retailers, setRetailers] = useState([])
  const [showRetailerList, setShowRetailerList] = useState(false)
  const [userHasRetailer, setUserHasRetailer] = useState(true)
  const [showPlsRegister, setShowPlsRegister] = useState(false)
  const [noRetailersSelected, setNoRetailersSelected] = useState(false)
  const [currentRetailerId, setCurrentRetailerId] = useState()
  const [unregisteredRetailer, setUnregisteredRetailer] = useState('')
  const user = useSelector((state) => state.user)
  const apiCall = useApiCall()
  const getMyRetailersApiCall = useApiCall()
  const locationDropOffApiCall = useApiCall()
  const navigate = useNavigate()

  const watchIdRef = React.useRef(-1)
  const domRef = React.useRef()
  const userMarkerRef = React.useRef()
  const mapRef = React.useRef()
  const lang = detectLanguage()
  const coordsRef = React.useRef({})

  function selectMarker(item) {
    const { lat, lng } = item
    setCurrentRetailerId(item.retailerId)
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
        }),
      ([map, lat, lng]) => {
        mapRef.current = map
        coordsRef.current = { lat, lng }
      },
      null,
      () => setLoading(false),
    )

    return () => navigator.geolocation.clearWatch(watchIdRef.current)
  }, [])

  function countSelectedRetailers() {
    return retailers.reduce((counter, retailer) => {
      // eslint-disable-next-line no-param-reassign
      if (retailer.selected) counter += 1
      return counter
    }, 0)
  }

  useEffect(() => {
    if (!mapRef.current) return
    const numSelectedRetailers = countSelectedRetailers()
    if (numSelectedRetailers < 1) setNoRetailersSelected(true)
    const { lat, lng } = coordsRef.current
    getNewMarkers({
      retailers,
      setLocations,
      locations,
      map: mapRef.current,
      onMarkerClick: selectMarker,
      lat,
      lng,
    })
  }, [retailers])

  function getRetailers() {
    if (!user) {
      return http.get(`/api/retailer/public-retailers?lang=${lang}`)
    }
    return http.get('/api/retailer/my-retailers')
  }

  function mapRetailers(tempRetailers) {
    return tempRetailers?.map((retailer) => ({
      ...retailer,
      selected: true,
    }))
  }

  useEffect(() => {
    getMyRetailersApiCall(
      () => getRetailers(),
      (response) => {
        if (response?.data?.length) {
          setRetailers(mapRetailers(response?.data))
          return
        }
        http
          .get(`/api/retailer/public-retailers?lang=${lang}`)
          .then((publicRetailers) => {
            setRetailers(mapRetailers(publicRetailers?.data))
            setUserHasRetailer(false)
          })
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
      />
    )
  }

  async function startScan() {
    const { lat, lng } = coordsRef.current
    const [res] =
      lat !== undefined && lng !== undefined
        ? await locationDropOffApiCall(() =>
            http.get('/api/map-items/public', { params: coordsRef.current }),
          )
        : [{ data: [] }]
    const { location, address, city, id } = currentItem

    if (res.data.filter((item) => item.id === id).length) {
      setShowDropOff(false)
      setShowLocationDropOff(true)
      return
    }
    navigate({
      pathname: '/scan',
      search: queryString.stringify({ location, address, city, id }),
    })
  }

  function startDropOff() {
    const { location, address, city, id } = currentItem
    navigate({
      pathname: '/drop-off',
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

  function doesHaveThisRetailer() {
    return retailers?.some((retailer) => retailer.id === currentRetailerId)
  }

  function proceedDropOff() {
    if (!user || !userHasRetailer || !doesHaveThisRetailer()) {
      setUnregisteredRetailer(
        retailers.find((retailer) => retailer.id === currentRetailerId)?.name,
      )
      setShowPlsRegister(true)
    } else setShowDropOff(true)
  }

  return (
    <Wrapper className="hide-on-exit">
      <div id="map" ref={domRef} data-testid="map" />
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
      {showPlsRegister ? (
        <PleaseRegister
          closePop={() => setShowPlsRegister(false)}
          unregisteredRetailer={unregisteredRetailer}
          user={user}
          currentRetailerId={currentRetailerId}
        />
      ) : null}
      {noRetailersSelected ? (
        <NoRetailersSelected
          closePop={() => setNoRetailersSelected(false)}
          openFilter={() => setShowRetailerList(true)}
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
            onClick={() => proceedDropOff()}
            onClose={() => {
              resetIcon(currentItem)
              setShowDetails(false)
            }}
          />
        </CSSTransition>
      ) : null}
      {showDropOff ? (
        <DropOffPopup setShow={setShowDropOff} onStart={startScan} />
      ) : null}
      {showLocationDropOff ? (
        <LocationDropOffPopup
          onStart={startDropOff}
          brand={currentItem.brand}
          location={currentItem.location}
          setShow={setShowLocationDropOff}
        />
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
