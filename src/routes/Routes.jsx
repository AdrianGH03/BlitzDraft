import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../views/Pages/Home';
import AuthPage from '../views/Auth/AuthPage'; 
import { Test } from '../views/Test';
import { PasswordReset } from '../views/Auth/PasswordReset';
import { UserProfile } from '../views/User/UserProfile';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />

      {/* Auth Routes */}
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/user/profile" /> : <AuthPage />} />

      <Route path="/reset/:token" element={<PasswordReset />} /> 

      {/* User Routes */}
      <Route path="/user/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/auth" />} />
    </Routes>
  );
}