import { SET_LOCATION, SET_TIMER } from '../actions/location'

const defaultState = { location: null, timerId: null }

export default function locationReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.payload }

    case SET_TIMER:
      return { ...state, timerId: action.payload }

    default:
      return state
  }
}
