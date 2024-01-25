import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { ReactComponent as Xmark } from "../../../assets/icons/x-mark.svg";
import classes from "./MonoprixCard.module.scss";
import popClasses from "../GenericPop/GenericPop.module.scss";
import cardImage from "../../../assets/images/monoprix-card.png";

export default function MonoprixCard({ closePop }) {
  return (
    <div className={popClasses.popWrapper}>
      <div
        className={classNames(
          popClasses.popContainer,
          popClasses.max400,
          classes.container
        )}
      >
        <Xmark onClick={() => closePop()} className={popClasses.closeBtn} />
        <p className={classNames("my-text my-color-textPrimary", classes.text)}>
          <FormattedMessage
            id="monoprixCard:Description"
            defaultMessage="Please add the number visible on your Monoprix card. An example is shown below:"
          />
        </p>
        <img
          className={classes.monoprixCard}
          src={cardImage}
          alt="Monoprix Card"
        />
      </div>
    </div>
  );
}

MonoprixCard.propTypes = {
  closePop: PropTypes.func,
};
