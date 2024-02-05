import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

import classes from "./ProgressBar.module.scss";
import classNames from "classnames";

const ProgressBar = ({
  availableItemsCount,
  requiredItemsCount,
  roundedBottom = true,
  className,
}) => {
  const width =
    Math.min((availableItemsCount / requiredItemsCount) * 100, 100) + "%";
  return (
    <div
      className={classNames(classes.progressBar, className, { roundedBottom })}
    >
      <span className={classNames("my-text-description", classes.description)}>
        <FormattedMessage
          id="couponItems:ProgressBar"
          defaultMessage="{availableItemsCount}/{requiredItemsCount} items"
          values={{ availableItemsCount, requiredItemsCount }}
        />
      </span>
      <span style={{ width }} className={classes.progress}></span>
    </div>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  availableItemsCount: PropTypes.number,
  requiredItemsCount: PropTypes.number,
  roundedBottom: PropTypes.bool,
  className: PropTypes.string,
};
