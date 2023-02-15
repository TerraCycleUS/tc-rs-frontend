import userReducer from './user'
import setTutorialReducer from './seenTutorial'
import setBinTutorialReducer from './seenBinTutorial'
import locationReducer from './location'

export default function rootReducer(state = {}, action = {}) {
  return {
    user: userReducer(state.user, action),
    seenTutorial: setTutorialReducer(state.seenTutorial, action),
    seenBinTutorial: setBinTutorialReducer(state.seenBinTutorial, action),
    location: locationReducer(state.location, action),
  }
}
