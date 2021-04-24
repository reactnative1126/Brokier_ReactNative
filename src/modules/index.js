import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import Storage from 'redux-persist/lib/storage';

import authReducer from './redux/auth/reducer';
import listsReducer from './redux/lists/reducer';
import mobileReducer from './redux/mobile/reducer';

const peresistConfig = {
  key: 'root',
  storage: Storage,
  timeout: null,
  whitelist: ['auth'],
  blacklist: ['lists', 'mobile'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  lists: listsReducer,
  mobile: mobileReducer
});

const persistedReducer = persistReducer(peresistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware());
// const store = createStore(persistedReducer, applyMiddleware(createLogger()));

let persistor = persistStore(store);

export { store, persistor };