// Hooks
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileImage } from '../../hooks/useProfileImage.jsx';

// NPM/React
import Tippy from '@tippyjs/react';

//Contexts
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { StyleContext } from '../../contexts/StyleContext.jsx';

// Misc
import { HomeComponent } from '../../components/User/HomeComponent.jsx';
import { EditPicture } from '../../components/User/EditPicture.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faHouse, faPowerOff } from '@fortawesome/free-solid-svg-icons';

export function UserProfile() {
  const bigLogo = '/logoImages/logoTest-transformed.png'
  const lolplaceholder = '/placeholders/lolplaceholder.png'
  const { 
    isAuthenticated, 
    userInfo, 
    setIsAuthenticated, 
    setUserInfo, 
    fetchWithToken,
  } = useContext(AuthContext);
  const { setIsLoading } = useContext(StyleContext);
  const navigate = useNavigate();
  var profileImageFetch = useProfileImage();
  const [profileImage, setProfileImage] = useState(profileImageFetch);
  const [activeComponent, setActiveComponent] = useState('home'); // New state variable

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

  
  return (
    <>
      <div className="profile-container2">
        <main className="profile-content2">

          <section className="profile-topright">

            <h1>PROFILE</h1>

            <div className="profile-topright-content">
              <nav className="profile-topright-nav">
                <Tippy content="Home">
                  <button onClick={() => setActiveComponent('home')} className="changePFP">
                    <FontAwesomeIcon icon={faHouse} />
                  </button>
                </Tippy>
                <Tippy content="Edit Picture">
                  <button onClick={() => setActiveComponent('editPicture')} className="changePFP">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </Tippy>
                <Tippy content="Log out">
                  <button onClick={handleLogout} className="changePFP">
                    <FontAwesomeIcon icon={faPowerOff} />
                  </button>
                </Tippy>
              </nav>

              <section className="profile-topright-ncontent">
                {activeComponent === 'home' && <HomeComponent  
                  profileImage={profileImage} 
                  lolplaceholder={lolplaceholder} 
                  userInfo={userInfo}
                />}
                {activeComponent === 'editPicture' && <EditPicture setProfileImage={setProfileImage} />}
              </section>
            </div>
          </section>


          <section className="profile-botleft">
            <img src={bigLogo} alt="bigLogo" className="bigLogo" />
          </section>
        </main>
      </div>
    </>
  )
}