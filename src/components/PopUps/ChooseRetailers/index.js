import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import popClasses from "../GenericPop/GenericPop.module.scss";
import { ReactComponent as Xmark } from "../../../assets/icons/x-mark.svg";
import Button from "../../Button";
import classes from "./ChooseRetailers.module.scss";
import { ReactComponent as Check } from "../../../assets/icons/check.svg";

export default function ChooseRetailers({ retailers, setRetailers, closePop }) {
  const [tempRetailers, setTempRetailers] = useState(retailers);

  function applyRetailer() {
    setRetailers(tempRetailers);
    closePop();
  }

  return (
    <div className={popClasses.popWrapper}>
      <div
        className={classNames(
          popClasses.popContainer,
          popClasses.pd20,
          popClasses.max400,
          classes.container
        )}
      >
        <Xmark onClick={closePop} className={popClasses.closeBtn} />
        <h6
          className={classNames(
            "my-text-primary my-color-textPrimary",
            classes.heading
          )}
        >
          <FormattedMessage
            id="chooseRetailers:Heading"
            defaultMessage="Select retailer to search"
          />
        </h6>
        <CheckRetailer
          retailers={tempRetailers}
          setRetailers={setTempRetailers}
        />
        <Button onClick={() => applyRetailer()} className={classes.applyBtn}>
          <FormattedMessage id="chooseRetailers:Apply" defaultMessage="Apply" />
        </Button>
      </div>
    </div>
  );
}
ChooseRetailers.propTypes = {
  retailers: PropTypes.array,
  setRetailers: PropTypes.func,
  closePop: PropTypes.func,
};

export function CheckRetailer({ retailers, setRetailers }) {
  function selectRetailer(id) {
    setRetailers(
      retailers.map((retailer) => {
        if (retailer.id === id) {
          return { ...retailer, selected: !retailer.selected };
        }
        return retailer;
      })
    );
  }

  return (
    <ul className={classes.retailerList}>
      {retailers.map(({ id, name, smallLogo, selected }) => (
        <li key={id} className={classes.retailerItem}>
          <RetailerCheckBox
            id={id}
            input={{
              checked: selected,
              onChange: () => selectRetailer(id),
            }}
          >
            <div className={classes.retailerWrapper}>
              <div className={classes.iconContainer}>
                <img
                  src={smallLogo}
                  alt={name}
                  className={classes.retailerIcon}
                  loading="lazy"
                />
              </div>
              <p className="my-text my-color-textPrimary">{name}</p>
            </div>
          </RetailerCheckBox>
        </li>
      ))}
    </ul>
  );
}
CheckRetailer.propTypes = {
  retailers: PropTypes.array,
  setRetailers: PropTypes.func,
};

export function RetailerCheckBox({ input, id, children }) {
  return (
    <div className={classes.checkWrapper}>
      <div className={classes.inputRow}>
        {children}
        <input {...input} type="checkbox" id={id} />
        <button type="button" className={classes.checkButton} tabIndex={-1}>
          <label htmlFor={id}>
            <Check />
          </label>
        </button>
      </div>
    </div>
  );
}
RetailerCheckBox.propTypes = {
  input: PropTypes.object,
  id: PropTypes.number,
  children: PropTypes.node,
};
