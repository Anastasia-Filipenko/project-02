import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../../pages/WelcomePage/WelcomePage';
import Auth from '../../pages/AuthPage/AuthPage';
import Home from '../../pages/HomePage/HomePage';
import NotFound from '../../pages/NotFoundPage/NotFoundPage';
import Loader from '../Loader/Loader';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
