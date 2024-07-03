import { Loader } from "@googlemaps/js-api-loader";
import { DEFAULT_REGION } from "./const";

export function getPosition() {
  return new Promise((resolve, reject) => {
    function successHandler(posObj) {
      const result = {
        ...posObj,
        coords: {
          ...posObj.coords,
          latitude: +posObj.coords.latitude,
          longitude: +posObj.coords.longitude,
        },
      };
      return resolve(result);
    }
    window.navigator.geolocation.getCurrentPosition(successHandler, reject, {
      timeout: 10000,
      maximumAge: 60000,
    });
  });
}

export function watchPosition(successCallback, errorCallback, options) {
  function successHandler(posObj) {
    const result = {
      ...posObj,
      coords: {
        ...posObj.coords,
        latitude: +posObj.coords.latitude,
        longitude: +posObj.coords.longitude,
      },
    };
    return successCallback(result);
  }
  return window.navigator.geolocation.watchPosition(
    successHandler,
    errorCallback,
    options
  );
}

export async function getRegion() {
  let region = DEFAULT_REGION;
  try {
    const google = await new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    }).load();
    const geocoder = new google.maps.Geocoder();
    const position = await getPosition();
    const { latitude, longitude } = position.coords;
    const { results } = await geocoder.geocode({
      location: {
        lat: latitude,
        lng: longitude,
      },
    });
    const { address_components: components } = results[0];
    const country = components.find((item) => item.types.includes("country"));
    if (country.short_name.toLowerCase() === "us") {
      region = "us";
    }
  } catch (error) {
    console.error(error); // eslint-disable-line
  }
  return region;
}
