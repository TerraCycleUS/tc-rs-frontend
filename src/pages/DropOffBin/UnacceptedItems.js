import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import classes from "./DropOffBin.module.scss";
import DropOffItems from "../../components/DropOffItems";

export default function UnacceptedItems({ products }) {
  return (
    <div className={classes.unacceptedItemsWrapper}>
      <p
        className={classNames(
          "my-color-textSecondary my-text-description",
          classes.unacceptedItemsDescription
        )}
      >
        <FormattedMessage
          id="dropOffBin:UnacceptedWasteStreams"
          defaultMessage="Waste stream(s) not accepted at this location"
        />
      </p>
      <div>
        <DropOffItems
          unacceptedItems
          currentCategory={"All"}
          products={products}
        />
      </div>
    </div>
  );
}

UnacceptedItems.propTypes = {
  products: PropTypes.array,
};
