import React from "react";
import QrScanner from "qr-scanner";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./Scanner.module.scss";

function invertColors(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // Red
    data[i + 1] = 255 - data[i + 1]; // Green
    data[i + 2] = 255 - data[i + 2]; // Blue
  }
}

export function useScanner({
  width,
  videoRef,
  canvasRef,
  successHandler,
  errorHandler,
  initSuccessHanlder,
  initErrorHandler,
  stopSuccessHandler,
  stopErrorHandler,
  controlsRef,
}) {
  const destroyRef = React.useRef(false);
  const timerRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const [initError, setInitError] = React.useState(null);

  const close = () => {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
  };

  const pause = () => {
    videoRef.current.pause();
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const play = (canvas, video) => {
    if (timerRef.current !== null) return;
    const ctx = canvas.getContext("2d");
    video.play();
    timerRef.current = setInterval(() => {
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Invert the frame colors

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      invertColors(imageData);
      ctx.putImageData(imageData, 0, 0);

      // Scan the processed frame
      QrScanner.scanImage(canvas)
        .then((decodedText) => {
          if (decodedText !== "") {
            ctx.clearRect(0, 0, width, width);
            successHandler(decodedText);
          }
        })
        .catch((err) => {
          errorHandler(err);
          console.warn(`Code scan error = ${err}`); // eslint-disable-line
        });
    }, 100); // Adjust the interval as needed
  };

  React.useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    video.style.width = `${width}px`;
    video.style.height = `${width}px`;
    canvas.width = width;
    canvas.height = width;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        streamRef.current = stream;
        video.play();
      })
      .then(() => {
        initSuccessHanlder();
        controlsRef.current = {
          pause: () => pause(),
          play: () => play(canvas, video),
        };
      })
      .catch((err) => {
        setInitError(err);
        initErrorHandler(err);
      });

    video.addEventListener("play", () => {
      play(canvas, video);
    });

    return () => {
      destroyRef.current = true;
      try {
        close();
        stopSuccessHandler();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        stopErrorHandler(e);
      }
    };
  }, []);

  return [{ initError }];
}

const noop = () => {};

export default function Scanner({
  width = window.innerWidth,
  padding = 16,
  successHandler,
  scannerConfig,
  errorHandler = noop,
  initSuccessHanlder = noop,
  initErrorHandler = noop,
  stopSuccessHandler = noop,
  stopErrorHandler = noop,
  withAim = true,
  hidePauseMessage = true,
  controlsRef,
}) {
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const W = width - padding * 2;
  const [{ initError }] = useScanner({
    width: W,
    successHandler,
    scannerConfig,
    errorHandler,
    initSuccessHanlder,
    initErrorHandler,
    videoRef,
    canvasRef,
    stopSuccessHandler,
    stopErrorHandler,
    controlsRef,
  });

  return (
    <div className={classes.wrapper} style={{ height: W }}>
      <div
        id="scanner"
        className={classNames({ hidePauseMessage })}
        style={{ width: W, height: W }}
      >
        <video
          id="qr-video"
          playsInline
          autoPlay
          ref={videoRef}
          muted
          className={classes.video}
        ></video>
        <canvas ref={canvasRef}></canvas>
        {initError ? <p>Error</p> : <p>Loading...</p>}
      </div>
      <div
        className="aim-wrapper"
        style={{ width: W, height: W, display: withAim ? "block" : "none" }}
      >
        <span className="aim aim-1"></span>
        <span className="aim aim-2"></span>
        <span className="aim aim-3"></span>
        <span className="aim aim-4"></span>
      </div>
    </div>
  );
}

Scanner.propTypes = {
  width: PropTypes.number,
  padding: PropTypes.number,
  successHandler: PropTypes.func.isRequired,
  scannerConfig: PropTypes.object,
  errorHandler: PropTypes.func,
  initSuccessHanlder: PropTypes.func,
  initErrorHandler: PropTypes.func,
  stopErrorHandler: PropTypes.func,
  stopSuccessHandler: PropTypes.func,
  withAim: PropTypes.bool,
  hidePauseMessage: PropTypes.bool,
  controlsRef: PropTypes.object,
};
