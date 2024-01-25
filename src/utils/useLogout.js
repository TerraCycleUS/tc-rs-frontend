import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../actions/user";
import http from "./http";
import useApiCall from "./useApiCall";

export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exitRef = React.useRef(false);
  const logoutApiCall = useApiCall();

  React.useEffect(
    () => () => {
      if (exitRef.current) {
        dispatch(setUser(null));
      }
    },
    []
  );

  return function logout() {
    logoutApiCall(
      () => http.post("/api/auth/logout"),
      null,
      null,
      () => {
        exitRef.current = true;
      },
      {
        message: false,
        retry: false,
      }
    );
    navigate("/sign-in", { replace: true });
  };
}
