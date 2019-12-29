import api from "../../utils/config/api";
import axios from "axios";
import title_case from "../../utils/helpers/title_case";
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
  REMOVE_FROM_FAVORITES
} from "./Location.constants";

export const addToFavorites = cityInfo => {
  const newCityInfo = {
    id: cityInfo.currentWeatherData.id,
    forecast: cityInfo.forecastList,
    currentWeather: cityInfo.currentWeatherData
  };

  return {
    type: ADD_TO_FAVORITES,
    payload: newCityInfo
  };
};

export const removeFromFavorites = cityID => ({
  type: REMOVE_FROM_FAVORITES,
  payload: cityID
});

export const getWeatherData = (query, type) => {
  return function(dispatch) {
    const fetch_details = getFetchingDetails(query, type);

    dispatch({ type: fetch_details.FETCHING });

    return axios
      .get(fetch_details.API_URL)
      .then(response => {
        // Success
        const payload = getSortedData(response, type);

        dispatch({ type: fetch_details.FETCHED, payload });
      })
      .catch(error => {
        // Error
        dispatch({
          type: fetch_details.ERROR,
          payload: { msg: error.message, type }
        });
      });
  };
};

const getFetchingDetails = (query, type) => {
  const helper = {
    API_URL: "",
    FETCHING: "",
    FETCHED: "",
    ERROR: ""
  };

  switch (type) {
    case "geoLocation":
      helper.API_URL = api.geoLocation(query);
      helper.FETCHING = FETCHING_GEO_LOCATION;
      helper.FETCHED = FETCHED_GEO_LOCATION;
      helper.ERROR = FETCHING_GEO_LOCATION_ERROR;
      break;
    case "autoComplete":
      helper.API_URL = api.autocomplete(query);
      helper.FETCHING = FETCHING_AUTO_COMPLETE;
      helper.FETCHED = FETCHED_AUTO_COMPLETE;
      helper.ERROR = FETCHING_AUTO_COMPLETE_ERROR;
      break;
    case "current":
      helper.API_URL = api.current(query);
      helper.FETCHING = FETCHING_CURRENT_WEATHER;
      helper.FETCHED = FETCHED_CURRENT_WEATHER;
      helper.ERROR = FETCHING_CURRENT_WEATHER_ERROR;
      break;
    case "forecast":
      helper.API_URL = api.forecast(query);
      helper.FETCHING = FETCHING_FORECAST;
      helper.FETCHED = FETCHED_FORECAST;
      helper.ERROR = FETCHING_FORECAST_ERROR;
      break;

    default:
      break;
  }

  return helper;
};

const getSortedData = (response, type) => {
  switch (type) {
    case "geoLocation":
      return response.data.Key;

    case "autoComplete":
      const helper = {};
      response.data.map(item => {
        helper[item.LocalizedName] = {
          id: item.Key,
          cityName: item.LocalizedName
        };
      });
      return helper;

    case "current":
      const iconID = response.data[0].WeatherIcon;
      const weatherIconID =
        iconID.toString().length > 1 ? iconID : `0${iconID}`;

      let cityName = response.data[0].Link.slice(33);
      const indexOfEndCityName = cityName.indexOf("/");

      cityName = cityName.slice(0, indexOfEndCityName);
      cityName = title_case(cityName);

      return {
        cityName,
        weatherIconID,
        id: response.headers["x-request-id"],
        weatherText: response.data[0].WeatherText,
        date: response.data[0].LocalObservationDateTime,
        temp: {
          celsius: {
            value: response.data[0].Temperature.Metric.Value
          },
          fahrenheit: {
            value: response.data[0].Temperature.Imperial.Value
          }
        }
      };

    case "forecast":
      return response.data.DailyForecasts.map(item => {
        return {
          id: response.headers["x-request-id"],
          date: item.Date,
          temp: {
            min: {
              value: item.Temperature.Minimum.Value,
              unit: item.Temperature.Minimum.Unit
            },
            max: {
              value: item.Temperature.Maximum.Value,
              unit: item.Temperature.Maximum.Unit
            }
          }
        };
      });

    default:
      break;
  }
};
