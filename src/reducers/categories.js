import {
  SET_CATEGORIES_FR,
  SET_CATEGORIES_EN,
  SET_ERROR,
  SET_LOADING,
} from "../actions/categories";

const defaultState = {
  en: [],
  fr: [],
  error: null,
  loading: false,
};

export default function categoriesReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_CATEGORIES_EN:
      return {
        ...state,
        en: action.payload,
        error: null,
      };

    case SET_CATEGORIES_FR:
      return {
        ...state,
        fr: action.payload,
        error: null,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}
