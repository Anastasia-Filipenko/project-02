import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import {
  persistStore,
  //   persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { boardsReducer } from './boards/slice'; 
import { commonReducer } from './common/slice';
import axios from 'axios';

axios.defaults.baseURL = 'https://taskpro-final-project.onrender.com/api/';
// import storage from 'redux-persist/lib/storage';
// import authSlice from './auth/slice';

// const authPersistConfig = {
//   key: 'authSlice',
//   storage,
//   whitelist: ['token'],
// };

// const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

export const store = configureStore({
  reducer: combineReducers({
    boards: boardsReducer,
    common: commonReducer
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
