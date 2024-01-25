import PropTypes from "prop-types";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import React from "react";
import classes from "../CouponItems/CouponItems.module.scss";
import formatDate from "../../utils/formatDate";

export default function UnlockedCouponDate({
  startDate,
  forLanding,
  status,
  expirationDate,
}) {
  function checkIfDueDate() {
    const dateObj = new Date(startDate);
    const todaysDate = new Date();
    return todaysDate >= dateObj;
  }

  function getClassForLanding() {
    if (!forLanding) return "";
    return classes.landing;
  }

  if (!checkIfDueDate(startDate))
    return (
      <Waiting startDate={startDate} landingClass={getClassForLanding()} />
    );
  return (
    <Ready
      endDate={expirationDate}
      landingClass={getClassForLanding()}
      status={status}
    />
  );
}

UnlockedCouponDate.propTypes = {
  startDate: PropTypes.string,
  forLanding: PropTypes.bool,
  status: PropTypes.string,
  expirationDate: PropTypes.string,
};

export function Waiting({ startDate, landingClass }) {
  return (
    <p className={classNames("my-text", classes.available, landingClass)}>
      <FormattedMessage
        id="activeCouponItems:Waiting"
        defaultMessage="Coming soon | Available from: {startDate}"
        values={{ startDate: formatDate(startDate) }}
      />
    </p>
  );
}

Waiting.propTypes = {
  startDate: PropTypes.string,
  landingClass: PropTypes.string,
};

export function Ready({ endDate, landingClass, status }) {
  return status === "ACTIVE" ? (
    <p
      className={classNames(
        "my-text",
        classes.available,
        classes.active,
        landingClass
      )}
    >
      <FormattedMessage
        id="activeCouponItems:Active"
        defaultMessage="Active | Valid until: {endDate}"
        values={{ endDate: formatDate(endDate) }}
      />
    </p>
  ) : (
    <p className={classNames("my-text", classes.available, landingClass)}>
      <FormattedMessage
        id="activeCouponItems:Inactive"
        defaultMessage="Valid until: {endDate}"
        values={{ endDate: formatDate(endDate) }}
      />
    </p>
  );
}

Ready.propTypes = {
  endDate: PropTypes.string,
  landingClass: PropTypes.string,
  status: PropTypes.string,
};
