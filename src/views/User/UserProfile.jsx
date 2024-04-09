// Hooks
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileImage } from '../../hooks/useProfileImage';

// NPM/React
import { CustomSkeleton } from '../../components/CustomSkeleton';
import Tippy from '@tippyjs/react';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { StyleContext } from '../../contexts/StyleContext';

// Misc
import { ChangePFP } from '../../components/User/ChangePFP';
import lolplaceholder from '../../assets/placeholders/lolplaceholder.png';

export const UserProfile = () => {
  const { 
    isAuthenticated, 
    userInfo, 
    setIsAuthenticated, 
    setUserInfo, 
    fetchWithToken,
  } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(StyleContext);
  const navigate = useNavigate();
  var profileImageFetch = useProfileImage();
  const [changePFP, setChangePFP] = useState(false);
  const [profileImage, setProfileImage] = useState(profileImageFetch);
  

  useEffect(() => {
    if(profileImageFetch) {
      setProfileImage(profileImageFetch);
      setIsLoading(false);
    }
  }, [profileImageFetch]);
  

  const handleLogout = async () => {
    if(!isAuthenticated) return;
    
    try {
      await fetchWithToken.post(import.meta.env.VITE_APP_LOGOUT, {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserInfo({});
      setProfileImage('');
      
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
        navigate('/auth');
        
    }
  };

  const changeProfilePicture= () => {
    setChangePFP(prev => !prev);
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-content">

      
          <div className="profile-header">
            <h1>{changePFP ? 'CHANGE PROFILE PICTURE' : 'PROFILE'}</h1>
          </div>


          <div className="profile-info">

            <div className="profile-image-container">
              <div className="image-icon-wrapper">
                {!changePFP ? <Tippy content={'Change Picture'} className="tippy-tooltip" animation={'shift-away-subtle'} roundArrow={true} >
                  <i className="bi bi-pencil-square image-icon" onClick={() => changeProfilePicture()}></i>
                </Tippy> : ''}
                <img src={profileImageFetch && profileImage ? profileImage : lolplaceholder} alt='profile' className='profile-image' crossOrigin={"anonymous"} />
              </div>
            </div>


            <div className="profile-details">
                <div className="profile-details-username">
                  <h1>{isLoading ? <CustomSkeleton count={1} /> : (isAuthenticated && userInfo && userInfo.username)}</h1>
                </div>
              {!changePFP ? (
                <div className="profile-details-info">
                  <div className="">
                    <h3>EMAIL</h3>
                    <p>{isLoading ? <CustomSkeleton count={1} /> : (isAuthenticated && userInfo && userInfo.email)}</p>
                  </div>
                  <div className="">
                    <h3>RANK</h3>
                    <p>{isLoading ? <CustomSkeleton count={1} /> : 'N/A'}</p>
                  </div>
                  <div className="">
                    <h3>POINTS</h3>
                    <p>{isLoading ? <CustomSkeleton count={1} /> : (isAuthenticated && userInfo && userInfo.points)}</p>
                  </div>
                </div>
              ) : (
                <ChangePFP setChangePFP={setChangePFP} profileImage={profileImage} setProfileImage={setProfileImage}/>
              )}
            </div>


          </div>

          <button onClick={handleLogout} className="gradient-button">LOGOUT</button>


        </div>
      </div>
    </>
  )
}
