import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import classNames from "classnames";
import queryString from "query-string";

import Button from "../../components/Button";
import Page from "../../Layouts/Page";
import classes from "./SelectRetailer.module.scss";
import { Swiper, SwiperSlide } from "../../utils/swiper";
import getWindowSize from "../../utils/getWindowSize";
import http from "../../utils/http";
import useApiCall from "../../utils/useApiCall";
import SwiperMenu from "../../components/SwiperMenu";
import WasteStream from "../../components/WasteStream";
import { CARREFOUR_ID, MONOPRIX_ID } from "../../utils/const";
import { ReactComponent as ForwardArrow } from "../../assets/icons/forward-arrow-right-black.svg";
import useCategories from "../../utils/useCategories";

export default function SelectRetailer() {
  const [activeRetailer, setActiveRetailer] = useState(0);
  const [retailers, setRetailers] = useState([]);
  const [userRetailers, setUserRetailers] = useState([]);
  const getRetailersApiCall = useApiCall();
  const location = useLocation();
  const retailerId = location?.state?.retailer;
  const params = queryString.parse(location.search);
  const { fromProfile, sign_up: signUp } = params;

  useEffect(() => {
    getRetailersApiCall(
      () => http.get("/api/retailer"),
      (response) => {
        setRetailers(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  useEffect(() => {
    getRetailersApiCall(
      () => http.get("/api/retailer/my-retailers"),
      (response) => {
        setUserRetailers(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  useEffect(() => {
    if (retailerId && retailers.length) {
      setActiveRetailer(
        retailers.findIndex((retailer) => retailer.id === retailerId)
      );
    }
  }, [retailers]);

  return (
    <Page
      width100
      noSidePadding
      backgroundGrey
      className={classNames("with-animation", classes.page)}
      innerClassName={classes.pageContent}
    >
      <p
        className={classNames(
          classes.topText,
          "text-center",
          "my-text-description",
          "my-color-textPrimary"
        )}
      >
        <FormattedMessage
          id="SelectRetailer:TopText"
          defaultMessage="Select a retailer to get started"
        />
      </p>
      <SwiperMenu
        retailers={retailers.map((retailer, index) => ({
          id: retailer.id,
          name: retailer.name,
          index,
        }))}
        setActiveRetailer={setActiveRetailer}
        activeRetailer={activeRetailer}
        useIndex
      />
      <RetailerCarousel
        retailers={retailers}
        activeRetailer={activeRetailer}
        setActiveRetailer={setActiveRetailer}
        userRetailers={userRetailers}
        fromProfile={!!fromProfile}
        signUp={signUp}
      />
    </Page>
  );
}

export function RetailerCarousel({
  activeRetailer,
  setActiveRetailer,
  retailers,
  userRetailers,
  fromProfile,
  signUp,
}) {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(getWindowSize().innerWidth);
  const [slidesShown, setSlidesShown] = useState(1.1);
  const [spaceBetween, setSpaceBetween] = useState(7);
  const [registerInProgress, setRegisterInProgress] = useState(false);
  const { categories } = useCategories();
  const assignRetailerApiCall = useApiCall();

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current?.swiper.slideTo(activeRetailer);
    }

    if (windowWidth > 1700) {
      setSlidesShown(4);
      setSpaceBetween(40);
    } else if (windowWidth > 1300) {
      setSlidesShown(3);
      setSpaceBetween(40);
    } else if (windowWidth > 991) {
      setSlidesShown(2);
      setSpaceBetween(30);
    } else if (windowWidth > 750) {
      setSlidesShown(1.8);
      setSpaceBetween(20);
    } else if (windowWidth > 560) {
      setSlidesShown(1.5);
      setSpaceBetween(15);
    } else {
      setSlidesShown(1.1);
      setSpaceBetween(7);
    }

    function handleWindowResize() {
      setWindowWidth(getWindowSize().innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [activeRetailer, windowWidth]);

  const registerHandler = (id) => {
    setRegisterInProgress(true);
    assignRetailerApiCall(
      () =>
        http.post(
          signUp
            ? "/api/retailer/assign-first-retailer"
            : "/api/retailer/assign",
          {
            retailerId: id,
          }
        ),
      () => navigate(fromProfile ? "/profile/retailer-list" : "/recycling-bin"),
      null,
      null,
      { message: false }
    );
  };

  function editOrRegister(id, name) {
    const alreadyHaveThis = userRetailers?.some(
      (retailer) => retailer.id === id
    );
    const thisRetailer = userRetailers?.find((retailer) => retailer.id === id);

    if (!alreadyHaveThis)
      return (
        <Button
          disabled={registerInProgress}
          data-testid="retailers-id"
          className={classes.registerLink}
          onClick={() => registerHandler(id)}
        >
          <FormattedMessage
            id="SelectRetailer:Register"
            defaultMessage="Register"
          />
        </Button>
      );

    return (
      <Link
        className={classNames(classes.registerLink, {
          [classes.noLink]: id === MONOPRIX_ID,
        })}
        to="/profile/retailer-id-edit"
        data-testid="retailers-id"
        state={{
          userLoyaltyCode: thisRetailer?.userLoyaltyCode,
          userLoyaltyPassCode: thisRetailer?.userLoyaltyPassCode,
          retailer: id,
          name,
        }}
      >
        <Button>
          <FormattedMessage id="SelectRetailer:Edit" defaultMessage="Edit" />
        </Button>
      </Link>
    );
  }

  const slideNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const slidePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  return (
    <Swiper
      spaceBetween={spaceBetween}
      onSlideChange={(swiper) => setActiveRetailer(swiper.activeIndex)}
      className={classes.carouselContainer}
      centeredSlides
      slidesPerView={slidesShown}
      ref={swiperRef}
    >
      {retailers.map(({ id, name, logo, backgroundImage, description }) => (
        <SwiperSlide key={id} className={classes.carouselItem}>
          <div className={classes.topPart}>
            <div className={classes.brandContainer}>
              <p className={classes.brandName}>{name}</p>
              <img className={classes.brandIcon} src={logo} alt="brand-icon" />
            </div>
            <img
              className={classes.shopPhoto}
              src={backgroundImage}
              alt="shop"
            />
            <p
              className={classes.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <p
              className={classNames(
                classes.createNow,
                { [classes.noLink]: id !== CARREFOUR_ID },
                "my-text-description my-color-textPrimary"
              )}
            >
              <FormattedMessage
                id="SelectRetailer:CreateNow"
                defaultMessage="Dont have a Carrefour ID? <link>Create now</link>"
                values={{
                  link: (chunks) => (
                    <Link
                      className="my-color-main"
                      to="/scan-or-type-carrefour"
                    >
                      {chunks}
                    </Link>
                  ),
                }}
              />
            </p>
            <p className={classes.whatToRecycle}>
              <FormattedMessage
                id="SelectRetailer:WhatToRecycle"
                defaultMessage="What can you recycle"
              />
            </p>
            <WasteStream
              categories={categories?.filter(
                (category) => category.retailerId === id
              )}
              enableLabels
            />
          </div>
          <div className={classes.bottomPart}>{editOrRegister(id, name)}</div>
        </SwiperSlide>
      ))}
      <button
        className={classNames(classes.navBtn, classes.navBtnPrev)}
        onClick={slidePrev}
        disabled={activeRetailer === 0}
      >
        <ForwardArrow />
      </button>
      <button
        className={classes.navBtn}
        onClick={slideNext}
        disabled={activeRetailer === retailers.length - 1}
      >
        <ForwardArrow />
      </button>
    </Swiper>
  );
}
RetailerCarousel.propTypes = {
  retailers: PropTypes.array,
  activeRetailer: PropTypes.number,
  setActiveRetailer: PropTypes.func,
  userRetailers: PropTypes.array,
  fromProfile: PropTypes.bool,
  signUp: PropTypes.bool,
};
