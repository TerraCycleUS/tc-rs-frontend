import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../actions/user";
import http from "./http";

export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exitRef = React.useRef(false);
  React.useEffect(
    () => () => {
      if (exitRef.current) {
        dispatch(setUser(null));
      }
    },
    []
  );

  return async function logout() {
    try {
      await http.post("/api/auth/logout");
      exitRef.current = true;
      navigate("/sign-in", { replace: true });
    } catch (error) {
      return error;
    }
  };
}
