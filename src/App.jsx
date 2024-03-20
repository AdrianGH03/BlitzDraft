import { Layout } from './views/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext'; 
import { StyleContext } from './contexts/StyleContext';
import { useEffect, useState } from 'react';
import { useUserInfo } from './hooks/useUserInfo'; 
import axios from 'axios';
import { AppRoutes } from './routes/Routes';





export function App() {
  
  const fetchWithToken = axios.create({
    headers: {
      'x-server-token': import.meta.env.VITE_APP_SERVER_DOOR,
      'x-server-secret': import.meta.env.VITE_APP_SERVER_USER
    },
    withCredentials: true,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  var { userInfo, setUserInfo } = useUserInfo(isAuthenticated, fetchWithToken); 
  const [error, setError] = useState('testing');
  const [success, setSuccess] = useState('');

  


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
      <StyleContext.Provider value={{}}>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </StyleContext.Provider>
    </AuthContext.Provider>
  )
}