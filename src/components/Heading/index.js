import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import classes from "./Heading.module.scss";

export default function Heading({ children, className }) {
  return <h1 className={classNames(classes.heading, className)}>{children}</h1>;
}

Heading.propTypes = { children: PropTypes.node, className: PropTypes.string };
