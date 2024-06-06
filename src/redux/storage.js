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
