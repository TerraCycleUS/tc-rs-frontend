import queryString from "query-string";

export const AVAILABLE_LANGUAGES = {
  fr: true,
  en: true,
};

export const DEFAULT_LANGUAGE = "fr";

export const defaultRegistrationValues = {
  name: "",
  email: "",
  zipcode: "",
  terms: false,
  privacy: false,
  messages: false,
};

export const PASSWORD_REG =
  /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

export const MONOPRIX_ID = 1;
export const CARREFOUR_ID = 2;
export const WALLMART_ID = 3;

export const LOCATION_POLLING_TIMEOUT =
  queryString.parse(location.search).lto || 60 * 1000; // eslint-disable-line
