import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

import classes from "./MoreItems.module.scss";

const MoreItemsText = ({ itemsCount, category }) => {
  return (
    <FormattedMessage
      id="couponItems:MoreItemsText"
      defaultMessage="Recycle <green>{itemsCount} more {category} {itemsCount, plural, one {item} other {items}}</green> to unlock."
      values={{
        itemsCount,
        green: (chunks) => <span className={classes.green}>{chunks}</span>,
        category,
      }}
    />
  );
};

export default MoreItemsText;

MoreItemsText.propTypes = {
  itemsCount: PropTypes.number,
  category: PropTypes.string,
};
