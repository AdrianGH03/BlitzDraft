// Hooks
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfileImage } from '../../hooks/useProfileImage';
import { useState, useContext, useEffect } from 'react';

//REACT/NODEJS
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';

//Contexts
import { StyleContext } from '../../contexts/StyleContext';

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonCircleQuestion, faPlay, faBook, faGamepad, faRightToBracket, faChessQueen, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'


export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, setIsLoading } = useContext(StyleContext);
  const navigate = useNavigate();
  var profileImage = useProfileImage();
  const location = useLocation();

  //Images
  const lolplaceholder = '/placeholders/lolplaceholder.png';
  const logo = '/logoImages/smallLogo.png';
  const bigLogo = '/logoImages/logoTest-transformed.png';
  const discordLogo = '/logoImages/discordIcon.png';
  

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

  function goToDifficulty() {
    navigate('/game/difficulty');
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
    closeMenu();
  }, [location]);

  return (
    <>
      <div className={isOpen ? "header header-open" : "header"}>
        <div className="navbar-desk">
          <div className="navbar">
            <div className="desk-nav-left">

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
              <Tippy content="Join our Discord!" placement="bottom" className='move-left'>
                <Link to="https://discord.gg/MgweDDrMHt" target='_blank'><img src={discordLogo} alt='logo' className='nav-discord' /></Link>
              </Tippy>
              <div className="play-container">

                
              <Link to="/game/difficulty" className="header-play">
                <FontAwesomeIcon icon={faPlay} />
                <span>PLAY</span>
              </Link>
                
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
              <Link to="https://discord.gg/MgweDDrMHt" target='_blank'><img src={discordLogo} alt='logo' className='nav-discord' /></Link>
              <img src={logo} alt='logo' className='nav-logo' onClick={() => { goHome(); closeMenu() }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}