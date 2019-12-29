import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as s from "../../store/selectors";
import { getWeatherData } from "../../containers/Location/Location.actions";
import SearchBar from "../../components/SearchBar/SearchBar";

const SearchBarContainer = props => {
  const [isLoading, setIsLaoding] = useState(false);
  const [cityNames, setCityNames] = useState([]);
  const [inputError, setInputError] = useState("");

  const {
    do_getWeatherData,
    autoComplete_isLoading,
    autoComplete_data
  } = props;

  useEffect(() => {
    setIsLaoding(autoComplete_isLoading);
  }, [autoComplete_isLoading]);

  useEffect(() => {
    const cityNamesList = [];

    if (autoComplete_data !== null) {
      for (const cityName in autoComplete_data) {
        cityNamesList.push(cityName);
      }
    }

    if (cityNamesList.length) {
      setCityNames(cityNamesList);
    }
  }, [autoComplete_data]);

  const validAutoComplete = input => {
    var letters = /^[A-Za-z]+$/;
    if (input.match(letters)) {
      return do_getWeatherData(input, "autoComplete");
    } else {
      return setInputError("Please input alphabet characters only");
    }
  };

  return (
    <SearchBar
      getAutoComplete={input => validAutoComplete(input)}
      getCityWeather={cityName => {
        do_getWeatherData(autoComplete_data[cityName].id, "current");
        do_getWeatherData(autoComplete_data[cityName].id, "forecast");
      }}
      isLoading={isLoading}
      cityNames={cityNames}
      inputError={inputError}
    />
  );
};

const mapStateToProps = state => {
  return {
    autoComplete_isLoading: s.selectorLoadingData(state, "autoComplete"),
    autoComplete_data: s.selectorReceivingData(state, "autoComplete")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    do_getWeatherData: (query, type) => dispatch(getWeatherData(query, type))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer);
