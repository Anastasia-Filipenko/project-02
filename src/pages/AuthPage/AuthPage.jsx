import { useParams } from 'react-router-dom';
import LoginForm from '../../components/authorization/LoginForm/LoginForm';
import RegisterForm from '../../components/authorization/RegisterForm/RegisterForm';
import { useSelector } from 'react-redux';
import { selectIsLoadingAuth } from '../../redux/auth/selectors';
import Loader from '../../components/Loader/Loader';

export default function Auth() {
  const isLoading = useSelector(selectIsLoadingAuth);
  const { id } = useParams();
  return (
    <div>
      {id === 'login' && <LoginForm />}
      {id === 'register' && <RegisterForm />}
      {isLoading === true && <Loader />}
    </div>
  );
}
