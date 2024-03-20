import { useState, useContext } from 'react';
import logo from '../../assets/logoImages/SmallLogo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useProfileImage } from '../../hooks/useProfileImage';
import lolplaceholder from '../../assets/placeholders/lolplaceholder.png';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useContext(AuthContext);
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


  return (
    <>
      <div className="header">
        <div className="navbar-desk">
          <div className="navbar">
            <div className="desk-nav-left">
            {
              userInfo && Object.keys(userInfo).length !== 0 && profileImage != '' ? (
                <div className="user-info" onClick={() => sendToProfile()}>
                  <img src={profileImage ? profileImage : lolplaceholder} alt='profile' className='desk-nav-profile' crossOrigin={"anonymous"} />
                </div>
              ) : (
                <Link to="/auth" className="desk-nav-account">SIGN UP</Link>
              )
            }
              <Link to="/" className="desk-nav-leaderboard">LEADERBOARD</Link>
              <Link to="/" className="desk-nav-faq">FAQ</Link>
              <Link to="/" className="desk-nav-tutorial">TUTORIAL</Link>
            </div>
            <div className="desk-nav-right">
              <div className="play-container">
                <Link to="/" className="desk-nav-play">START GAME</Link>
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
            <Link to="/" className="nav-play" onClick={() => closeMenu()}>PLAY</Link>
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