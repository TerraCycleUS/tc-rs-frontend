export const SET_CATEGORIES_EN = "set_categories_en";
export const SET_CATEGORIES_FR = "set_categories_fr";
export const SET_ERROR = "set_error";
export const SET_LOADING = "set_loading";

export function setCategories(payload, lang) {
  return {
    type: lang === "en" ? SET_CATEGORIES_EN : SET_CATEGORIES_FR,
    payload,
  };
}

export function setCategoryError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export function setCategoryLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}
