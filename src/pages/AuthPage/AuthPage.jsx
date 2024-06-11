import { useParams } from 'react-router-dom';
import LoginForm from '../../components/authorization/LoginForm/LoginForm';
import RegisterForm from '../../components/authorization/RegisterForm/RegisterForm';

export default function Auth() {
  const { id } = useParams();
  return (
    <div>
      {id === 'login' && <LoginForm />}
      {id === 'register' && <RegisterForm />}
    </div>
  );
}
