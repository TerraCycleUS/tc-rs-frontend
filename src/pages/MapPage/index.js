import React, { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import FooterNav from "../../components/FooterNav";
import { debouncedGeocodingRequest, getMapItems, init1 } from "./mapUtils";
import ErrorPopup from "./ErrorPopup";
import LocationSearch from "../../components/LocationSearch";
import MapPointList from "../../components/MapPointList";
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
import LocationsHandler from "./LocationsHandler";
import RetailerHandler from "./RetailerHandler";
import useCategories from "../../utils/useCategories";

export default function MapPage() {
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showList, setShowList] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showDropOff, setShowDropOff] = useState(false);
  const [showLocationDropOff, setShowLocationDropOff] = useState(false);
  const [geocodedLocations, setGeocodedLocations] = useState([]);
  const [publicRetailers, setPublicRetailers] = useState([]);
  const [selectedRetailerIds, setSelectedRetailerIds] = useState([]);
  const [userRetailerIds, setuserRetailerIds] = useState([]);
  const [showRetailerList, setShowRetailerList] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const user = useSelector((state) => state.user);
  const apiCall = useApiCall();
  const locationDropOffApiCall = useApiCall();
  const addRetailerApiCall = useApiCall();
  const navigate = useNavigate();
  const [, updateMessage] = useMessageContext();
  const watchIdRef = useRef(-1);
  const domRef = useRef();
  const userMarkerRef = React.useRef();
  const mapRef = useRef();
  const lang = user?.lang || detectLanguage();
  const coordsRef = useRef({});
  const geocoderRef = useRef();
  const locationsHandlerRef = useRef(null);
  const retailerHandlerRef = useRef(null);
  function selectLocation(item) {
    setCurrentItem(item);
    setShowDetails(true);
  }

  function processGeocodingData(data) {
    if (!data) return;

    const { location } = data[0].geometry;

    const [lat, lng] = [location.lat(), location.lng()];
    const retailerIds = selectedRetailerIds.join(",") || undefined;
    getMapItems({
      retailerIds,
      multiple_retailers: true,
      lat,
      lng,
    })
      .then((data) =>
        data.map((location) =>
          locationsHandlerRef.current.addLocation(location)
        )
      )
      .then(setGeocodedLocations);
  }

  useEffect(() => {
    if (!retailerHandlerRef.current || !locationsHandlerRef.current) return;

    locationsHandlerRef.current.setLocations(
      allLocations.filter((loc) => selectedRetailerIds.includes(loc.retailerId))
    );
  }, [selectedRetailerIds]);

  useEffect(() => {
    apiCall(
      () =>
        init1({
          node: domRef.current,
          userMarkerNode: userMarkerRef.current,
          setErrorPopup,
          zoom: 14,
        }),
      async ({ lat, lng, locationWatchId, geocoder, map }) => {
        const locationsHandler = new LocationsHandler({
          map,
          onLocationSelect: selectLocation,
        });
        await initRetailerHandler();
        const selectedIds = retailerHandlerRef.current.getSelectedRetailerIds();
        const publicIds = retailerHandlerRef.current.getPublicRetailerIds();
        const locations = await getMapItems({
          retailerIds: publicIds.join(","),
        });

        locationsHandler.setLocations(
          locations.filter(({ retailerId }) => selectedIds.includes(retailerId))
        );
        setAllLocations(locations);
        locationsHandlerRef.current = locationsHandler;
        watchIdRef.current = locationWatchId;
        geocoderRef.current = geocoder;
        mapRef.current = map;
        coordsRef.current = { lat, lng };
        if (!lat || !lng) {
          map.setZoom(6);
        }
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

  const { categories } = useCategories();

  async function initRetailerHandler() {
    const retailerHandler = new RetailerHandler({
      language: lang,
      onRetailerFilterChange: setSelectedRetailerIds,
      onAddRetailer: setuserRetailerIds,
    });
    const { selectedRetailerIds, publicRetailers, userRetailerIds } =
      await retailerHandler.init();
    retailerHandlerRef.current = retailerHandler;
    setPublicRetailers(publicRetailers);
    setSelectedRetailerIds(selectedRetailerIds);
    setuserRetailerIds(userRetailerIds);
  }

  function selectLocationFromList(location) {
    if (
      !retailerHandlerRef.current.checkIfRetailerSelected(location.retailerId)
    ) {
      retailerHandlerRef.current.changeRetailerFilter(
        location.retailerId,
        true
      );
    }
    setShowList(false);
  }

  function renderList() {
    if (!showList) return "";
    return (
      <MapPointList
        publicRetailers={publicRetailers}
        selectedRetailerIds={selectedRetailerIds}
        geocodedLocations={geocodedLocations}
        searchValue={searchValue}
        className={classes.pointList}
        coords={coordsRef.current}
        locationsHandlerRef={locationsHandlerRef}
        onSelectLocation={selectLocationFromList}
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

  const canDropOff = !user || userRetailerIds.includes(currentItem?.retailerId);
  function proceedDropOff() {
    setShowDropOff(true);
  }

  function addRetailer() {
    addRetailerApiCall(
      () =>
        http.post("/api/retailer/assign", {
          retailerId: currentItem.retailerId,
        }),
      () => {
        retailerHandlerRef.current.addUserRetailer(currentItem.retailerId);
        proceedDropOff();
      }
    );
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
          selectedRetailerIds={selectedRetailerIds}
          retailerHandler={retailerHandlerRef.current}
          retailers={publicRetailers}
          closePop={() => setShowRetailerList(false)}
        />
      ) : null}

      {renderList()}
      <FooterNav className={classes.mapFooter} />
      {locationsHandlerRef.current ? (
        <CSSTransition
          mountOnEnter
          unmountOnExit
          timeout={600}
          in={currentItem && !showList && !errorPopup && showDetails}
        >
          <DetailsPopup
            item={currentItem}
            onClick={canDropOff ? proceedDropOff : addRetailer}
            onClose={() => {
              locationsHandlerRef.current.selectLocation(null);
              setShowDetails(false);
            }}
            categories={categories}
            canDropOff={canDropOff}
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
