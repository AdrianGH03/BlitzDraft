import { useState, useEffect, useRef } from 'react';

export function useUserInfo(isAuthenticated, fetchWithToken) {
  const [userInfo, setUserInfo] = useState({});
  const fetchWithTokenRef = useRef(fetchWithToken);

  useEffect(() => {
    fetchWithTokenRef.current = fetchWithToken;
  }, [fetchWithToken]);

  useEffect(() => {
    if (!isAuthenticated) return;
    try{
      const checkAuthentication = async () => {
        const response = await fetchWithTokenRef.current.get(import.meta.env.VITE_APP_CHECK_AUTH, { withCredentials: true });
        if (response.data.isAuthenticated) {
          const userInfoResponse = await fetchWithTokenRef.current.get(import.meta.env.VITE_APP_GET_USER_INFO, { withCredentials: true });
          setUserInfo(userInfoResponse.data.user);
        }
      };
      checkAuthentication();
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  }, [isAuthenticated]);

  return { userInfo, setUserInfo }; 
}