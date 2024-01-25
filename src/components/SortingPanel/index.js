import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";
import classes from "./SortingPanel.module.scss";

export default function SortingPanel({
  types,
  currentType,
  setCurrentType,
  className,
}) {
  const { formatMessage } = useIntl();

  function getButtonText(type) {
    if (type?.title) return type.title;
    return formatMessage(type.label);
  }

  return (
    <div className={classes.menuWrapper}>
      <button
        type="button"
        onClick={() => setCurrentType("All")}
        key="All"
        disabled={currentType === "All"}
        className={classNames(className, classes.menuItem)}
      >
        <FormattedMessage id="productMenu:All" defaultMessage="All" />
      </button>
      {types?.map((type) => (
        <button
          type="button"
          onClick={() => setCurrentType(type.id)}
          key={type.id}
          disabled={currentType === type.id}
          className={classNames(className, classes.menuItem, classes[type?.id])}
        >
          {getButtonText(type)}
        </button>
      ))}
    </div>
  );
}

SortingPanel.propTypes = {
  types: PropTypes.array,
  currentType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCurrentType: PropTypes.func,
  className: PropTypes.string,
};
