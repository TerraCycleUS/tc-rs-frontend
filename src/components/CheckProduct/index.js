import React from "react";
import PropTypes from "prop-types";
import classes from "./CheckProduct.module.scss";

export default function CheckProduct({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classes.checkWrapper}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
CheckProduct.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
