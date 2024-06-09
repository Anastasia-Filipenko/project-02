import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { boardsReducer } from './boards/slice';
import { commonReducer } from './common/slice';
// import axios from 'axios';
import themeReducer from './theme/themeSlice';
// import userReducer from './user/userSlice';
import storage from 'redux-persist/lib/storage';

// axios.defaults.baseURL = 'https://taskpro-final-project.onrender.com/api/';

// const rootReducer = combineReducers({
//   theme: themeReducer,
//   user: userReducer,
// });

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme'], // you can add 'user' if you want to persist user state as well
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    common: commonReducer,
    theme: persistedReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
