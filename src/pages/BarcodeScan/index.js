import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

import Scanner from "../../components/Scanner";
import { ReactComponent as ForwardArrow } from "../../assets/icons/forward-arrow.svg";
import classes from "./BarcodeScan.module.scss";
import http from "../../utils/http";
import useApiCall from "../../utils/useApiCall";
import { takePictureFromVideo } from "../../components/Camera";
import Button from "../../components/Button";
import CameraDenied from "../../components/PopUps/CameraDenied";

export default function BarcodeScan() {
  const width =
    window.innerWidth >= 768 ? window.innerWidth / 2 : window.innerWidth;
  const navigate = useNavigate();
  const location = useLocation();
  const scannerRef = React.useRef(null);
  const apiCall = useApiCall();
  const [barcode, setBarcode] = useState();
  const [showPop, setShowPop] = useState(false);

  function successCb({ data }) {
    const { canvasElement } = scannerRef.current;
    const url = takePictureFromVideo({
      canvasEl: document.createElement("canvas"),
      videoEl: canvasElement,
      type: "image/png",
      height: 480,
      width: 480,
    });
    const state = {
      productPhoto: url,
      fromScanner: true,
    };
    if (data.id && data.name) {
      state.currentBrand = { value: data.id, label: data.name };
      state.categories = data.categories;
    }
    navigate({ pathname: "../save-item", search: location.search }, { state });
  }

  function sendCode() {
    apiCall(() => http.get(`/api/barcode/${barcode}`), successCb, reset);
  }

  function reset() {
    setBarcode(null);
    scannerRef.current.resume();
  }

  const buttons = barcode ? (
    <>
      <Button className={classes.continueBtn} onClick={sendCode}>
        <FormattedMessage id="barcodeScan:Continue" defaultMessage="Continue" />
      </Button>
      <Button onClick={reset} inverted>
        <FormattedMessage id="barcodeScan:Retry" defaultMessage="Scan again" />
      </Button>
    </>
  ) : null;

  return (
    <div
      className={classNames(
        "scan-page-wrapper container",
        classes.wrapper,
        "hide-on-exit"
      )}
    >
      <button
        type="button"
        className={classes.backBtn}
        onClick={() => navigate(-1)}
      >
        <ForwardArrow className="w-100 h-100" />
      </button>
      <Scanner
        withAim={!barcode}
        successHandler={(value) => {
          scannerRef.current.pause(true);
          setBarcode(value);
        }}
        initSuccessHanlder={(ins) => {
          scannerRef.current = ins;
        }}
        initErrorHandler={() => {
          setShowPop(true);
        }}
        width={width}
      />
      <p
        className={classNames(
          "my-text-primary text-center",
          classes.description
        )}
      >
        {barcode ? (
          <FormattedMessage
            id="barcodeScan:BarcodeCaptured"
            defaultMessage="Barcode captured"
          />
        ) : (
          <FormattedMessage
            id="barcodeScan:Description"
            defaultMessage="Please scan the bar code code on the product or the packaging."
          />
        )}
      </p>
      {buttons}
      {showPop && <CameraDenied setShowPop={setShowPop} />}
    </div>
  );
}
