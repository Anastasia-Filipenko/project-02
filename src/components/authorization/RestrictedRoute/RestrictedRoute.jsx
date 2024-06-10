import { Navigate } from "react-router-dom";
import { selectIsLogged } from "../../../redux/auth/selectors";

export default function RestrictedRoute({ component: Component, redirectTo = '/' }) {
    console.log(selectIsLogged) 
    return <div>{selectIsLogged ? <Navigate to={redirectTo} /> : Component}</div>
}