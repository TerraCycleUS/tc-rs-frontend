import userReducer from './user'

export default function rootReducer(state = {}, action = {}) {
  return {
    user: userReducer(state.user, action),
  }
}
