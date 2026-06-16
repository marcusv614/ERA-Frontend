import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute/index.js';
import { DashboardPage } from '../pages/DashboardPage/index.js';
import { LoginPage } from '../pages/LoginPage/index.js';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          /* </ProtectedRoute> */
          <DashboardPage />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
