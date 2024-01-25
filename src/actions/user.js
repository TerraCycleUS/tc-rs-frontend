export const SET_USER = "set_user";
export const UPDATE_USER = "update_user";

export function setUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload,
  };
}
