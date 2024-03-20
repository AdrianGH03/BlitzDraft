import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';



export const Test = () => {
  const { isAuthenticated, setIsAuthenticated, setUserInfo, fetchWithToken } = useContext(AuthContext);
  const handleLogout = async () => {
    if(!isAuthenticated) return;
    try {
      await fetchWithToken.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserInfo({});
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <div>
      <h1>Test</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

