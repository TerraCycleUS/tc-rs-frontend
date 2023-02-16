import {
  SET_LOCATION,
  SET_RETAILERS_REFETCH,
  SET_TIMER,
} from '../actions/location'

const defaultState = { location: null, timerId: null, retailersRefetch: true }

export default function locationReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.payload }

    case SET_TIMER:
      return { ...state, timerId: action.payload }

    case SET_RETAILERS_REFETCH:
      return { ...state, retailersRefetch: action.payload }

    default:
      return state
  }
}
