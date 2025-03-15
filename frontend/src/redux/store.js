import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage)
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import companySlice from './companySlice'
import applicationSlice from './applicationSlice'
import { combineReducers } from "redux";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","application"], 
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  company:companySlice,
  application:applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disabling serializableCheck for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
