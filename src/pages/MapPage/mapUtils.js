/* global google */
import { Loader } from "@googlemaps/js-api-loader";

import { getPosition, watchPosition } from "../../utils/geoLocation";
import markerUrl from "../../assets/icons/map-marker.svg";
import monoprixMarkerUrl from "../../assets/icons/monoprix-marker.svg";
import wallmartMarkerUrl from "../../assets/icons/wallmart-marker.png";
import carrefourMarkerUrl from "../../assets/icons/carrefour-marker.png";
import http from "../../utils/http";
import createPopupClass from "./createPopupClass";
import { mapStyles } from "./mapStyles";
import { CARREFOUR_ID, MONOPRIX_ID, WALLMART_ID } from "../../utils/const";

function loadMap(loader, node, options) {
  return loader.load().then((google) => new google.maps.Map(node, options));
}

async function getMap({ setErrorPopup, node, zoom = 14 }) {
  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  const options = {
    center: {
      lat: 48.8566,
      lng: 2.3522,
    },
    zoom,
    styles: mapStyles,
    disableDefaultUI: true,
  };

  try {
    const currentPosition = await getPosition();
    const { latitude, longitude } = currentPosition.coords;
    options.center = {
      lat: latitude,
      lng: longitude,
    };
  } catch (err) {
    if (err instanceof window.GeolocationPositionError) {
      setErrorPopup(true);
    }
  }

  const map = await loadMap(loader, node, options);

  return map;
}

function addMarker(google, map, marker) {
  return new google.maps.Marker({
    position: marker.position,
    icon: marker.icon,
    map,
  });
}

export async function getMapItems(config = {}) {
  let response;
  try {
    response = await http.get("/api/map-items", {
      params: { ...config },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response = await http.get("/api/map-items/public", {
      params: { ...config },
    });
  }

  return response?.data;
}

export function processMapItem(item, map, onMarkerClick) {
  const { lat, lng } = item;
  const marker = addMarker(window.google, map, {
    position: { lat, lng },
    icon: getMarkerLogo(item.retailerId),
  });
  marker.addListener("click", (e) => onMarkerClick(item, map, e));
  item.marker = marker; // eslint-disable-line
  return item;
}

export function getSelectedRetailerIds(retailers) {
  const selectedRetailers = retailers.filter((retailer) => retailer.selected);
  return getRetailerIdsParamValue(selectedRetailers, retailers);
}

export function getRetailerIdsParamValue(retailers) {
  return retailers.map(({ id }) => id).join(",") || undefined;
}

export const getMarkerLogo = (retailerId) => {
  switch (retailerId) {
    case MONOPRIX_ID:
      return monoprixMarkerUrl;
    case CARREFOUR_ID:
      return carrefourMarkerUrl;
    case WALLMART_ID:
      return wallmartMarkerUrl;
    default:
      return markerUrl;
  }
};

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
}

export const debouncedGeocodingRequest = debounce((address, geocoder, cb) =>
  geocoder.geocode({ address }, cb)
);

function calculateLocationLimitFromZoom(zoomLevel) {
  const limit = 21 - zoomLevel;

  return limit ** 2;
}

export async function init1({ node, userMarkerNode, setErrorPopup, zoom }) {
  const map = await getMap({ setErrorPopup, node, zoom });
  let lat;
  let lng;
  let locationWatchId;
  let geocoder;
  try {
    const {
      coords: { latitude, longitude },
    } = await getPosition();
    lat = latitude;
    lng = longitude;
    const Popup = createPopupClass(window.google);
    const userMarker = new Popup(
      new google.maps.LatLng(latitude, longitude),
      userMarkerNode
    );
    userMarker.setMap(map);

    // eslint-disable-next-line
    locationWatchId = watchPosition(({ coords }) =>
      userMarker.setPosition(
        new google.maps.LatLng(coords.latitude, coords.longitude)
      )
    );
    geocoder = new google.maps.Geocoder();
  } catch (e) {
    console.log(e); // eslint-disable-line
  }

  const locations = await getMapItems({
    multiple_retailers: true,
    lat,
    lng,
  });

  return {
    locations,
    lat,
    lng,
    locationWatchId,
    geocoder,
    map,
  };
}

export async function getLocations(retailers, map) {
  const selectedRetailersIdMap = {};
  const selectedRetailers = retailers.filter((retailer) => retailer.selected);
  selectedRetailers.forEach(({ id }) => (selectedRetailersIdMap[id] = true));
  const retailerParam = getRetailerIdsParamValue(selectedRetailers);
  const { center } = map;
  const [lat, lng] = [center.lat(), center.lng()];
  const data = await getMapItems({
    retailerIds: retailerParam,
    lat,
    lng,
    multiple_retailers: true,
    limit: calculateLocationLimitFromZoom(map.zoom),
  });

  return data.filter((item) => selectedRetailersIdMap[item.retailerId]);
}

export const debouncedGetLocations = debounce(
  async (retailers, map, locationHandler) => {
    const locations = await getLocations(retailers, map);
    locationHandler.setLocations(locations);
  }
);

export function getDivisionIndexesFromLocations(locations) {
  if (!locations.length) return [];

  const sortedLocations = [...locations];
  sortedLocations.sort((a, b) => a.retailerId - b.retailerId);
  const divisionIndexes = [];
  let currentRetailerId = sortedLocations[0].retailerId;
  sortedLocations.forEach(({ retailerId }, i) => {
    if (retailerId !== currentRetailerId) {
      divisionIndexes.push(i);
      currentRetailerId = retailerId;
    }
  });
  return divisionIndexes;
}
