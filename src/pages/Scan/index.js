import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useIntl, FormattedMessage } from "react-intl";

import queryString from "query-string";
import Scanner from "../../components/Scanner";
import { ReactComponent as ForwardArrow } from "../../assets/icons/forward-arrow.svg";
import classes from "./Scan.module.scss";
import { useMessageContext } from "../../context/message";
import CameraDenied from "../../components/PopUps/CameraDenied";

export default function Scan() {
  const width =
    window.innerWidth >= 768 ? window.innerWidth / 2 : window.innerWidth;
  const navigate = useNavigate();
  const location = useLocation();
  const { formatMessage } = useIntl();
  const [, updateMessage] = useMessageContext();
  const scannerRef = React.useRef(null);
  const [qrCode, setQrCode] = useState();
  const [showPop, setShowPop] = useState(false);

  useEffect(() => {
    const params = queryString.parse(location.search);
    location.search = queryString.stringify({ ...params, qrCode });
  }, [qrCode]);

  function successCb() {
    updateMessage(
      {
        type: "success",
        text: formatMessage({
          id: "scan:Success",
          defaultMessage: "Location successfully identified",
        }),
        onClose: () =>
          navigate({ pathname: "/drop-off", search: location.search }),
      },
      5000
    );
  }

  function errorCb() {
    updateMessage(
      {
        type: "error",
        text: formatMessage({
          id: "scan:Fail",
          defaultMessage: "Location successfully identified",
        }),
      },
      5000
    );
    scannerRef.current.resume();
  }

  function sendCode(code) {
    setQrCode(code);

    if (code === process.env.REACT_APP_MONOPRIX_STORE_QR) {
      successCb();
    } else {
      errorCb();
    }
  }

  return (
    <div
      className={classNames(
        "scan-page-wrapper container",
        classes.wrapper,
        "hide-on-exit"
      )}
    >
      <button
        className={classes.arrowBtn}
        type="button"
        onClick={() => navigate(-1)}
      >
        <ForwardArrow className="w-100 h-100" />
      </button>
      <Scanner
        successHandler={(value) => {
          scannerRef.current.pause(true);
          sendCode(value);
        }}
        initSuccessHanlder={(ins) => {
          scannerRef.current = ins;
        }}
        initErrorHandler={() => {
          // let text = err
          // try {
          //   text = formatMessage(errors[getErrorType(err)])
          // } catch (e) {
          //   console.log(e) // eslint-disable-line
          // }

          setShowPop(true);
          // else updateMessage({ type: 'error', text })
        }}
        width={width}
      />
      <p
        className={classNames(
          "my-text-primary text-center",
          classes.description
        )}
      >
        <FormattedMessage
          id="scan:Description"
          defaultMessage="Please scan the second QR code on the in-store kiosk."
        />
      </p>
      {showPop && <CameraDenied setShowPop={setShowPop} />}
    </div>
  );
}
