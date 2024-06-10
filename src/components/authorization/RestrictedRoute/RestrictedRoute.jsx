import { Navigate } from 'react-router-dom';
import { selectIsLogged } from '../../../redux/auth/selectors';
import { useSelector } from 'react-redux';

export default function RestrictedRoute({
  component: Component,
  redirectTo = '/',
}) {
  console.log(selectIsLogged);
  const isLoggedIn = useSelector(selectIsLogged);
  return <div>{isLoggedIn ? <Navigate to={redirectTo} /> : Component}</div>;
}
