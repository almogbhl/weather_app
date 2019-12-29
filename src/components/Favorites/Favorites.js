import React from "react";
import { connect } from "react-redux";
import List from "../List/List";
import * as s from "../../store/selectors";

const Favorites = ({ favorites, history}) => {
  const favoritesList = () => {
    const favList = [];

    if (favorites !== null) {
      for (const favoriteCityKey in favorites) {
        favList.push(favorites[favoriteCityKey]);
      }
    }

    return favList;
  };
  return <List history={history} data={favoritesList()} listType="favorites" />;
};

const mapStateToProps = state => ({ favorites: s.selectorFavorites(state) });

export default connect(mapStateToProps)(Favorites);
