import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Welcome from '../../pages/WelcomePage/WelcomePage';
import Auth from '../../pages/AuthPage/AuthPage';
import Home from '../../pages/HomePage/HomePage';
import { Board } from '../Board/Board.jsx';
import NotFound from '../../pages/NotFoundPage/NotFoundPage';
import Loader from '../Loader/Loader';
import { PrivateRoute } from '../PrivateRoute';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth/:id" element={<Auth />} />

        <Route path="/home" element={<Home />}>
          <Route
            path=":boardTitle"
            element={<PrivateRoute component={<Board />} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
