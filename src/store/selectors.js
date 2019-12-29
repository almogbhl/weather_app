import { createSelector } from "reselect";

// ======================================================
// -------------------- LOADING DATA --------------------
// ======================================================
export const selectorLoadingData = createSelector(
  (state, type) => state.location[type].isLoading,
  isLoading => isLoading
);

// ======================================================
// -------------------- RECEIVING DATA ------------------
// ======================================================
export const selectorReceivingData = createSelector(
  (state, type) => state.location[type].data,
  data => data
);

// ======================================================
// ------------------- FETCHING ERROR -------------------
// ======================================================
export const selectorFetchingError = createSelector(
  (state, type) => state.location[type].error,
  error => error
);

// ======================================================
// ---------------------- FAVORITES ---------------------
// ======================================================
export const selectorFavorites = createSelector(
  (state) => state.location.favorites,
  favorites => favorites
);

// ======================================================
// ----------------------- THEME ------------------------
// ======================================================
export const selectorAppTheme = createSelector(
  (state) => state.app.theme,
  theme => theme
);
