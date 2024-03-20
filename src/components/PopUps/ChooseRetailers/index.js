import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import popClasses from "../GenericPop/GenericPop.module.scss";
import { ReactComponent as Xmark } from "../../../assets/icons/x-mark.svg";
import Button from "../../Button";
import classes from "./ChooseRetailers.module.scss";
import { ReactComponent as Check } from "../../../assets/icons/check.svg";

export default function ChooseRetailers({
  retailers,
  closePop,
  retailerHandler,
  selectedRetailerIds,
}) {
  const [tempRetailerIds, setTempRetailerIds] = useState(selectedRetailerIds);
  function applyRetailer() {
    retailerHandler.setFilter(tempRetailerIds);
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
          selectedRetailerIds={tempRetailerIds}
          retailers={retailers}
          setRetailerIds={setTempRetailerIds}
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
  closePop: PropTypes.func,
  retailerHandler: PropTypes.object,
  selectedRetailerIds: PropTypes.array,
};

export function CheckRetailer({
  retailers,
  selectedRetailerIds,
  setRetailerIds,
}) {
  function selectRetailer(id, isSelected) {
    if (isSelected) {
      setRetailerIds((prevIds) =>
        prevIds.filter((retailerId) => retailerId !== id)
      );
      return;
    }

    setRetailerIds((prevIds) => prevIds.concat([id]));
  }

  return (
    <ul className={classes.retailerList}>
      {retailers.map(({ id, name, smallLogo }) => {
        const isSelected = selectedRetailerIds.includes(id);
        return (
          <li key={id} className={classes.retailerItem}>
            <RetailerCheckBox
              id={id}
              input={{
                checked: isSelected,
                onChange: () => selectRetailer(id, isSelected),
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
        );
      })}
    </ul>
  );
}
CheckRetailer.propTypes = {
  retailers: PropTypes.array,
  setRetailerIds: PropTypes.func,
  selectedRetailerIds: PropTypes.array,
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
