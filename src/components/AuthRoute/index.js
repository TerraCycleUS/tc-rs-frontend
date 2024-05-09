import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";

export default function AuthRoute({ children }) {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: "/sign-in",
          search: queryString.stringify({
            redirect: `${location.pathname}${location.search}`,
          }),
        }}
        replace
      />
    );
  }

  if (user.status === "INVITED") {
    return (
      <Navigate
        to={{
          pathname: "/registration/confirm-code",
          search: queryString.stringify({
            email: user.email,
          }),
        }}
        replace
      />
    );
  }

  return children;
}

AuthRoute.propTypes = {
  children: PropTypes.node,
};
