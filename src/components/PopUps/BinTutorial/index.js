import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import classes from "./BinTutorial.module.scss";
import popClasses from "../GenericPop/GenericPop.module.scss";
import { ReactComponent as HairCareIcon } from "../../../assets/icons/hair-care.svg";
import { ReactComponent as DeodorantsIcon } from "../../../assets/icons/deoderants.svg";
import { ReactComponent as OralCareIcon } from "../../../assets/icons/oral-care.svg";
import { ReactComponent as MakeupSkincareIcon } from "../../../assets/icons/makeup-&-skincare.svg";
import { ReactComponent as GroomingIcon } from "../../../assets/icons/grooming.svg";
import { ReactComponent as Xmark } from "../../../assets/icons/x-mark.svg";
import { setSeenBinTutorial } from "../../../actions/seenBinTutorial";

export default function BinTutorial({ closePop }) {
  const dispatch = useDispatch();
  const seenBinTutorial = useSelector((state) => state.seenBinTutorial);

  useEffect(() => {
    if (!seenBinTutorial)
      dispatch(setSeenBinTutorial({ seenBinTutorial: true }));
  }, []);

  return (
    <div className={popClasses.popWrapper}>
      <div className={classNames(popClasses.popContainer, popClasses.max400)}>
        <Xmark onClick={closePop} className={popClasses.closeBtn} />
        <h2
          className={classNames(
            "my-text-h2",
            "my-color-textBlack",
            classes.title
          )}
        >
          <FormattedMessage id="binTutorial:Title" defaultMessage="Hello!" />
        </h2>
        <p
          className={classNames(
            "my-text my-color-textPrimary text-center",
            classes.textMain
          )}
        >
          <FormattedMessage
            id="binTutorial:Text"
            defaultMessage="Recycle 3 products in store and get 1 discount coupon!"
          />
        </p>
        <div className={classes.iconContainer}>
          <MakeupSkincareIcon className={classes.makeup} />
          <DeodorantsIcon />
        </div>
        <p className={classes.descriptionText}>
          <FormattedMessage
            id="binTutorial:Cosmetics"
            defaultMessage="Cosmetic products"
          />
        </p>
        <OralCareIcon className={classes.oral} />
        <p className={classes.descriptionText}>
          <FormattedMessage
            id="binTutorial:Dental"
            defaultMessage="Dental Hygiene"
          />
        </p>
        <div className={classes.shavingContainer}>
          <GroomingIcon />
          <HairCareIcon />
        </div>
        <p className={classes.descriptionText}>
          <FormattedMessage
            id="binTutorial:Shaving"
            defaultMessage="Shaving Products"
          />
        </p>
        <Button className={classes.button} onClick={closePop}>
          <FormattedMessage id="binTutorial:Start" defaultMessage="Start now" />
        </Button>
      </div>
    </div>
  );
}

BinTutorial.propTypes = {
  closePop: PropTypes.func,
};
