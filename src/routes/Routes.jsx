//Routes
import { Route, Routes, Navigate } from 'react-router-dom';

//Views
import { UserProfile } from '../views/User/UserProfile';

import { Test } from '../tests/Test';
//Navbar routes
import { Tutorial } from '../views/Navbar/Tutorial';
import { Guides } from '../views/Navbar/Guides';
import { Help } from '../views/Navbar/Help';
import { Home } from '../views/Navbar/Home';
import { Stats } from '../views/Navbar/Stats';

//Game Routes
import { Difficulty } from '../views/Game/Difficulty';
import { Game } from '../views/Game/Game';

//404
import { NotFound } from '../views/NotFound';


//Contexts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


export function AppRoutes() {
  
  

  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Home />} />

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