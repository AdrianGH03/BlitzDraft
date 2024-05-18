//Hooks
import { useState } from 'react';


// Contexts
import { AuthContext } from './contexts/AuthContext'; 
import { StyleContext } from './contexts/StyleContext';

//NPM/React
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';


//Pages
import { Layout } from './views/Layout';
import { AppRoutes } from './routes/Routes';



export function App() {
  
  const fetchWithToken = axios.create({
    headers: {
      'x-server-token': import.meta.env.VITE_APP_SERVER_DOOR,
      'x-server-secret': import.meta.env.VITE_APP_SERVER_USER,
    },
    withCredentials: true,
  }); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  
  return (
    <AuthContext.Provider value={{ 
       error, setError, 
       fetchWithToken, 
       success, setSuccess, 
      }}>
      <StyleContext.Provider value={{ isLoading, setIsLoading}}>
        <Router>
        
          <Layout>          
              <AppRoutes />
          </Layout>
          
        </Router>
      </StyleContext.Provider>
    </AuthContext.Provider>
  )
}