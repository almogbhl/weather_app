import produce from "immer";

import {
  FETCHING_GEO_LOCATION,
  FETCHED_GEO_LOCATION,
  FETCHING_GEO_LOCATION_ERROR,
  FETCHING_AUTO_COMPLETE,
  FETCHED_AUTO_COMPLETE,
  FETCHING_AUTO_COMPLETE_ERROR,
  FETCHING_CURRENT_WEATHER,
  FETCHED_CURRENT_WEATHER,
  FETCHING_CURRENT_WEATHER_ERROR,
  FETCHING_FORECAST,
  FETCHED_FORECAST,
  FETCHING_FORECAST_ERROR,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CHANGE_CITY
} from "./Location.constants";

export const initialState = {
  geoLocation: { data: null, isLoading: false, error: null },
  autoComplete: { data: null, isLoading: false, error: null },
  currentWeather: { data: null, isLoading: false, error: null },
  forecast: { data: null, isLoading: false, error: null },
  favorites: null
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // ======================================================
      // -------------------- AUTO COMPLETE -------------------
      // ======================================================
      case FETCHING_GEO_LOCATION:
        draft.geoLocation.isLoading = true;
        draft.geoLocation.error = "";
        break;
      case FETCHED_GEO_LOCATION:
        draft.geoLocation.isLoading = false;
        draft.geoLocation.data = action.payload;
        draft.geoLocation.error = "";
        break;
      case FETCHING_GEO_LOCATION_ERROR:
        draft.geoLocation.isLoading = false;
        draft.geoLocation.error = action.payload;
        break;

      // ======================================================
      // -------------------- AUTO COMPLETE -------------------
      // ======================================================
      case FETCHING_AUTO_COMPLETE:
        draft.autoComplete.isLoading = true;
        draft.autoComplete.error = "";
        break;
      case FETCHED_AUTO_COMPLETE:
        draft.autoComplete.isLoading = false;
        draft.autoComplete.data = action.payload;
        draft.autoComplete.error = "";
        break;
      case FETCHING_AUTO_COMPLETE_ERROR:
        draft.autoComplete.isLoading = false;
        draft.autoComplete.error = action.payload;
        break;

      // ======================================================
      // ------------------ CURRENT WEATHER -------------------
      // ======================================================
      case FETCHING_CURRENT_WEATHER:
        draft.currentWeather.isLoading = true;
        draft.currentWeather.error = "";
        break;
      case FETCHED_CURRENT_WEATHER:
        draft.currentWeather.isLoading = false;
        draft.currentWeather.data = action.payload;
        draft.currentWeather.error = "";
        break;
      case FETCHING_CURRENT_WEATHER_ERROR:
        draft.currentWeather.isLoading = false;
        draft.currentWeather.error = action.payload;
        break;

      // ======================================================
      // ---------------------- FORECAST ----------------------
      // ======================================================
      case FETCHING_FORECAST:
        draft.forecast.isLoading = true;
        draft.forecast.error = "";
        break;
      case FETCHED_FORECAST:
        draft.forecast.isLoading = false;
        draft.forecast.data = action.payload;
        draft.forecast.error = "";
        break;
      case FETCHING_FORECAST_ERROR:
        draft.forecast.isLoading = false;
        draft.forecast.error = action.payload;
        break;

      // ======================================================
      // ---------------------- FAVORITES ---------------------
      // ======================================================
      case ADD_TO_FAVORITES:
        draft.favorites = {
          ...draft.favorites,
          [action.payload.id]: action.payload
        };
        break;
      case REMOVE_FROM_FAVORITES:
        const newFavList = { ...draft.favorites };
        delete newFavList[action.payload];
        draft.favorites = newFavList;
        break;

      // ======================================================
      // -------------------- CHANGE CITY ---------------------
      // ======================================================
      case CHANGE_CITY:
        draft.currentWeather.data = action.payload.currentWeather; 
        draft.forecast.data = action.payload.forecast;
        break;
     

      default:
        return state;
    }
  });
};
