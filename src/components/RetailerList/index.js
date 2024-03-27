import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import classes from "./RetailerList.module.scss";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { CARREFOUR_ID, MONOPRIX_ID } from "../../utils/const";

export default function RetailerList({ retailers, to, fromProfile = false }) {
  return (
    <ul className={classes.retailerList}>
      {retailers.map(
        ({
          id,
          name,
          smallLogo,
          userLoyaltyCode,
          userLoyaltyPassCode,
          active,
        }) => {
          let path;
          if (active) {
            if (id !== MONOPRIX_ID) {
              path = {
                pathname: to,
                search: `retailer=${id}`,
              };
            }
          } else {
            path = "/registration/select-retailer?fromProfile=true";
          }

          return (
            <li
              key={id}
              className={classNames(classes.retailerItem, {
                [classes.disabled]: fromProfile && !active,
              })}
            >
              <Link
                className={classes.retailerLink}
                to={path}
                state={{
                  retailer: id,
                  userLoyaltyCode,
                  userLoyaltyPassCode,
                  name,
                  smallLogo,
                }}
                data-testid="change-retailer-code"
              >
                <div className={classes.retailerContainer}>
                  <div className={classes.iconContainer}>
                    <img
                      className={classes.retailerIcon}
                      src={smallLogo}
                      alt={name}
                    />
                  </div>
                  <p className="my-text my-color-textPrimary">{name}</p>
                </div>
                {!active ? (
                  <span
                    className={classNames(
                      "my-text my-color-main",
                      classes.learnMore
                    )}
                  >
                    <FormattedMessage
                      id="retailerList:learnMore"
                      defaultMessage="Learn More"
                    />
                  </span>
                ) : null}
                {active && id === CARREFOUR_ID ? (
                  <span
                    className={classNames(
                      "my-text my-color-main",
                      classes.learnMore
                    )}
                  >
                    <FormattedMessage
                      id="retailerList:edit"
                      defaultMessage="Edit"
                    />
                  </span>
                ) : null}
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
}

RetailerList.propTypes = {
  retailers: PropTypes.array,
  to: PropTypes.string,
  fromProfile: PropTypes.bool,
};
