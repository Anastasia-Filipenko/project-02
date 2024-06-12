import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      {children}
    </div>
  );
}
