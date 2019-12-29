import produce from "immer";

import { CHANGE_THEME } from "./App.constants";

export const initialState = {
  theme: true
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // ======================================================
      // ------------------------ THEME -----------------------
      // ======================================================
      case CHANGE_THEME:
        draft.theme = !draft.theme;
        break;

      default:
        return state;
    }
  });
};
