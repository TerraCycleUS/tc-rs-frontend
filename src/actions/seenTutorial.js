export const SET_SEEN_TUTORIAL = "set_seen_tutorial";
export const UPDATE_SEEN_TUTORIAL = "update_seen_tutorial";

export function setSeenTutorial(payload) {
  return {
    type: SET_SEEN_TUTORIAL,
    payload,
  };
}

export function updateSeenTutorial(payload) {
  return {
    type: UPDATE_SEEN_TUTORIAL,
    payload,
  };
}
