export const SET_ADD_FAVORITES = 'set_add_favorites'
export const UPDATE_ADD_FAVORITES = 'update_add_favorites'

export function setAddToFavorites(payload) {
  return {
    type: SET_ADD_FAVORITES,
    payload,
  }
}

export function updateAddToFavorites(payload) {
  return {
    type: UPDATE_ADD_FAVORITES,
    payload,
  }
}
