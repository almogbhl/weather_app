import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import Favorites from "../components/Favorites/Favorites";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/weather_app/" render={() => <HomePage />} />
      <Route exact path="/weather_app/favorites" component={Favorites} />
    </Switch>
  );
};

export default Routes;