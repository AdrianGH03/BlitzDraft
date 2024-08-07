//Routes
import { Route, Routes, Navigate } from 'react-router-dom';

//Views
import { PasswordReset } from '../views/Auth/PasswordReset.jsx';
import { UserProfile } from '../views/User/UserProfile.jsx';
import { AuthPage } from '../views/Auth/AuthPage.jsx'; 

//Navbar routes
import { Tutorial } from '../views/Navbar/Tutorial.jsx';
import { Guides } from '../views/Navbar/Guides.jsx';
import { Help } from '../views/Navbar/Help.jsx';
import { Home } from '../views/Navbar/Home.jsx';
import { Stats } from '../views/Navbar/Stats.jsx';

//Game Routes
import { Difficulty } from '../views/Game/Difficulty.jsx';
import { Game } from '../views/Game/Game.jsx';

//404
import { NotFound } from '../views/NotFound.jsx';


//Contexts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';


export function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Home Route */}
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
      <Route path="/stats" element={<Stats />} />
      

      {/* Game Routes */}
      <Route path="/game/difficulty" element={<Difficulty />} />
      <Route path='/game/:token' element={<Game />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
      
      
    </Routes>
  );
}