// import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   //   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage';
// // import authSlice from './auth/slice';

// // const authPersistConfig = {
// //   key: 'authSlice',
// //   storage,
// //   whitelist: ['token'],
// // };

// // const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

// export const store = configureStore({
//   reducer: {
//     // auth: persistedAuthReducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/themeSlice';
import userReducer from './user/userSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme'], // you can add 'user' if you want to persist user state as well
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);