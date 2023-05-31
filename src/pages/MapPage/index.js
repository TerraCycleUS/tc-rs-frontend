import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { CSSTransition } from 'react-transition-group'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
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
import isStageUrl from '../../utils/checkEnv/isStageUrl'
import { useMessageContext } from '../../context/message'
// import { useMessageContext } from '../../context/message'

export default function MapPage() {
  const oneRetailer = parseInt(process.env.REACT_APP_ONE_RETAILER, 10)
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
  const [noRetailersSelected, setNoRetailersSelected] = useState(false)
  const [currentRetailerId, setCurrentRetailerId] = useState()
  const [unregisteredRetailer, setUnregisteredRetailer] = useState('')
  const [showPlsRegister, setShowPlsRegister] = useState(false)
  const user = useSelector((state) => state.user)
  const apiCall = useApiCall()
  const getMyRetailersApiCall = useApiCall()
  const locationDropOffApiCall = useApiCall()
  const navigate = useNavigate()
  const [, updateMessage] = useMessageContext()

  const watchIdRef = React.useRef(-1)
  const domRef = React.useRef()
  const userMarkerRef = React.useRef()
  const mapRef = React.useRef()
  const lang = user?.lang || detectLanguage()
  const coordsRef = React.useRef({})

  function selectMarker(item) {
    const { lat, lng } = item
    setCurrentRetailerId(item.retailerId)
    setCurrentItem((prevMarker) => {
      if (item.id === prevMarker?.id) return prevMarker

      item.marker.setIcon(markerSelectedUrl)
      prevMarker?.marker.setIcon(getMarkerLogo(prevMarker.retailerId))
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

  const [categories, setCategories] = useState([])
  const getCategoriesApiCall = useApiCall()

  useEffect(() => {
    getCategoriesApiCall(
      () => http.get(`/api/category/public?lang=${lang}`),
      (response) => {
        setCategories(response.data)
      },
      null,
      null,
      { message: false },
    )
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
    if (oneRetailer)
      return tempRetailers
        ?.filter((retailer) => retailer.id === oneRetailer)
        ?.map((retailer) => ({
          ...retailer,
          selected: true,
        }))

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
        className={classes.pointList}
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
    const { location, address, city, id, retailerId } = currentItem
    const nearLocations = res.data
    // if (oneRetailer)
    //   nearLocations = nearLocations.filter(
    //     (loc) => loc.retailerId === oneRetailer,
    //   )
    const neededLocation = nearLocations.find((item) => item.id === id)
    if (neededLocation) {
      setShowDropOff(false)
      // here goes to drop-off bin
      setShowLocationDropOff(true)
      return
    }

    const uAreOnStage = isStageUrl(window.location.origin)
    if (uAreOnStage) {
      navigate({
        pathname: '/scan',
        search: queryString.stringify({
          location,
          address,
          city,
          id,
          retailerId,
        }),
      })
      return
    }

    setShowDropOff(false)
    setShowDetails(false)

    updateMessage({
      type: 'error',
      text: (
        <FormattedMessage
          id="mapPage:LocationNotFound"
          defaultMessage="Location not found"
        />
      ),
    })
  }

  function startDropOff() {
    const { location, address, city, id, retailerId } = currentItem
    navigate({
      pathname: '/drop-off',
      search: queryString.stringify({
        location,
        address,
        city,
        id,
        retailerId,
      }),
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
    <div className={classNames(classes.mapPageWrap, 'hide-on-exit')}>
      <div id="map" ref={domRef} data-testid="map" />
      <LocationSearch
        className={classes.searchBar}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        focused={showList}
        setFocus={setShowList}
      />
      {!oneRetailer && (
        <div className={classes.magickResizer}>
          <button
            onClick={() => setShowRetailerList(true)}
            className={classes.filteringBtn}
            type="button"
          >
            <FilterIcon />
          </button>
        </div>
      )}
      <button
        onClick={() => backToUserLocation()}
        className={classes.centering}
        type="button"
        data-testid="centering-btn"
      >
        <Navigate className={classes.navigateIcon} />
      </button>
      <div
        id="user"
        data-testid="user"
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
      <FooterNav className={classes.mapFooter} />
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
            categories={categories}
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
    </div>
  )
}
