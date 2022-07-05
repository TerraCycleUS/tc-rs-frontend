import { SET_USER, UPDATE_USER } from '../actions/user'

export default function userReducer(state = null, action = {}) {
  switch (action.type) {
    case SET_USER:
      return action.payload

    case UPDATE_USER:
      if (state) {
        return {
          ...state,
          ...action.payload,
        }
      }

      return state

    default:
      return state
  }
}
