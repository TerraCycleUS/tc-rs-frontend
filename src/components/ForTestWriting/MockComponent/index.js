import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function MockComponent({
  mockPromise,
  useApiCall,
  additionalParams,
}) {
  const effectMaker = useApiCall();
  const [check, setCheck] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  const { successCb, errorCb, finalCb, config } = additionalParams || {};

  useEffect(() => {
    effectMaker(() => mockPromise, successCb, errorCb, finalCb, config)
      .then((res) => {
        setCheck(true);
        setDisplayValue(JSON.stringify(res));
      })
      .catch((error) => {
        setCheck(false);
        setDisplayValue(JSON.stringify(error));
      });
  }, []);
  return (
    <>
      <div data-testid="api-call-mock">{check ? "resolved" : "rejected"}</div>
      <div data-testid="value-passed">{displayValue}</div>
    </>
  );
}

MockComponent.propTypes = {
  mockPromise: PropTypes.object,
  useApiCall: PropTypes.func,
  additionalParams: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
};
