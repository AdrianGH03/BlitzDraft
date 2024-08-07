import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

export const useProfileImage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const { isAuthenticated, userInfo, fetchWithToken } = useContext(AuthContext);
  const profileImageIdRef = useRef();

  useEffect(() => {
    if (isAuthenticated && userInfo && userInfo.profileImage && userInfo.profileImage !== profileImageIdRef.current) {
      profileImageIdRef.current = userInfo.profileImage;
      fetchWithToken.get(`${import.meta.env.VITE_APP_GET_PICTURES}/${userInfo.profileImage}`, { withCredentials: true, responseType: 'blob' })
        .then(response => {
          const objectUrl = URL.createObjectURL(response.data);
          setProfileImage(objectUrl);
          return () => URL.revokeObjectURL(objectUrl);
        })
        .catch(error => {
          console.error('Error fetching profile image:', error);
        });
    }
    
  }, [isAuthenticated, userInfo]);

  return profileImage;
};