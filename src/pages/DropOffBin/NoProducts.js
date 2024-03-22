import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

export default function NoProducts({ onReset }) {
  return (
    <div className="text-center d-flex flex-column justify-content-center flex-grow-1">
      <p className="my-text my-color-textPrimary mb-3">
        <FormattedMessage
          id="dropOffBin:NotAccepted"
          defaultMessage="This waste stream is not accepted at this kiosk."
        />
      </p>
      <button onClick={onReset} className="my-text-primary my-color-main">
        <FormattedMessage
          id="dropOffBin:ResetFilter"
          defaultMessage="Reset filter"
        />
      </button>
    </div>
  );
}

NoProducts.propTypes = {
  onReset: PropTypes.func,
};
