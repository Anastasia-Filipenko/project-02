import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Welcome from '../../pages/WelcomePage/WelcomePage';
import Auth from '../../pages/AuthPage/AuthPage';
import Home from '../../pages/HomePage/HomePage';
import { Board } from '../Board/Board.jsx';
import NotFound from '../../pages/NotFoundPage/NotFoundPage';
import Loader from '../Loader/Loader';
import RestrictedRoute from '../authorization/RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../authorization/PrivateRoute/PrivateRoute';

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
