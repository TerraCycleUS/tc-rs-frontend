export const SET_SEEN_BIN_TUTORIAL = "set_seen_bin_tutorial";
export const UPDATE_SEEN_BIN_TUTORIAL = "update_seen_bin_tutorial";

export function setSeenBinTutorial(payload) {
  return {
    type: SET_SEEN_BIN_TUTORIAL,
    payload,
  };
}

export function updateSeenBinTutorial(payload) {
  return {
    type: UPDATE_SEEN_BIN_TUTORIAL,
    payload,
  };
}
