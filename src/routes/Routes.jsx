//Routes
import { Route, Routes, Navigate } from 'react-router-dom';

//Views
import { PasswordReset } from '../views/Auth/PasswordReset';
import { UserProfile } from '../views/User/UserProfile';
import AuthPage from '../views/Auth/AuthPage'; 

import { Tutorial } from '../views/Navbar/Tutorial';
import { Guides } from '../views/Navbar/Guides';
import { Help } from '../views/Navbar/Help';
import { Home } from '../views/Navbar/Home';

import { Difficulty } from '../views/Game/Difficulty';
import { Game } from '../views/Game/Game';

import { NotFound } from '../views/NotFound';


//Contexts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/user/profile" /> : <AuthPage />} />
      <Route path="/reset/:token" element={<PasswordReset />} /> 

      {/* User Routes */}
      <Route path="/user/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/auth" />} />

      {/* Nav Routes */}
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/help" element={<Help />} />

      {/* Game Routes */}
      <Route path="/game/difficulty" element={<Difficulty />} />
      <Route path='/game/:token' element={<Game />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
}