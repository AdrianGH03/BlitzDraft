// Hooks
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfileImage } from '../../hooks/useProfileImage';
import { useState, useContext, useEffect } from 'react';

//REACT/NODEJS
import { Link } from 'react-router-dom';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { StyleContext } from '../../contexts/StyleContext';

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonCircleQuestion, faPlay, faBook, faGamepad, faRightToBracket, faChessQueen, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'


export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(StyleContext);
  const navigate = useNavigate();
  var profileImage = useProfileImage();
  const location = useLocation();

  //Images
  const lolplaceholder = '/placeholders/lolplaceholder.png';

  //Images
  const bigLogo = '/logoImages/logoTest-transformed.png';
  

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
      const contentContainer = document.querySelector('.content');
      if (contentContainer) {
        contentContainer.scrollTop = 0;
      }
    }
  }

  function sendToProfile() {
    navigate('/user/profile');
    if (isOpen) {
      setIsOpen(false);
    }
  }
  

  function scrollToTop() {
    const contentContainer = document.querySelector('.content');
    if (contentContainer) {
      contentContainer.scrollTop = 0;
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

  useEffect(() => {
    closeMenu();
  }, [location]);
  
  return (
    <>
      <div className={isOpen ? "header header-open" : "header"}>
        <div className="navbar-desk">
          <div className="navbar">
            <div className="desk-nav-left">

                <div className="user-info" onClick={() => sendToProfile()} style={{ display: isAuthenticated ? 'block' : 'none' }}>
                  <img src={profileImage ? profileImage : lolplaceholder} alt='profile' className='desk-nav-profile' crossOrigin={"anonymous"} />
                </div>

              
                <Link to="/auth" className="desk-nav-account" style={{ display: isAuthenticated === false ? 'block' : 'none' }} onClick={() => scrollToTop()}>
                  <FontAwesomeIcon icon={faRightToBracket} />&nbsp;
                  <span>&nbsp;Sign Up</span>
                </Link>

                <Link to="/help" className="desk-nav-faq" onClick={() => scrollToTop()}>
                  <FontAwesomeIcon icon={faPersonCircleQuestion} />
                  <span>FAQ</span>
                </Link>
              

              
                <Link to="/tutorial" className="desk-nav-tutorial" onClick={() => scrollToTop()}>
                  <FontAwesomeIcon icon={faGamepad} />  
                  <span>Tutorial</span>
                </Link>
              

              
                <Link to="/guides" className='desk-nav-guides' onClick={() => scrollToTop()}>
                  <FontAwesomeIcon icon={faBook} />
                  <span>Guides</span>
                </Link>
             

              
                <Link to="/stats" className='desk-nav-guides' onClick={() => scrollToTop()}>
                  <FontAwesomeIcon icon={faSquarePollVertical} />
                  <span>Stats</span>
                </Link>
              
              
            </div>
            <div className="desk-nav-right">
              
              <div className="play-container">

                
              <Link to="/game/difficulty" className="header-play">
                <FontAwesomeIcon icon={faPlay} />
                <span>PLAY</span>
              </Link>
                
              </div>
              <div className="desk-logo-container">
                
                <Link to="/" className="header-play">
                  
                  <span>HOME</span>
                </Link>
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
                  <FontAwesomeIcon icon={faRightToBracket} style={{color: '#fff'}}/>
                  <span>SIGN UP</span>
                </Link>
              )
            }
            
            <Link to="/help" className="nav-faq" onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faPersonCircleQuestion} style={{color: '#fff'}}/>
              <span>FAQ</span>
            </Link>

            <Link to="/tutorial" className="nav-tutorial" onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faGamepad} style={{color: '#fff'}}/>
              <span>TUTORIAL</span>
            </Link>

            <Link to="/guides" className='nav-guides' onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faBook} style={{color: '#fff'}}/>
              <span>GUIDES</span>
            </Link>

            <Link to="/stats" className="nav-guides" onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faSquarePollVertical} style={{color: '#fff'}}/>
              <span>STATS</span>
            </Link>

            <Link to="/game/difficulty" className="nav-play" onClick={() => closeMenu()}>
              <FontAwesomeIcon icon={faChessQueen} style={{color: '#fff'}}/>
              <span>PLAY</span>
            </Link>

            

            <img src={bigLogo} alt='logo' className='nav-logo' onClick={() => { goHome(); closeMenu() }} />
          </div>
          <div className="nav-right">
            <div className="logo-container">
              
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}