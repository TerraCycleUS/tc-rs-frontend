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
  return (
    <div className={classNames(classes.progressBar, { roundedBottom })}>
      <span>
        <FormattedMessage
          id="couponItems:ProgressBar"
          defaultMessage="{availableItemsCount}/{requiredItemsCount} items"
          values={{ availableItemsCount, requiredItemsCount }}
        />
      </span>
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
