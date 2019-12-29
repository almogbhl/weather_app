import React from "react";
import styled from "styled-components";
import SearchBarContainer from "../../containers/SearchBar/SearchBarContainer";
import LocationContainer from "../../containers/Location/LocationContainer";

const HomePage = () => {
  return (
    <S.HomePage>
      <SearchBarContainer />
      <LocationContainer />
    </S.HomePage>
  );
};

export default HomePage;

const S = {};

S.HomePage = styled.main`
  width: 90%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  /* border: lightgray 1px solid; */
`;

S.Info = styled.main`
  width: 90%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* border: lightgray 1px solid; */
`;
S.Info = styled.main`
  width: 90%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* border: lightgray 1px solid; */
`;
