import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Button from "../../Button";
import { ReactComponent as Xmark } from "../../../assets/icons/x-mark.svg";
import { ReactComponent as ItemSavedPic } from "../../../assets/icons/item-saved.svg";
import classes from "./ItemSaved.module.scss";
import popClasses from "../GenericPop/GenericPop.module.scss";

export default function ItemSaved({ setShow }) {
  const navigate = useNavigate();

  function closePop() {
    navigate("/recycling-bin");
    setShow(false);
  }

  return (
    <div className={popClasses.popWrapper}>
      <div className={classNames(popClasses.popContainer, popClasses.max400)}>
        <Xmark onClick={() => closePop()} className={popClasses.closeBtn} />
        <h2
          className={classNames(
            "my-text-h2",
            "my-color-textBlack",
            classes.title
          )}
        >
          <FormattedMessage
            id="itemSaved:Title"
            defaultMessage="The item was successfully registered !"
          />
        </h2>
        <ItemSavedPic className={classes.icon} />
        <p className={classNames("my-text my-color-textPrimary", classes.text)}>
          <FormattedMessage
            id="itemSaved:Description"
            defaultMessage="You can now drop the item off at your nearest Monoprix store."
          />
        </p>
        <Link className={classes.linkBtn} to="../take-photo">
          <Button inverted>
            <FormattedMessage
              id="itemSaved:ScanAnother"
              defaultMessage="Scan another item"
            />
          </Button>
        </Link>
        <Link className={classNames(classes.linkBtn, classes.drop)} to="/map">
          <Button>
            <FormattedMessage
              id="itemSaved:Drop"
              defaultMessage="Drop off now"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}

ItemSaved.propTypes = {
  setShow: PropTypes.func,
};
