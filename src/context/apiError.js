import React from "react";
import PropTypes from "prop-types";

const context = React.createContext(null);

export function ApiErrorProvider({ children }) {
  return (
    <context.Provider value={React.useState(null)}>{children}</context.Provider>
  );
}

export function useApiErrorContext() {
  return React.useContext(context);
}

ApiErrorProvider.propTypes = {
  children: PropTypes.node,
};
