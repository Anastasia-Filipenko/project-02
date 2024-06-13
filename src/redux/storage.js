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
import { columnsReducer } from './columns/slice';
import { cardsReducer } from './ControlBtnInCard/slice';
// import axios from 'axios';
import themeReducer from './theme/themeSlice';
import taskReducer from './task/taskSlice';
import storage from 'redux-persist/lib/storage';
import needHelpReducer from './needHelp/slice';

// axios.defaults.baseURL = 'https://taskpro-final-project.onrender.com/api/';

// const rootReducer = combineReducers({
//   theme: themeReducer,
//   user: userReducer,
// });
import { authReducer } from './auth/authSlice';

const authPersistConfig = {
  key: 'authSlice',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme'], // you can add 'user' if you want to persist user state as well
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    columns: columnsReducer,
    common: commonReducer,
    tasks: taskReducer,
    controlCards: cardsReducer,
    theme: persistedReducer,
    auth: persistedAuthReducer,
    needHelp: needHelpReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
