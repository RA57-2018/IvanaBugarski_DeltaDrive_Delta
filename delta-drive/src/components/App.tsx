import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './common/Layout';
import { UserContext } from '@/contexts/UserProvider';
import {
  HistoryPage,
  HomePage, LoginPage, RegistrationPage
} from '@/pages';

export const App = () => {
  const { currentUser } = useContext(UserContext);

  let routes = null;
  routes = (
    <Layout>
      <Routes>
        <Route>
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
