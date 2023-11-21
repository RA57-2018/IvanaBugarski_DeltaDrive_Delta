import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './common/Layout';
import {
  Feedback,
  HistoryPage,
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
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/homePage' element={<HomePage />} />
          <Route path='/loginPage' element={<LoginPage />} />
          <Route path='/registrationPage' element={<RegistrationPage />} />
          <Route path='/historyPage' element={<HistoryPage />} />
        </Route>
      </Routes>
    </Layout>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
};
