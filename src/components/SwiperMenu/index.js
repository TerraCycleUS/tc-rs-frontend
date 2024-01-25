import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./SwiperMenu.module.scss";
import { Swiper, SwiperSlide } from "../../utils/swiper";
import detectIos from "../../utils/detectIos";

export default function SwiperMenu({
  retailers,
  setActiveRetailer,
  activeRetailer,
  className,
  useIndex,
}) {
  const [isIos] = useState(detectIos());
  const swiperRef = useRef(null);

  function chooseRetailer(id, index) {
    if (useIndex) setActiveRetailer(index);
    else setActiveRetailer(id);
  }

  function isDisabled(id, index) {
    if (useIndex) return activeRetailer === index;
    return activeRetailer === id;
  }

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current?.swiper.slideTo(activeRetailer);
    }
  }, [activeRetailer]);

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={8}
      cssMode={isIos}
      className={classNames(classes.menuWrapper, className)}
      ref={swiperRef}
      onSlideChange={(swiper) => setActiveRetailer(swiper.activeIndex)}
    >
      {retailers?.map(({ id, name, index }) => (
        <SwiperSlide className={classes.slide} key={id}>
          <button
            type="button"
            id={id}
            onClick={() => chooseRetailer(id, index)}
            disabled={isDisabled(id, index)}
            className={classes.menuItem}
          >
            {name}
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

SwiperMenu.propTypes = {
  retailers: PropTypes.array,
  setActiveRetailer: PropTypes.func,
  activeRetailer: PropTypes.number,
  className: PropTypes.string,
  useIndex: PropTypes.bool,
};
