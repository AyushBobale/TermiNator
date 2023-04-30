import { combineReducers, configureStore } from "@reduxjs/toolkit";

import settingsSlice from "./siteSettingsSlice.js";

const rootReducer = combineReducers({
  settings: settingsSlice,
});

const store = configureStore({ reducer: { rootReducer } });
export default store;
