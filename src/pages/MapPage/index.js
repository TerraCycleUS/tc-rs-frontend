import React, { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import FooterNav from "../../components/FooterNav";
import init, {
  debouncedGeocodingRequest,
  getMapItems,
  getMappedLocations,
  getMarkerLogo,
  getNewMarkers,
  getRetailerIdsParamValue,
} from "./mapUtils";
import ErrorPopup from "./ErrorPopup";
import LocationSearch from "../../components/LocationSearch";
import MapPointList from "../../components/MapPointList";
import markerSelectedUrl from "../../assets/icons/marker-selected.svg";
import DetailsPopup from "./DetailsPopup";
import DropOffPopup from "../../components/PopUps/DropOff";
import LocationDropOffPopup from "../../components/PopUps/LocationDropOff";
import useApiCall from "../../utils/useApiCall";
import LoadingScreen from "../../components/LoadingScreen";
import classes from "./MapPage.module.scss";
import { getPosition } from "../../utils/geoLocation";
import { ReactComponent as Navigate } from "../../assets/icons/green-arrow-navigate.svg";
import http from "../../utils/http";
import ChooseRetailers from "../../components/PopUps/ChooseRetailers";
import { detectLanguage } from "../../utils/intl";
import { useMessageContext } from "../../context/message";
import { MONOPRIX_ID } from "../../utils/const";
import Button from "../../components/Button";

export default function MapPage() {
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [locations, setLocations] = useState([]);
  const [showList, setShowList] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showDropOff, setShowDropOff] = useState(false);
  const [showLocationDropOff, setShowLocationDropOff] = useState(false);
  const [geocodedLocations, setGeocodedLocations] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [publicRetailers, setPublicRetailers] = useState([]);
  const [showRetailerList, setShowRetailerList] = useState(false);
  const user = useSelector((state) => state.user);
  const apiCall = useApiCall();
  const getMyRetailersApiCall = useApiCall();
  const locationDropOffApiCall = useApiCall();
  const navigate = useNavigate();
  const [, updateMessage] = useMessageContext();

  const watchIdRef = useRef(-1);
  const domRef = useRef();
  const userMarkerRef = React.useRef();
  const mapRef = useRef();
  const lang = user?.lang || detectLanguage();
  const coordsRef = useRef({});
  const geocoderRef = useRef();

  function selectMarker(item) {
    const { lat, lng } = item;
    setCurrentItem((prevMarker) => {
      if (item.id === prevMarker?.id) return prevMarker;

      item.marker.setIcon(markerSelectedUrl);
      prevMarker?.marker.setIcon(getMarkerLogo(prevMarker.retailerId));
      return item;
    });
    setShowDetails(true);
    mapRef.current.panTo({ lat, lng });
  }

  function resetIcon(marker) {
    marker.marker.setIcon(getMarkerLogo(marker.retailerId));
  }

  function resetMarker() {
    setCurrentItem((prevMarker) => {
      resetIcon(prevMarker);
      return null;
    });
  }

  function processGeocodingData(data) {
    if (!data) return;

    const { location } = data[0].geometry;

    const [lat, lng] = [location.lat(), location.lng()];
    const retailerIds = getRetailerIdsParamValue(retailers, publicRetailers);
    getMapItems({
      retailerIds,
      multiple_retailers: true,
      lat,
      lng,
    })
      .then((data) => getMappedLocations(data, mapRef.current, selectMarker))
      .then(setGeocodedLocations);
  }

  const zoomChangeHandler = () => {
    const { lat, lng } = coordsRef.current;
    getNewMarkers({
      retailers,
      setLocations,
      locations,
      map: mapRef.current,
      onMarkerClick: selectMarker,
      lat,
      lng,
    });
  };
  // console.log(retailers);
  useEffect(() => {
    apiCall(
      () =>
        init({
          setErrorPopup,
          setLocations,
          node: domRef.current,
          userMarkerNode: userMarkerRef.current,
          watchIdRef,
          onMarkerClick: selectMarker,
          geocoderRef,
        }),
      async ([map, lat, lng]) => {
        mapRef.current = map;
        coordsRef.current = { lat, lng };
        map.addListener("zoom_changed", zoomChangeHandler);
        // map.addListener("center_changed", function () {
        //   console.log(this.center);
        // });
      },
      null,
      () => setLoading(false)
    );

    return () => navigator.geolocation.clearWatch(watchIdRef.current);
  }, []);

  useEffect(() => {
    if (searchValue)
      debouncedGeocodingRequest(
        searchValue,
        geocoderRef.current,
        processGeocodingData
      );
    else {
      setGeocodedLocations([]);
    }
  }, [searchValue]);

  const [categories, setCategories] = useState([]);
  const getCategoriesApiCall = useApiCall();

  useEffect(() => {
    getCategoriesApiCall(
      () => http.get(`/api/category/public?lang=${lang}`),
      (response) => {
        setCategories(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const { lat, lng } = coordsRef.current;
    getNewMarkers({
      retailers,
      setLocations,
      locations,
      map: mapRef.current,
      onMarkerClick: selectMarker,
      lat,
      lng,
    });
  }, [retailers]);

  function getRetailers() {
    return Promise.all([
      http.get("/api/retailer/my-retailers"),
      http.get(`/api/retailer/public-retailers?lang=${lang}`),
    ]);
  }

  useEffect(() => {
    getMyRetailersApiCall(
      () => getRetailers(),
      ([myRetailersRes, publicRetailersRes]) => {
        const myRetailerIds = myRetailersRes.data.map(({ id }) => id);
        const result = publicRetailersRes.data.map((item) => ({
          ...item,
          selected: myRetailerIds.includes(item.id),
        }));
        setRetailers(result);
        mapRef.current.retailers = result;
        setPublicRetailers(publicRetailersRes.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  function renderList() {
    if (!showList) return "";
    return (
      <MapPointList
        retailers={retailers}
        publicRetailers={publicRetailers}
        geocodedLocations={geocodedLocations}
        locations={locations}
        searchValue={searchValue}
        className={classes.pointList}
        coords={coordsRef.current}
        map={mapRef.current}
        setCurrentItem={(item) => {
          selectMarker(item);
          setShowList(false);
        }}
      />
    );
  }

  async function startScan() {
    const { location, address, city, id, retailerId } = currentItem;
    if (retailerId === MONOPRIX_ID) {
      navigate({
        pathname: "/scan",
        search: queryString.stringify({
          location,
          address,
          city,
          id,
          retailerId,
        }),
      });
      return;
    }

    const { lat, lng } = coordsRef.current;
    const [res] =
      lat !== undefined && lng !== undefined
        ? await locationDropOffApiCall(() =>
            http.get("/api/map-items/public", { params: coordsRef.current })
          )
        : [{ data: [] }];
    const nearLocations = res.data;
    const neededLocation = nearLocations.find((item) => item.id === id);
    if (neededLocation) {
      setShowDropOff(false);
      setShowLocationDropOff(true);
      return;
    }

    setShowDropOff(false);
    setShowDetails(false);

    updateMessage({
      type: "error",
      text: (
        <FormattedMessage
          id="mapPage:LocationNotFound"
          defaultMessage="Location not found"
        />
      ),
    });
  }

  function startDropOff() {
    const { location, address, city, id, retailerId } = currentItem;
    navigate({
      pathname: "/drop-off",
      search: queryString.stringify({
        location,
        address,
        city,
        id,
        retailerId,
      }),
    });
  }

  useEffect(() => {
    if (errorPopup === true) {
      setLoading(false);
    }
  }, [errorPopup]);

  function renderLoader() {
    if (loading) return <LoadingScreen />;
    return null;
  }

  async function backToUserLocation() {
    try {
      const currentPosition = await getPosition();
      const { latitude, longitude } = currentPosition.coords;
      mapRef.current.panTo({ lat: latitude, lng: longitude });
    } catch (err) {
      if (err instanceof window.GeolocationPositionError) {
        setErrorPopup(true);
      }
    }
  }

  function proceedDropOff() {
    setShowDropOff(true);
  }

  function onCancelDropOff() {
    setShowLocationDropOff(false);
  }

  return (
    <div className={classNames(classes.mapPageWrap, "hide-on-exit")}>
      <div id="map" ref={domRef} data-testid="map" />
      <LocationSearch
        className={classes.searchBar}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        focused={showList}
        setFocus={setShowList}
      />
      <div className={classes.magickResizer}>
        <Button
          onClick={() => setShowRetailerList(true)}
          className={classes.filteringBtn}
          type="button"
          notFullWidth
        >
          <FormattedMessage
            id="mapPage:FilterButton"
            defaultMessage="See more stores"
          />
        </Button>
      </div>
      <button
        onClick={() => backToUserLocation()}
        className={classes.centering}
        type="button"
        data-testid="centering-btn"
      >
        <Navigate className={classes.navigateIcon} />
      </button>
      <div
        id="user"
        data-testid="user"
        ref={userMarkerRef}
        className="d-flex justify-content-center align-items-center"
      />
      {errorPopup ? <ErrorPopup onClick={() => setErrorPopup(false)} /> : null}
      {showRetailerList ? (
        <ChooseRetailers
          setRetailers={setRetailers}
          retailers={retailers}
          closePop={() => setShowRetailerList(false)}
        />
      ) : null}

      {renderList()}
      <FooterNav className={classes.mapFooter} />
      {locations.length ? (
        <CSSTransition
          mountOnEnter
          unmountOnExit
          timeout={600}
          in={currentItem && !showList && !errorPopup && showDetails}
          onExited={resetMarker}
        >
          <DetailsPopup
            item={currentItem || locations[0]}
            onClick={() => proceedDropOff()}
            onClose={() => {
              resetIcon(currentItem);
              setShowDetails(false);
            }}
            categories={categories}
          />
        </CSSTransition>
      ) : null}
      {showDropOff ? (
        <DropOffPopup
          setShow={setShowDropOff}
          onStart={startScan}
          retailerId={currentItem.retailerId}
        />
      ) : null}
      {showLocationDropOff ? (
        <LocationDropOffPopup
          onStart={startDropOff}
          brand={currentItem.brand}
          location={currentItem.location}
          onCancel={onCancelDropOff}
        />
      ) : null}
      {renderLoader()}
    </div>
  );
}
