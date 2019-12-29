import React from "react";
import styled from "styled-components";
import List from "../List/List";
import Button from "@material-ui/core/Button";
import { FavoriteSharp } from "@material-ui/icons";
import { red, deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const Location = ({
  currentWeatherData,
  forecastData,
  error,
  toggleFavorite,
  isCityInFavList,
  isCelsius = true
}) => {
  const classes = useStyles();
  let cityName = "";
  let weatherText = "";
  let celsius = "";
  let fahrenheit = "";
  let degreesType = "";
  let degreesValue = "";
  let weatherIconID = "";
  let errorMsg = "";
  let isFavorites = false;
  let inFavorites = false;
  let forecastList = [];

  if (forecastData) {
    forecastList = forecastData;
  }

  if (currentWeatherData) {
    cityName = currentWeatherData.cityName;
    weatherIconID = currentWeatherData.weatherIconID;
    weatherText = currentWeatherData.weatherText;
    celsius = Math.ceil(currentWeatherData.temp.celsius.value);
    fahrenheit = Math.ceil(currentWeatherData.temp.fahrenheit.value);
    degreesType = isCelsius ? "C" : "F";
    degreesValue = isCelsius ? celsius : fahrenheit;
    inFavorites = isCityInFavList({ currentWeatherData, forecastList });
    isFavorites =
      inFavorites === true ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES";
  }

  if (error) {
    errorMsg = `${error.type}: ${error.msg}`;
  }

  return (
    <S.Container>
      {currentWeatherData && (
        <S.TopBox>
          <S.TopBar>
            <S.InfoMain>
              <S.InfoImage
                src={`https://developer.accuweather.com/sites/default/files/${weatherIconID}-s.png`}
                alt="degrees"
              />
              <S.InfoSub>
                <S.Info>{cityName}</S.Info>
                <S.Info>
                  {degreesValue} {degreesType}
                </S.Info>
              </S.InfoSub>
            </S.InfoMain>
            <Button
              style={{
                color: deepPurple[50],
                backgroundColor: "transparent",
                border: "1px solid lightgrey",
                fontSize: 10
              }}
              variant="contained"
              className={classes.button}
              onClick={() =>
                toggleFavorite({ currentWeatherData, forecastList })
              }
              startIcon={
                <FavoriteSharp
                  style={{
                    color: inFavorites === true ? red[400] : deepPurple[50],
                    fontSize: 30
                  }}
                />
              }
            >
              {isFavorites}
            </Button>
          </S.TopBar>
          <S.CurrentWeather>
            {<S.Title>{weatherText}</S.Title>}
          </S.CurrentWeather>
        </S.TopBox>
      )}

      <S.ErrorMsg>{errorMsg}</S.ErrorMsg>
      
      <List data={forecastList} listType="mainList" />
    </S.Container>
  );
};

export default Location;

const S = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

S.TopBox = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  height: 60%;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
`;

S.TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

S.InfoMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`;
S.InfoSub = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
`;

S.InfoImage = styled.img`
  height: 100%;
`;

S.Info = styled.p`
  flex-basis: 50%;
  font-size: 2rem;
  text-align: center;

  @media (max-width: 762px) {
    font-size: 1.5rem;
  }
`;

S.CurrentWeather = styled.div`
  font-size: 4rem;
  font-family: "Lato";
  line-height: 1.3;
  font-weight: 300;
  text-align: center;
  margin-top: 2rem;


  @media (max-width: 762px) {
    font-size: 2rem;
  }
`;

S.Title = styled(S.CurrentWeather)`
`;

S.ErrorMsg = styled(S.CurrentWeather)`
  color: red;
`;
