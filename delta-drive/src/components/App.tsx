import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './common/Layout';
import {
  BookVehicleRequest,
  Feedback,
  HomePage, LoginPage, RegistrationPage
} from '@/pages';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';

export const App = () => {
  const { currentUser } = useContext(UserContext);

  let routes = null;
  routes = (
    <Layout>
      <Routes>
        <Route>
          <Route path='/bookVehicleRequest' element={<BookVehicleRequest />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/homePage' element={<HomePage />} />
          <Route path='/loginPage' element={<LoginPage />} />
          <Route path='/registrationPage' element={<RegistrationPage />} />
        </Route>
      </Routes>
    </Layout>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
};
