import { Link } from "react-router-dom";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classes from "./RetailerList.module.scss";
import { ReactComponent as ForwardIcon } from "../../assets/icons/forward.svg";
import classNames from "classnames";

export default function RetailerList({ retailers, to }) {
  const sortedRetailers = useMemo(() => {
    const result = [...retailers];
    result.sort((a, b) => {
      if (a.disabled && !b.disabled) {
        return 1;
      } else if (!a.disabled && b.disabled) {
        return -1;
      }
      return 0;
    });
    return result;
  }, [retailers]);
  return (
    <ul className={classes.retailerList}>
      {sortedRetailers.map(
        ({
          id,
          name,
          smallLogo,
          userLoyaltyCode,
          userLoyaltyPassCode,
          disabled,
        }) => (
          <li
            key={id}
            className={classNames(classes.retailerItem, {
              [classes.disabled]: disabled,
            })}
          >
            <Link
              className={classes.retailerLink}
              to={
                disabled
                  ? undefined
                  : {
                      pathname: to,
                      search: `retailer=${id}`,
                    }
              }
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
              <ForwardIcon />
            </Link>
          </li>
        )
      )}
    </ul>
  );
}

RetailerList.propTypes = {
  retailers: PropTypes.array,
  to: PropTypes.string,
};
