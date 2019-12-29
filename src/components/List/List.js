import React from "react";
import styled from "styled-components";
import CardContainer from "../../containers/Card/CardContainer";

const List = ({ listType, data, history }) => {
  return (
    <S.List listType={listType}>
      {data.length > 0 &&
        data.map((item, index) => (
          <CardContainer
            key={index}
            data={item}
            listType={listType}
            index={index}
            history={history}
          />
        ))}
    </S.List>
  );
};

export default List;

const S = {};

S.List = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: ${props => (props.listType === "mainList" ? "no-wrap" : "wrap")};
  align-items: ${props =>
    props.listType === "mainList" ? "center" : "flex-start"};
  height: ${props => (props.listType === "mainList" ? "37%" : "100%")};
  width: 90%;
  margin: 0 auto;
  overflow-y: ${props =>
    props.listType === "mainList" ? "visible" : "scroll"};
  box-shadow: ${props =>
    props.listType === "mainList"
      ? "none"
      : " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"};

  &::-webkit-scrollbar {
    width: 15px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: orange;
  }
`;
