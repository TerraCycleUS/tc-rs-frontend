const RETAILERS_ID_REGEX = /^(\d{1,6}|\d{6}[a-zA-Z0-9]{1,11})$/

export default function validateRetailersId(newValue) {
  return RETAILERS_ID_REGEX.test(newValue.join(''))
}
