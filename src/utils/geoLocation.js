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
      }
      return resolve(result)
    }
    window.navigator.geolocation.getCurrentPosition(successHandler, reject, {
      timeout: 10000,
      maximumAge: 60000,
    })
  })
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
    }
    return successCallback(result)
  }
  return window.navigator.geolocation.watchPosition(
    successHandler,
    errorCallback,
    options,
  )
}
