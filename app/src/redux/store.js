import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userSlice from "./userSlice";
import videoSlice from "./videoSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootSlice = combineReducers({
  user: userSlice,
  video: videoSlice,
});

const persistedReducer = persistReducer(persistConfig, rootSlice);

export const store = configureStore({
  reducer: {
    slices: persistedReducer,
  },
});

export const persistor = persistStore(store);
