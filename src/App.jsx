//Hooks
import { useEffect, useState } from 'react';
import { useUserInfo } from './hooks/useUserInfo.jsx'; 

// Contexts
import { AuthContext } from './contexts/AuthContext.jsx'; 
import { StyleContext } from './contexts/StyleContext.jsx';

//NPM/React
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';


//Pages
import { Layout } from './views/Layout.jsx';
import { AppRoutes } from './routes/Routes.jsx';



export function App() {
  
  const fetchWithToken = axios.create({
    headers: {
      'x-server-token': import.meta.env.VITE_APP_SERVER_DOOR,
      'x-server-secret': import.meta.env.VITE_APP_SERVER_USER,
    },
    withCredentials: true,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  var { userInfo, setUserInfo } = useUserInfo(isAuthenticated, fetchWithToken); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetchWithToken.get(import.meta.env.VITE_APP_CHECK_AUTH, { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    if(Object.keys(userInfo).length > 0){
      setIsAuthenticated(true); 
    }
  }, [userInfo]);


  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, setIsAuthenticated, 
      userInfo, setUserInfo,
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