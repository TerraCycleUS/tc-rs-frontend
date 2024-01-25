import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./GenericPop.module.scss";

export function PopContainer({ children, className }) {
  return (
    <div className={classNames(classes.popContainer, className)}>
      {children}
    </div>
  );
}
PopContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export function PopWrapper({ children, className }) {
  return (
    <div className={classNames(classes.popWrapper, className)}>{children}</div>
  );
}
PopWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
