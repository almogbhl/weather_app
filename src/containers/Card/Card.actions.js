import { CHANGE_CITY } from "../Location/Location.constants";

export const changeCity = cityInfo => {
  return {
    type: CHANGE_CITY,
    payload: cityInfo
  };
};
