import userReducer from "./user";
import setTutorialReducer from "./seenTutorial";
import setBinTutorialReducer from "./seenBinTutorial";
import locationReducer from "./location";
import setAddToFavoritesReducer from "./addToFavorites";
import categoriesReducer from "./categories";

export default function rootReducer(state = {}, action = {}) {
  return {
    user: userReducer(state.user, action),
    seenTutorial: setTutorialReducer(state.seenTutorial, action),
    seenBinTutorial: setBinTutorialReducer(state.seenBinTutorial, action),
    location: locationReducer(state.location, action),
    addToFavorites: setAddToFavoritesReducer(state.addToFavorites, action),
    categories: categoriesReducer(state.categories, action),
  };
}
