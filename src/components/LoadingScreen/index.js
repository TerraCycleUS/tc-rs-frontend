import React, { useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./LoadingScreen.module.scss";
import Frame1 from "../../assets/loader-frames/frame1.png";
import Frame2 from "../../assets/loader-frames/frame2.png";
import Frame3 from "../../assets/loader-frames/frame3.png";
import Frame4 from "../../assets/loader-frames/frame4.png";
import Frame5 from "../../assets/loader-frames/frame5.png";
import Frame6 from "../../assets/loader-frames/frame6.png";
import Frame7 from "../../assets/loader-frames/frame7.png";
import Frame8 from "../../assets/loader-frames/frame8.png";
import Frame9 from "../../assets/loader-frames/frame9.png";
import Frame10 from "../../assets/loader-frames/frame10.png";
import Frame11 from "../../assets/loader-frames/frame11.png";
import Frame12 from "../../assets/loader-frames/frame12.png";
import Frame13 from "../../assets/loader-frames/frame13.png";
import Frame14 from "../../assets/loader-frames/frame14.png";
import Frame15 from "../../assets/loader-frames/frame15.png";
import Frame16 from "../../assets/loader-frames/frame16.png";
import Frame17 from "../../assets/loader-frames/frame17.png";
import Frame18 from "../../assets/loader-frames/frame18.png";

const frames = [
  { id: 0, frameSrc: Frame1 },
  { id: 1, frameSrc: Frame2 },
  { id: 2, frameSrc: Frame3 },
  { id: 3, frameSrc: Frame4 },
  { id: 4, frameSrc: Frame5 },
  { id: 5, frameSrc: Frame6 },
  { id: 6, frameSrc: Frame7 },
  { id: 7, frameSrc: Frame8 },
  { id: 8, frameSrc: Frame9 },
  { id: 9, frameSrc: Frame10 },
  { id: 10, frameSrc: Frame11 },
  { id: 11, frameSrc: Frame12 },
  { id: 12, frameSrc: Frame13 },
  { id: 13, frameSrc: Frame14 },
  { id: 14, frameSrc: Frame15 },
  { id: 15, frameSrc: Frame16 },
  { id: 16, frameSrc: Frame17 },
  { id: 17, frameSrc: Frame18 },
];

export default function LoadingScreen() {
  const [currentFrame, setCurrentFrame] = useState(0);

  function isActive(id) {
    if (id === currentFrame) return classes.active;
    return "";
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentFrame((current) => {
        if (current < 17) return current + 1;
        return 0;
      });
    }, 50);
    // 40 also not bad???
    // 50 ms is relatively good
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={classes.loadingScreenWrapper}>
      <div className={classes.framesContainer}>
        {frames.map(({ id, frameSrc }) => (
          <img
            key={id}
            src={frameSrc}
            alt="frame"
            className={classNames(classes.frame, isActive(id))}
          />
        ))}
      </div>
    </div>
  );
}
