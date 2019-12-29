import React from "react";
import { connect } from "react-redux";
import Location from "../../components/Location/Location";
import * as s from "../../store/selectors";
import {
  addToFavorites,
  removeFromFavorites
} from "../Location/Location.actions";

const LocationContainer = props => {
  const {
    currentWeather_data,
    forecast_data,
    autoComplete_error,
    currentWeather_error,
    forecast_error,
    favorites,
    do_removeFromFavorites,
    do_addToFavorites,
    geoLocation_error
  } = props;

  const handleFavorite = (cityInfo, actionType) => {
    const inFavorites = isCityInFavList(cityInfo);

    if (inFavorites) {
      if (actionType === "toggleButton") return true;

      return do_removeFromFavorites(cityInfo.currentWeatherData.id);
    }

    if (actionType === "toggleEditList") return do_addToFavorites(cityInfo);
  };

  const isCityInFavList = cityInfo => {
    if (favorites) {
      for (const favoriteCityKey in favorites) {
        if (favoriteCityKey === cityInfo.currentWeatherData.id) return true;
      }
    }
    return false;
  };

  return (
    <Location
      currentWeatherData={currentWeather_data}
      forecastData={forecast_data}
      isCityInFavList={cityInfo => handleFavorite(cityInfo, "toggleButton")}
      toggleFavorite={cityInfo => handleFavorite(cityInfo, "toggleEditList")}
      error={
        autoComplete_error ||
        currentWeather_error ||
        forecast_error ||
        geoLocation_error
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    // geoLocation
    geoLocation_error: s.selectorFetchingError(state, "geoLocation"),
    // autoComplete
    autoComplete_error: s.selectorFetchingError(state, "autoComplete"),
    // currentWeather
    currentWeather_isLoading: s.selectorLoadingData(state, "currentWeather"),
    currentWeather_data: s.selectorReceivingData(state, "currentWeather"),
    currentWeather_error: s.selectorFetchingError(state, "currentWeather"),
    // forecast
    forecast_isLoading: s.selectorLoadingData(state, "forecast"),
    forecast_data: s.selectorReceivingData(state, "forecast"),
    forecast_error: s.selectorFetchingError(state, "forecast"),
    // favorites
    favorites: s.selectorFavorites(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    do_addToFavorites: cityInfo => dispatch(addToFavorites(cityInfo)),
    do_removeFromFavorites: cityID => dispatch(removeFromFavorites(cityID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer);
