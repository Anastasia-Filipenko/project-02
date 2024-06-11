import { useSelector } from 'react-redux';
import {
  selectIsLogged,
  selectIsRefreshing,
} from '../../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  redirectTo = '/',
}) {
  const isLoggedIn = useSelector(selectIsLogged);
  const isRefreshing = useSelector(selectIsRefreshing);
  return isLoggedIn || isRefreshing ? Component : <Navigate to={redirectTo} />;
}
