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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faPersonCircleQuestion, faBook, faGamepad, faRightToBracket, faChessQueen } from '@fortawesome/free-solid-svg-icons'


export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(StyleContext);
  const navigate = useNavigate();
  var profileImage = useProfileImage();
  

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    document.body.style.overflow = newIsOpen ? 'hidden' : 'auto';
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
              <Link to="/auth" className="desk-nav-account" style={{ display: isAuthenticated === false ? 'block' : 'none' }}>
                <FontAwesomeIcon icon={faRightToBracket} />&nbsp;
                <span>SIGN UP</span>
                
              </Link>

              <Link to="/" className="desk-nav-leaderboard">
                <FontAwesomeIcon icon={faTrophy} />
                <span>LEADERBOARD</span> 
                
              </Link>

              <Link to="/" className="desk-nav-faq">
                <FontAwesomeIcon icon={faPersonCircleQuestion} />
                <span>FAQ</span>
            
              </Link>

              <Link to="/tutorial" className="desk-nav-tutorial">
                <FontAwesomeIcon icon={faGamepad} />  
                <span>TUTORIAL</span>
                
              </Link>
              <Link to="/guides" className='desk-nav-guides'>
                <FontAwesomeIcon icon={faBook} />
                <span>GUIDES</span>
                
              </Link>
              
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
                <p>{(userInfo.username.length > 11 ? userInfo.username.substring(0, 11) + "..." : userInfo.username).toUpperCase()}&apos;S PROFILE</p>
              </div>
            ) : (
              <Link to="/auth" className="nav-account" onClick={() => closeMenu()}>
                <FontAwesomeIcon icon={faRightToBracket} />
                <span>SIGN UP</span>
              </Link>
            )
          }
            <Link to="/" className="nav-leaderboard" onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faTrophy} />
                <span>LEADERBOARD</span> 
                
            </Link>
            
            <Link to="/" className="nav-faq" onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faPersonCircleQuestion} />
              <span>FAQ</span>
             
            </Link>
            <Link to="/tutorial" className="nav-tutorial" onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faGamepad} />
              <span>TUTORIAL</span>
            </Link>

            <Link to="/guides" className='nav-guides' onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faBook} />
              <span>GUIDES</span>
            </Link>

            <Link to="/game/difficulty" className="nav-play" onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faChessQueen} style={{color: '#b2b2bcff'}}/>
              <span>PLAY</span>
            </Link>
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