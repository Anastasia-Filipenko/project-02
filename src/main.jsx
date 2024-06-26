import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import App from './components/App/App';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Theme from './components/Theme/Theme';
import { ThemeChangeProvider } from './themeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter>
          <ThemeChangeProvider>
            <Theme>
              <App />
            </Theme>
          </ThemeChangeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
