import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classes from "./ButtonActions.module.scss";
import Button from "../../../components/Button";
import classNames from "classnames";

export default function ButtonActions({
  onAddClick,
  onDropOffClick,
  dropOffBtnDisabled,
  noFooter = false,
}) {
  return (
    <div
      className={classNames(classes.wrapper, { [classes.noFooter]: noFooter })}
    >
      <Button onClick={onAddClick} notFullWidth data-testid="addItem-link">
        <FormattedMessage id="recyclingBin:AddItem" defaultMessage="Add item" />
      </Button>
      <Button
        onClick={onDropOffClick}
        disabled={dropOffBtnDisabled}
        notFullWidth
      >
        <FormattedMessage
          id="recyclingBin:DropOff"
          defaultMessage="Drop off item"
        />
      </Button>
    </div>
  );
}

ButtonActions.propTypes = {
  onAddClick: PropTypes.func,
  onDropOffClick: PropTypes.func,
  dropOffBtnDisabled: PropTypes.bool,
  noFooter: PropTypes.bool,
};
