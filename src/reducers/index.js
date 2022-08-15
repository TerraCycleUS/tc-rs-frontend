import userReducer from './user'
import setTutorialReducer from './seenTutorial'

export default function rootReducer(state = {}, action = {}) {
  return {
    user: userReducer(state.user, action),
    seenTutorial: setTutorialReducer(state.seenTutorial, action),
  }
}
