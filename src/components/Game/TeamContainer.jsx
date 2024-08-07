//hooks and context
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleContext } from '../../contexts/StyleContext.jsx';
import { GameContext } from '../../contexts/GameContext.jsx';

//Assets


export function TeamContainer({ gameData, team }) {
  //Game Data
  const bans = gameData.gameData.body.champSplashes?.bans;
  const picks = gameData.gameData.body.champSplashes?.picks;
  const picksMobile = gameData.gameData.body.champSplashes?.picksMobile;
  const gameDataTeam = gameData.gameData.body.game.data;
  const startingRosters = gameData.gameData.body.startingRosters;
  const pickOrder = gameData.gameData.body.difficultySettings.order;
  const picksByRoleOrder = gameDataTeam[`${team}PicksByRoleOrder`].split(',');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  
  //Images
  const topIcon = '/placeholders/topIcon.png'
  const jgIcon = '/placeholders/jungleIcon.png'
  const midIcon = '/placeholders/midIcon.png'
  const adcIcon = '/placeholders/botIcon.png'
  const supIcon = '/placeholders/supportIcon.png'
  const placeholder = '/placeholders/lolplaceholder.jpg'

  

  //Context
  const { setIsLoading } = useContext(StyleContext);
  const { 
    isComplete, setIsComplete, 
    revealedCards, setRevealedCards,
    startGame,
    imagesLoaded, setImagesLoaded,
    pairs,
    currentCard, setCurrentCard,
    nextCard, setNextCard,
    cardAhead, setCardAhead,
    sequentialPicks,
    previousCard, setPreviousCard
  } = useContext(GameContext);
 
  
  const sortedPickKeys = picksByRoleOrder.map(pick => {
    const pickKey = Object.keys(gameDataTeam).find(key => gameDataTeam[key] === pick);
    return pickKey;
  });

  
  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(isComplete) {
      setNextCard('');
    }
  }, [isComplete]);

  useEffect(() => {
    const imgUrls = Object.values(gameData.gameData.body.champSplashes?.picks || {});
    const imagePromises = imgUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setImagesLoadedCount(prevCount => prevCount + 1);
          resolve();
        };
        img.onerror = reject;
      });
    });
  
    Promise.all(imagePromises)
      .catch(err => console.error(`Failed to load images: ${err}`));
  }, [gameData]);
  
  useEffect(() => {
    const totalImages = Object.values(gameData.gameData.body.champSplashes?.picks || {}).length;
    if (imagesLoadedCount === totalImages) { 
      setImagesLoaded(true);
    }
  }, [imagesLoadedCount]);

  
  
  useEffect(() => {
    let interval;
  
    const startInterval = () => {
      if (startGame) {
        
        const nextIndex = revealedCards.length;
        setNextCard(pickOrder[nextIndex]);
        setPreviousCard(pickOrder[nextIndex - 1]);
        
        if(pickOrder[nextIndex + 1]) {
          setCardAhead(pickOrder[nextIndex + 1]);
        } else {
          setCardAhead('');
        }
  
        if (pickOrder.length === nextIndex && !isComplete) {
          setIsLoading(true);
          setTimeout(() => {
            setIsComplete(true);
            setIsLoading(false);
          }, 1500);
        }
        const timerInterval = 30000;
        let initialDelay = nextIndex === 0 ? timerInterval : 0; 
  
        setTimeout(() => {
          interval = setInterval(() => {
            if (pickOrder.length > nextIndex && nextIndex > 0) {
              setRevealedCards([...revealedCards, pickOrder[nextIndex]]);
            }
          }, timerInterval);
        }, initialDelay);
      }
    };
  
    startInterval();
  
    return () => {
      clearInterval(interval);
    };
  }, [revealedCards, pickOrder, isComplete, startGame]);

  
  
  
  const isSequentialPick = (card) => {
    const pair = sequentialPicks.find(pair => pair.includes(card));
  
    if (pair && !revealedCards.includes(pair[0] === card ? pair[1] : pair[0])) {
      return true;
    }
    
    return false;
  };

 

  return (
    <div className={isComplete ? `game-team1-container fade-in-fwd` : `game-team1-container`}>
  
      <div className={`game-team1-bans`}>
        <h2
          style={{ fontSize: '0.6rem', textAlign: 'start', color: 'red', padding: '10px'}}
        >{team == 'Team1' ? 'Blue' : 'Red'} side bans</h2>
        {bans && (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={nextCard === `${team}Ban${i + 1}` ? 'flash-animation' : ''} style={{ flex: '1 0 20%', maxWidth: '20%' }}>
                <img 
                  src={isComplete ? bans[`${team}Ban${i + 1}`] : revealedCards.includes(`${team}Ban${i + 1}`) ? bans[`${team}Ban${i + 1}`] : placeholder} 
                  alt={`${team}Ban${i + 1}`} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: isComplete || revealedCards.includes(`${team}Ban${i + 1}`) ? 'contain' : 'contain',
                    border: nextCard === `${team}Ban${i + 1}` ? '1.5px solid yellow' : '1.5px solid #800020'
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
  
      <h2
        style={{ fontSize: '0.6rem', textAlign: 'end', color: team === 'Team1' ? '#5be0e5ff' : 'red', padding: '10px'}}
      >{team == 'Team1' ? 'Blue' : 'Red'} side picks &nbsp;(Top → Support)</h2>
      <div className={'game-team1-picks'}>
        {picks && (
          <>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={nextCard === `${team}Pick${i + 1}` && !isComplete ? 'flash-animation' : ''}>
                <img 
                  className={isComplete || revealedCards.includes(`${team}Pick${i + 1}`) ? 'card-image' : 'placeholder-image'}
                  src={
                    isComplete 
                      ? (windowWidth <= 768 ? picksMobile[sortedPickKeys[i]] : picks[sortedPickKeys[i]]) 
                      : revealedCards.includes(`${team}Pick${i + 1}`) && !isSequentialPick(`${team}Pick${i + 1}`)
                        ? (windowWidth <= 768 ? picksMobile[`${team}Pick${i + 1}`] : picks[`${team}Pick${i + 1}`]) 
                        : placeholder
                  } 
                  alt={`${team}Pick${i + 1}`} 
                  style={{ 
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 
                      ((nextCard === `${team}Pick${i + 1}` || cardAhead === `${team}Pick${i + 1}`) && isSequentialPick(currentCard)) 
                      || ((currentCard === `${team}Pick${i+1}` || previousCard === `${team}Pick${i+1}`) && isSequentialPick(previousCard)) 
                      ? 'lime' 
                      : (nextCard === `${team}Pick${i + 1}` && !isComplete && previousCard !== `${team}Pick${i}` ? 'yellow' : (team === 'Team1' ? '#5be0e5ff' : 'red')),
                    objectFit: isComplete || (revealedCards.includes(`${team}Pick${i + 1}`) && !isSequentialPick(`${team}Pick${i + 1}`)) ? 'cover' : 'contain',
                  }}
                />
                <div className='game-team-names'>
                  <span
                    style={{ color: team === 'Team1' ? 'white' : 'white' }}
                  > {isComplete ? gameDataTeam[sortedPickKeys[i]] : revealedCards.includes(`${team}Pick${i + 1}`) && !isSequentialPick(`${team}Pick${i + 1}`) ? gameDataTeam[`${team}Pick${i + 1}`] : 'Hidden'}</span>
                  <span>{startingRosters[`${team}Players`].split(',')[i].split("(")[0]} 
                    <img src={i === 0 ? topIcon : i === 1 ? jgIcon : i === 2 ? midIcon : i === 3 ? adcIcon : supIcon} alt='role' className='role-icon' crossOrigin={"anonymous"}/>
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
    
  );
}

TeamContainer.propTypes = {
  gameData: PropTypes.object,
  team: PropTypes.string
};