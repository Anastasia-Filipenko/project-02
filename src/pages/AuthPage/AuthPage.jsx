// import RegisterForm from "../../components/authorization/RegisterForm/RegisterForm";

import { useParams } from 'react-router-dom';
import LoginForm from '../../components/authorization/LoginForm/LoginForm';
import RegisterForm from '../../components/authorization/RegisterForm/RegisterForm';

// export default function Auth() {
//     return (
//         <div>
//             <h2>f</h2>
//         </div>
//     );
// }

export default function Auth() {
  const { id } = useParams();

  return (
    <div>
      {id === 'login' && <LoginForm />}
      {id === 'register' && <RegisterForm />}
    </div>
  );
}
