//hooks and context
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleContext } from '../../contexts/StyleContext';
import { GameContext } from '../../contexts/GameContext';

//Assets
import topIcon from '../../assets/placeholders/topIcon.png';
import jgIcon from '../../assets/placeholders/jungleIcon.png';
import midIcon from '../../assets/placeholders/midIcon.png';
import adcIcon from '../../assets/placeholders/botIcon.png';
import supIcon from '../../assets/placeholders/supportIcon.png';
import placeholder from '../../assets/placeholders/lolplaceholder.png';
import pickSound from '../../assets/audio/pickSound.ogg';
import banSound from '../../assets/audio/banSound.ogg';

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

  //Audio
  const pickSoundAudio = new Audio(pickSound);
  const banSoundAudio = new Audio(banSound);
  pickSoundAudio.volume = 0.6; 
  banSoundAudio.volume = 0.6;

  //Context
  const { setIsLoading } = useContext(StyleContext);
  const { 
    isComplete, setIsComplete, 
    revealedCards, setRevealedCards,
    startGame,
    mute
  } = useContext(GameContext);
  
  const sortedPickKeys = picksByRoleOrder.map(pick => {
    const pickKey = Object.keys(gameDataTeam).find(key => gameDataTeam[key] === pick);
    return pickKey;
  });

  const [nextCard, setNextCard] = useState('');

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
    imgUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, [gameData]);
  
  useEffect(() => {
    let interval;
  
    const startInterval = () => {
      if (startGame) {
        setNextCard(pickOrder[revealedCards.length]);
        if (pickOrder.length === revealedCards.length && !isComplete) {
          setIsComplete(true);
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
        const timerInterval = 30000;
        let initialDelay = revealedCards.length === 0 ? timerInterval : 0; 
  
        setTimeout(() => {
          interval = setInterval(() => {
            if (pickOrder.length > revealedCards.length && revealedCards.length > 0) {
              setRevealedCards([...revealedCards, pickOrder[revealedCards.length]]);
              if (pickOrder[revealedCards.length].includes('Pick') && !mute) {
                pickSoundAudio.play();
              } else if (pickOrder[revealedCards.length].includes('Ban') && !mute) {
                banSoundAudio.play();
              }
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
  
  



  return (
    <div className={`game-team1-container`}>
  
      <div className={`game-team1-bans`}>
        <h2>{team == 'Team1' ? 'Blue' : 'Red'} side bans</h2>
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
  
      <h2>{team == 'Team1' ? 'Blue' : 'Red'} side picks &nbsp;(Top → Support)</h2>
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
                      : revealedCards.includes(`${team}Pick${i + 1}`) 
                        ? (windowWidth <= 768 ? picksMobile[`${team}Pick${i + 1}`] : picks[`${team}Pick${i + 1}`]) 
                        : placeholder
                  } 
                  alt={`${team}Pick${i + 1}`} 
                  style={{ 
                    border: nextCard === `${team}Pick${i + 1}` && !isComplete ? '1px solid yellow' : (team === 'Team1' ? '2px solid #5be0e5ff' : '2px solid red'),
                    objectFit: isComplete || revealedCards.includes(`${team}Pick${i + 1}`) ? 'cover' : 'contain'
                  }}
                />
                <div className='game-team-names'>
                  <span
                    style={{ color: team === 'Team1' ? 'white' : 'white' }}
                  > {isComplete ? gameDataTeam[sortedPickKeys[i]] : revealedCards.includes(`${team}Pick${i + 1}`) ? gameDataTeam[`${team}Pick${i + 1}`] : 'Hidden'}</span>
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