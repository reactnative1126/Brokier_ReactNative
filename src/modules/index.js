import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';

import authReducer from "@modules/redux/auth/reducer";
import listsReducer from "@modules/redux/lists/reducer";

const peresistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: null,
  whitelist: ["auth"],
  blacklist: ["lists"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  lists: listsReducer
});

const persistedReducer = persistReducer(peresistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(createLogger()));

let persistor = persistStore(store);

export { store, persistor };