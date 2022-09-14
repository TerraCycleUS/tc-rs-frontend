export function getPosition() {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10000,
      maximumAge: 60000,
    })
  })
}

export function watchPosition(successCallback, errorCallback, options) {
  return window.navigator.geolocation.watchPosition(
    successCallback,
    errorCallback,
    options,
  )
}
