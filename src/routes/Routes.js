import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import Favorites from "../components/Favorites/Favorites";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <HomePage />} />
      <Route exact path="/favorites" component={Favorites} />
    </Switch>
  );
};

export default Routes;