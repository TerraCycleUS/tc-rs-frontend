export const SET_LOCATION = 'set_location'
export const SET_TIMER = 'set_timer'
export const SET_RETAILERS_REFETCH = 'set_retailers_refetch'

export function setLocation(payload) {
  return {
    type: SET_LOCATION,
    payload,
  }
}

export function setTimer(payload) {
  return {
    type: SET_TIMER,
    payload,
  }
}

export function setRetailersRefetch(payload) {
  return {
    type: SET_RETAILERS_REFETCH,
    payload,
  }
}
