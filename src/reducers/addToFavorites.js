import {
  SET_ADD_FAVORITES,
  UPDATE_ADD_FAVORITES,
} from '../actions/addToFavorites'

export default function setAddToFavoritesReducer(state = null, action = {}) {
  switch (action.type) {
    case SET_ADD_FAVORITES:
      return action.payload

    case UPDATE_ADD_FAVORITES:
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
