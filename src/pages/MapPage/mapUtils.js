/* global google */
import { Loader } from '@googlemaps/js-api-loader'

import { getPosition, watchPosition } from '../../utils/geoLocation'
import markerUrl from '../../assets/icons/map-marker.svg'
import http from '../../utils/http'
import createPopupClass from './createPopupClass'
import { mapStyles } from './mapStyles'

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
    styles: mapStyles,
    disableDefaultUI: true,
  }

  try {
    const currentPosition = await getPosition()
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

function addMarker(google, map, marker) {
  return new google.maps.Marker({
    position: marker.position,
    icon: marker.icon,
    map,
  })
}

export default async function init({
  setErrorPopup,
  node,
  userMarkerNode,
  watchIdRef,
  setLocations,
  onMarkerClick,
}) {
  const map = await getMap({ setErrorPopup, node })
  try {
    const {
      coords: { latitude, longitude },
    } = await getPosition()
    const Popup = createPopupClass(window.google)
    const userMarker = new Popup(
      new google.maps.LatLng(latitude, longitude),
      userMarkerNode,
    )
    userMarker.setMap(map)

    // eslint-disable-next-line
    watchIdRef.current = watchPosition(({ coords }) =>
      userMarker.setPosition(
        new google.maps.LatLng(coords.latitude, coords.longitude),
      ),
    )
  } catch (e) {
    console.log(e) // eslint-disable-line
  }

  const { data } = await http.get('/api/map-items')

  const mapped = data.map((item) => {
    const { lat, lng } = item
    const marker = addMarker(window.google, map, {
      position: { lat, lng },
      icon: markerUrl,
    })
    marker.addListener('click', (e) => onMarkerClick(item, map, e))
    item.marker = marker // eslint-disable-line
    return item
  })

  setLocations(mapped)

  return map
}
