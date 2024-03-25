// Hooks
import { useContext, useEffect, useState } from 'react';

//Contexts
import { StyleContext } from '../contexts/StyleContext';

//NPM/React
import { Link } from 'react-router-dom';
import { CustomSkeleton } from '../components/CustomSkeleton';

//Assets
import bigLogo from '../assets/logoImages/BigLogo.png';
import azirEmote from '../assets/emotes/azir1.png';

export const Home = () => {
    var { isLoading, setIsLoading } = useContext(StyleContext);
    const [loadedImages, setLoadedImages] = useState(new Set());

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

    return (
      <div className="home-background">
        <div className="home-div">
          <div className="home-div-container">
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
                'Welcome to BlitzDraft, your companion for understanding the drafting phase in League of Legends. ' +
                'Guess drafts from professional LoL esports matches, and you\'ll gain insights into how draft compositions work. ' +
                'Spot patterns, understand strategies, and improve your game with BlitzDraft.'}
            </p>    
              <p className="mobile-text">
                Welcome to BlitzDraft! Guess pro LoL esports drafts, understand strategies, and improve your game.
              </p>
            </div>
            {
                isLoading ? <CustomSkeleton /> : (
                    <div className="home-play-container">
                        <Link to="/test" className="home-play">PLAY NOW</Link>
                    </div>
                )
            }
          </div>
        </div>
      </div>
    )
  } 