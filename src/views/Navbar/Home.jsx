// Hooks
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Contexts
import { StyleContext } from '../../contexts/StyleContext';

//NPM/React
import { CustomSkeleton } from '../../components/CustomSkeleton';


//Assets
import bigLogo from '../../assets/logoImages/BigLogo.png';
import azirEmote from '../../assets/emotes/azir1.png';
import home1 from '../../assets/placeholders/home1.jpg';
import home2 from '../../assets/placeholders/home2.jpg';
import home3 from '../../assets/placeholders/home3.png';
import home4 from '../../assets/placeholders/home4.png';
import '../../assets/styles/Pages/Home.css';

export const Home = () => {
    var { isLoading, setIsLoading } = useContext(StyleContext);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [isCssLoaded, setIsCssLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const checkCssLoaded = () => {
          const marker = document.getElementById('css-loaded-marker');
          const style = window.getComputedStyle(marker);
          if (style.color === 'rgb(18, 52, 86)') {
              setIsCssLoaded(true);
          }
      };
  
      checkCssLoaded();
      const intervalId = setInterval(checkCssLoaded, 100);
  
      return () => clearInterval(intervalId); // Clean up interval on unmount
    }, []);

    useEffect(() => {
      if (loadedImages.size === 2) { 
        setIsLoading(false);
      }
      // eslint-disable-next-line
    }, [loadedImages]);

    useEffect(() => {
      const img1 = new Image();
      const img2 = new Image();

      img1.onload = () => setLoadedImages(prevSet => new Set(prevSet.add(img1.src)));
      img2.onload = () => setLoadedImages(prevSet => new Set(prevSet.add(img2.src)));

      img1.src = bigLogo;
      img2.src = azirEmote;
    }, []);

    function goToDifficulty() {
      navigate('/game/difficulty');
    }
    

    return (
      <>
      <div id="css-loaded-marker"></div>
      {isCssLoaded ? (
        <div className="home-background">
          
          <div className="home-div">
            <div className="home-image-container">
              <div className="home-image-container2">
                <img src={home1} alt="Home 1" className="home-image fade-in-fwd push-left" />
                <img src={home2} alt="Home 2" className="home-image fade-in-fwd" />
                
              </div>
            </div>
            
              
            <div className="home-div-container fade-in-fwd">
              {isLoading ? (
                <CustomSkeleton />
              ) : (
                <img
                  src={bigLogo}
                  alt="BlitzDraft Logo"
                  className='home-biglogo'
                />
              )}
              <div className="home-content">
                
                {isLoading ? (
                  <CustomSkeleton />
                ) : (
                  <img
                    src={azirEmote}
                    alt="Azir Emote"
                    className='home-emote'
                  />
                )}
              <p className="desktop-text">
                  {isLoading ? <CustomSkeleton /> : 
                  'Welcome to BlitzDraft, your companion for understanding the drafting phase in pro League of Legends. ' +
                  'Guess drafts from professional LoL esports matches, and you\'ll gain insights into how draft compositions work. ' +
                  'Spot patterns, understand strategies, and improve your game with BlitzDraft.'}
              </p>    
                <p className="mobile-text">
                  Welcome to BlitzDraft! Guess pro LoL esports drafts, understand strategies, and improve your game.
                </p>
              </div>
              {
                  isLoading ? <CustomSkeleton /> : (
                    <button className="btn-23 home-play" onClick={() => goToDifficulty()}>
                      <span className="text">PLAY</span>
                      <span aria-hidden="" className="marquee">START GAME</span>
                    </button>
                  )
              }
              <div className="home-image-mobile">
                <div className="home-images-mobile">
                  <img src={home3} alt="Home 3" className="home-image" />
                  <img src={home4} alt="Home 4" className="home-image" />
                </div>
                <div className="home-images-desktop">
                  <img src={home1} alt="Home 1" className="home-image fade-in-fwd" />
                  <img src={home2} alt="Home 2" className="home-image fade-in-fwd" />
                </div>
              </div>
            </div>
          </div>
      </div>
      ) : <div className="loading-container">
            <span className="loader"></span>
          </div>
      }
      </>
    )
  } 