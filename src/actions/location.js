export const SET_LOCATION = 'set_location'
export const SET_TIMER = 'set_timer'

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
