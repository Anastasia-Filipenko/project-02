import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../Loader/Loader';
import RestrictedRoute from '../authorization/RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../authorization/PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import Layout from '../Layout/Layout';

const Welcome = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const Auth = lazy(() => import('../../pages/AuthPage/AuthPage'));
const Home = lazy(() => import('../../pages/HomePage/HomePage'));
const Board = lazy(() => import('../Board/Board'));
const NotFound = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, []);
  return isRefreshing ? (
    <Loader />
  ) : (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<Welcome />} />

          <Route
            path="/auth/:id"
            element={
              <RestrictedRoute redirectTo="/home" component={<Auth />} />
            }
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
    </Layout>
  );
}

export default App;
