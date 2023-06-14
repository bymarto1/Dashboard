import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { DashboardLayout } from './components/layout/dashboard-layout';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './hooks/useAuth';
import { Role } from './roles';
import { Helmet } from 'react-helmet';

import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Blur from './pages/Blur';
import BlurListing from './pages/Blur/BlurListing';
import Payments from './pages/Payments';
import Team from './pages/Team';

export default function App() {
    return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              element={
                <>
                  <DashboardLayout />
                </>
              }
            >
              <Route
                path="/"
                element={
                  <RequireAuth roles={[Role.ADMIN, Role.USER, Role.STAFF]}>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="settings"
                element={
                  <RequireAuth roles={[Role.ADMIN, Role.USER]}>
                    <Settings />
                  </RequireAuth>
                }
              />
              <Route
                path="payment"
                element={
                  <RequireAuth roles={[Role.ADMIN, Role.USER]}>
                    <Payments />
                  </RequireAuth>
                }
              />
              <Route
                path="team"
                element={
                  <RequireAuth roles={[Role.ADMIN, Role.USER]}>
                    <Team />
                  </RequireAuth>
                }
              />
              <Route
                path="blur"
                element={
                  <RequireAuth roles={[Role.ADMIN, Role.USER, Role.STAFF]}>
                    <Blur />
                  </RequireAuth>
                }
              />
              <Route
                path="blur/listing"
                element={
                  <RequireAuth roles={[Role.ADMIN, Role.USER, Role.STAFF]}>
                    <BlurListing />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/login" element={<LogIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
  );
}
