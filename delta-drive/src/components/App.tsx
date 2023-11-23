import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './common/Layout';
import { UserContext } from '@/contexts/UserProvider';
import {
  HistoryPage,
  HomePage, LoginPage, RegistrationPage
} from '@/pages';

export const App = () => {
  const { currentUser } = useContext(UserContext);

  let routes = null;
  if (currentUser) {
    routes = (
      <Layout>
        <Routes>
          {currentUser.roleId === 1 && (
            <Route>
              <Route path='/homePage' element={<HomePage />} />
              <Route path='/historyPage' element={<HistoryPage />} />
            </Route>
          )}
          {currentUser.roleId === 2 && (
            <Route>
              <Route path='/historyPage' element={<HistoryPage />} />
            </Route>
          )}
          <Route path='*' element={<Navigate to='/homePage' replace />} />
        </Routes>
      </Layout>
    );
  } else {
    routes = (
      <Layout>
        <Routes>
          <Route>
            <Route path='/homePage' element={<HomePage />} />
            <Route path='/loginPage' element={<LoginPage />} />
            <Route path='/registrationPage' element={<RegistrationPage />} />
            <Route path='*' element={<Navigate to='/loginPage' replace />} />
          </Route>
        </Routes>
      </Layout>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
};
