import React, { useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import bwipjs from "bwip-js";
import { FormattedMessage } from "react-intl";
import popClasses from "../GenericPop/GenericPop.module.scss";
import classes from "./CashTillBarcode.module.scss";
import { ReactComponent as Xmark } from "../../../assets/icons/x-mark.svg";

export default function CashTillBarcode({
  closePop,
  brandLogo,
  codeToDisplay,
  eanCode,
}) {
  useEffect(() => {
    if (eanCode) {
      bwipjs.toCanvas("canvasBarCode", {
        bcid: "code128",
        text: eanCode,
        scale: 2,
        height: 15,
        includetext: true,
        textxalign: "center",
      });
    }
  }, []);

  return (
    <div className={`${popClasses.popWrapper} ${classes.background}`}>
      <div
        className={classNames(
          popClasses.popContainer,
          popClasses.rotated,
          popClasses.max400,
          classes.filter,
          classes.rotatedCentering
        )}
      >
        <Xmark
          onClick={() => closePop()}
          className={classNames(popClasses.closeBtn, popClasses.rotated)}
        />

        <div className={classes.rotatedContainer}>
          <img alt="brand" src={brandLogo} className={classes.brandLogo} />
          <p className={classNames("my-text-description", classes.code)}>
            <FormattedMessage
              id="cashTillBarcode:Loyalty"
              defaultMessage="Carrefour ID: {code}"
              values={{
                code: <span className={classes.bolder}>{codeToDisplay}</span>,
              }}
            />
          </p>

          {/* {eanCodePicURL && ( */}
          {/*  <img className={classes.barcode} alt="barcode" src={eanCodePicURL} /> */}
          {/* )} */}
          <canvas className={classes.canvasBarcode} id="canvasBarCode"></canvas>
        </div>
      </div>
    </div>
  );
}
CashTillBarcode.propTypes = {
  closePop: PropTypes.func,
  brandLogo: PropTypes.string,
  codeToDisplay: PropTypes.string,
  eanCode: PropTypes.string,
};
