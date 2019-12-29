import React from "react";
import styled from "styled-components";

const Card = ({ data, listType, handleClick }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const printCard = () => {
    switch (listType) {
      case "mainList":
        const tempAverageMainList = Math.ceil(
          Math.abs(data.temp.max.value - data.temp.min.value) / 2
        );
        const day = new Date(data.date).getDay();

        return (
          <S.Card listType={listType}>
            <S.Title>{days[day]}</S.Title>
            <S.Degrees>
              {tempAverageMainList} {"F"}
            </S.Degrees>
          </S.Card>
        );

      case "favorites":
        // const tempFavorites = data.degrees[degreesType].value

        const tempFavorites = data.currentWeather.temp["celsius"].value;

        return (
          <S.Card onClick={() => handleClick(data)} listType={listType}>
            <S.Title>{data.currentWeather.cityName}</S.Title>
            <S.Degrees>
              {tempFavorites} {"F"}
            </S.Degrees>
            <S.Title>{data.currentWeather.weatherText}</S.Title>
          </S.Card>
        );

      default:
        break;
    }
  };

  return printCard();
};

export default Card;

const S = {};

S.Card = styled.li`
  display: flex;
  flex-basis: calc(20% - 12px);
  flex-direction: column;
  height: ${props => (props.listType === "mainList" ? "100%" : "40%")};
  cursor: ${props => (props.listType === "mainList" ? "auto" : "pointer")};
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: rgba(255, 255, 255, 0.2);
`;

S.Title = styled.h1`
  font-size: 2.5rem;
  font-family: "Lato";
  line-height: 1.3;
  font-weight: 300;
  margin-bottom: 5px;

  @media (max-width: 762px) {
    font-size: 1.5rem;
  }
`;
S.Degrees = styled.p`
  font-size: 2rem;
  font-family: "Lato";
  line-height: 1.3;
  font-weight: 300;

  @media (max-width: 762px) {
    font-size: 1rem;
  }
`;
