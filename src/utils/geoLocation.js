export function getPosition(options) {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

export function watchPosition(successCallback, errorCallback, options) {
  return window.navigator.geolocation.watchPosition(
    successCallback,
    errorCallback,
    options,
  )
}
