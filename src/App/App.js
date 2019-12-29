import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import GlobalStyle from "../styles/global.styles";
import dotenv from "dotenv";
import Header from "../components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../routes/Routes";
import { getWeatherData } from "../containers/Location/Location.actions";
import * as s from "../store/selectors";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";

dotenv.config();

function App({ do_getWeatherData, geoLocation_data, appTheme }) {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const keyCode = geoLocation_data;

    do_getWeatherData(keyCode, "current");
    do_getWeatherData(keyCode, "forecast");
  }, [geoLocation_data]);

  useEffect(() => {
    setTheme(appTheme);
  }, [appTheme]);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat_lon = `${position.coords.latitude},${position.coords.longitude}`;

      do_getWeatherData(lat_lon, "geoLocation");
    });
  } else {
    do_getWeatherData("215854", "current");
    do_getWeatherData("215854", "forecast");
  }

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <Wrapper>
        <GlobalStyle />

        <Router>
          <Header />
          <Routes />
        </Router>
      </Wrapper>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    // autoComplete
    geoLocation_data: s.selectorReceivingData(state, "geoLocation"),
    appTheme: s.selectorAppTheme(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    do_getWeatherData: (query, type) => dispatch(getWeatherData(query, type))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
