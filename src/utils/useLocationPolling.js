import { useDispatch, useSelector } from 'react-redux'
import { setLocation, setTimer } from '../actions/location'
import { getPosition } from './geoLocation'
import http from './http'
import { LOCATION_POLLING_TIMEOUT } from './const'

async function poll() {
  const currentPosition = await getPosition()
  const { latitude: lat, longitude: lng } = currentPosition.coords
  return (await http.get('/api/map-items/public', { params: { lat, lng } }))
    .data
}

export default function useLocationPolling(timeout = LOCATION_POLLING_TIMEOUT) {
  const location = useSelector((state) => state.location)
  const dispatch = useDispatch()

  function start() {
    if (location.timerId) {
      clearInterval(location.timerId)
    }

    if (location.location) {
      dispatch(setLocation(null))
    }

    const id = setTimeout(startPolling, timeout)
    dispatch(setTimer(id))
  }

  function stop() {
    clearTimeout(location.timerId)
    dispatch(setTimer(null))
  }

  function clear() {
    dispatch(setLocation(null))
  }

  async function startPolling() {
    try {
      const points = await poll()

      if (points.length) {
        dispatch(setLocation(points[0]))
        return
      }

      start()
    } catch (err) {
      if (err instanceof window.GeolocationPositionError) return

      throw err
    }
  }

  return { poll, start, stop, clear, state: location.location }
}
