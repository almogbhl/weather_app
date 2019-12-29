import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FavoriteSharp, Home, ColorLens } from "@material-ui/icons";
import { deepPurple } from "@material-ui/core/colors";
import { changeTheme } from "../../App/App.actions";

const Header = ({ do_changeTheme }) => {
  return (
    <S.Header>
      <S.Title>Herolo Weather Task</S.Title>
      <S.ButtonsBox>
        <Link to="/">
          <Home
            style={{ color: deepPurple[50], fontSize: 40, marginLeft: 20 }}
          />
        </Link>
        <Link to="/favorites">
          <FavoriteSharp
            style={{ color: deepPurple[50], fontSize: 40, marginLeft: 20 }}
          />
        </Link>
        <ColorLens
          onClick={() => do_changeTheme()}
          style={{ color: deepPurple[50], fontSize: 40, marginLeft: 20, cursor: "pointer" }}
        />
      </S.ButtonsBox>
    </S.Header>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    do_changeTheme: () => dispatch(changeTheme())
  };
};

export default connect(null, mapDispatchToProps)(Header);

const S = {};

S.Header = styled.header`
  width: 100%;
  height: 10%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: lightgray 1px solid;
`;
S.Title = styled.h1`
  font-size: 2.6rem;
  font-family: "Lato";
  line-height: 1.3;
  font-weight: 300;
`;
S.ButtonsBox = styled.div``;
