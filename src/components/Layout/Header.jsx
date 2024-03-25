// Hooks
import { useNavigate } from 'react-router-dom';
import { useProfileImage } from '../../hooks/useProfileImage';
import { useState, useContext, useEffect } from 'react';

//REACT/NODEJS
import { Link } from 'react-router-dom';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { StyleContext } from '../../contexts/StyleContext';

//Assets
import lolplaceholder from '../../assets/placeholders/lolplaceholder.png';
import logo from '../../assets/logoImages/SmallLogo.png';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(StyleContext);
  const navigate = useNavigate();
  var profileImage = useProfileImage();
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function goHome() {
    navigate('/');
  }

  function closeMenu() {

    if (isOpen) {
      setIsOpen(false);
    }
  }

  function sendToProfile() {
    navigate('/user/profile');
    if (isOpen) {
      setIsOpen(false);
    }
  }
  function goToDifficulty() {
    navigate('/game/difficulty');
    if (isOpen) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0 && profileImage != '') {
      setIsLoading(false); 
      setIsAuthenticated(true); 
    } else if (!isLoading) {
      setIsAuthenticated(false);
    }
  }, [userInfo, profileImage, isLoading]);

  return (
    <>
      <div className="header">
        <div className="navbar-desk">
          <div className="navbar">
            <div className="desk-nav-left">
            <div className="user-info" onClick={() => sendToProfile()} style={{ display: isAuthenticated ? 'block' : 'none' }}>
                <img src={profileImage ? profileImage : lolplaceholder} alt='profile' className='desk-nav-profile' crossOrigin={"anonymous"} />
              </div>
              <Link to="/auth" className="desk-nav-account" style={{ display: isAuthenticated === false ? 'block' : 'none' }}>SIGN UP</Link>
              <Link to="/" className="desk-nav-leaderboard">LEADERBOARD</Link>
              <Link to="/" className="desk-nav-faq">FAQ</Link>
              <Link to="/" className="desk-nav-tutorial">TUTORIAL</Link>
            </div>
            <div className="desk-nav-right">
              <div className="play-container">
                
                <button className="btn-23 desk-nav-play" onClick={() => goToDifficulty()}>
                  <span className="text">PLAY</span>
                  <span aria-hidden="" className="marquee">START GAME</span>
                </button>
              </div>
              <div className="desk-logo-container">
                <img src={logo} alt='logo' className='desk-nav-logo' onClick={() => goHome()} />
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-mobile">
          <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={`nav-left ${isOpen ? 'open' : ''}`}>
          {
            userInfo && Object.keys(userInfo).length !== 0 && profileImage != '' ? (
              <div className="user-info-mobile" onClick={() => sendToProfile()}>
                <img src={profileImage ? profileImage : lolplaceholder} alt='profile' className='nav-profile' crossOrigin={"anonymous"} />
                <p>{userInfo.username.toUpperCase()}&apos;S PROFILE</p>
              </div>
            ) : (
              <Link to="/auth" className="nav-account" onClick={() => closeMenu()}>SIGN UP</Link>
            )
          }
            <Link to="/" className="nav-leaderboard" onClick={() => closeMenu()}>LEADERBOARD</Link>
            <Link to="/" className="nav-faq" onClick={() => closeMenu()}>FAQ</Link>
            <Link to="/" className="nav-tutorial" onClick={() => closeMenu()}>TUTORIAL</Link>
            <Link to="/test" className="nav-play" onClick={() => closeMenu()}>PLAY</Link>
          </div>
          <div className="nav-right">
            <div className="logo-container">
              <img src={logo} alt='logo' className='nav-logo' onClick={() => { goHome(); closeMenu() }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}