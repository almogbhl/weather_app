const api = {
  cors: "https://cors-anywhere.herokuapp.com/",
  geoLocation: lat_lon =>
    `${api.cors}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY}&q=${lat_lon}`,
  autocomplete: searchValue =>
    `${api.cors}http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${searchValue}&language=en-us`,
  current: locationKey =>
    `${api.cors}http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&language=en-us&details=false`,
  forecast: locationKey =>
    `${api.cors}http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&language=en-us&details=false&metric=false`
};

export default api;
