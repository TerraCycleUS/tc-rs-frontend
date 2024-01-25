import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./RetailerMenu.module.scss";

export default function RetailerMenu({
  retailers,
  setActiveRetailer,
  activeRetailer,
  className,
  useIndex,
}) {
  function chooseRetailer(id, index) {
    if (useIndex) setActiveRetailer(index);
    else setActiveRetailer(id);
  }

  function isDisabled(id, index) {
    if (useIndex) return activeRetailer === index;
    return activeRetailer === id;
  }

  return (
    <div className={classNames(classes.menuWrapper, className)}>
      {retailers?.map(({ id, name, index }) => (
        <button
          type="button"
          key={id}
          id={id}
          onClick={() => chooseRetailer(id, index)}
          disabled={isDisabled(id, index)}
          className={classes.menuItem}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

RetailerMenu.propTypes = {
  retailers: PropTypes.array,
  setActiveRetailer: PropTypes.func,
  activeRetailer: PropTypes.number,
  className: PropTypes.string,
  useIndex: PropTypes.bool,
};
