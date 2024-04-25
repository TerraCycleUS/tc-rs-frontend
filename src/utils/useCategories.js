import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import http from "./http";
import {
  setCategories,
  setCategoryError,
  setCategoryLoading,
} from "../actions/categories";
import { detectLanguage } from "./intl";

export default function useCategories(lang) {
  const [categories, user] = useSelector((state) => [
    state.categories,
    state.user,
  ]);
  const dispatch = useDispatch();

  lang = lang || user?.lang || detectLanguage();

  useEffect(() => {
    if (categories[lang].length) return;
    dispatch(setCategoryLoading(true));
    http
      .get(`/api/category/public?lang=${lang}`)
      .then(({ data }) => {
        dispatch(setCategories(data, lang));
        dispatch(setCategoryLoading(false));
      })
      .catch((error) => {
        dispatch(setCategoryError(error));
        dispatch(setCategoryLoading(false));
      });
  }, [lang]);

  return {
    categories: categories[lang],
    loading: categories.loading,
    error: categories.error,
  };
}
