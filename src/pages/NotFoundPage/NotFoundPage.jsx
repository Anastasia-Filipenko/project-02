import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <NavLink to="/">Back to home</NavLink>
    </div>
  );
}
