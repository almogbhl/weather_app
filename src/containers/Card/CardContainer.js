import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Card from "../../components/Card/Card";
import { changeCity } from "./Card.actions";

const CardContainer = ({ do_changeCity, data, listType, history }) => {
  const handleClick = cardInfo => {
    do_changeCity(cardInfo);
    history.push("/weather_app");
  };
  
  return (
    <Card
      data={data}
      listType={listType}
      handleClick={cardInfo => handleClick(cardInfo)}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    do_changeCity: cityInfo => dispatch(changeCity(cityInfo))
  };
};

export default connect(null, mapDispatchToProps)(CardContainer);

const S = {};

S.Card = styled.li`
  display: flex;
  flex-basis: calc(20% - 12px);
  flex-direction: column;
  height: ${props => (props.listType === "mainList" ? "100%" : "40%")};
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
`;
S.Degrees = styled.p`
  font-size: 2rem;
  font-family: "Lato";
  line-height: 1.3;
  font-weight: 300;
`;
