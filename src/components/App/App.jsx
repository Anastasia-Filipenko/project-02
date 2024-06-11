import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// import { Board } from '../Board/Board.jsx';

import Loader from '../Loader/Loader';
import RestrictedRoute from '../authorization/RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../authorization/PrivateRoute/PrivateRoute';

const Welcome = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const Auth = lazy(() => import('../../pages/AuthPage/AuthPage'));
const Home = lazy(() => import('../../pages/HomePage/HomePage'));
const Board = lazy(() => import('../Board/Board'));
const NotFound = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route
          path="/auth/:id"
          element={<RestrictedRoute redirectTo="/home" component={<Auth />} />}
        />
        <Route
          path="/home"
          element={<PrivateRoute component={<Home />} redirectTo="/" />}
        >
          <Route path=":boardTitle" element={<Board />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
