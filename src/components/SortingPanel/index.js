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
  formatTitles = true,
}) {
  const { formatMessage } = useIntl();

  function getButtonText(type) {
    if (type?.title) return type.title;
    return formatMessage(type.label);
  }

  return (
    <div className={classNames(classes.menuWrapper, className)}>
      <button
        type="button"
        onClick={() => setCurrentType("All")}
        key="All"
        disabled={currentType === "All"}
        className={classNames("SortingPanel--all-btn", classes.menuItem)}
      >
        <FormattedMessage id="productMenu:All" defaultMessage="All" />
      </button>
      {types?.map((type) => (
        <button
          type="button"
          onClick={() => setCurrentType(type.id)}
          key={type.id}
          disabled={currentType === type.id}
          className={classNames(classes.menuItem, classes[type?.id])}
        >
          {formatTitles ? getButtonText(type) : type.title || type.label}
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
  formatTitles: PropTypes.bool,
};
