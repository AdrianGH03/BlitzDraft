//Routes
import { Route, Routes, Navigate } from 'react-router-dom';

//Views
import { PasswordReset } from '../views/Auth/PasswordReset';
import { UserProfile } from '../views/User/UserProfile';
import { Home } from '../views/Home';
import { Test } from '../tests/Test';
import { Difficulty } from '../views/Game/Difficulty';
import { Game } from '../views/Game/Game';
import AuthPage from '../views/Auth/AuthPage'; 

//Contexts
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

      {/* Game Routes */}
      <Route path="/game/difficulty" element={<Difficulty />} />
      <Route path='/game/:token' element={<Game />} />
    </Routes>
  );
}