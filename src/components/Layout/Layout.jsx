import toast, { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
  toast.success('Successfully created!');
  return (
    <div>
      <Toaster position="top-right" reverseOrder={true} />
      {children}
    </div>
  );
}
