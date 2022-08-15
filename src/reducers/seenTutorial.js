import {
  SET_SEEN_TUTORIAL,
  UPDATE_SEEN_TUTORIAL,
} from '../actions/seenTutorial'

export default function setTutorialReducer(state = null, action = {}) {
  switch (action.type) {
    case SET_SEEN_TUTORIAL:
      return action.payload

    case UPDATE_SEEN_TUTORIAL:
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
