import {
  SET_SEEN_BIN_TUTORIAL,
  UPDATE_SEEN_BIN_TUTORIAL,
} from '../actions/seenBinTutorial'

export default function setBinTutorialReducer(state = null, action = {}) {
  switch (action.type) {
    case SET_SEEN_BIN_TUTORIAL:
      return action.payload

    case UPDATE_SEEN_BIN_TUTORIAL:
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
