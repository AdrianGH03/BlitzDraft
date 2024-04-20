//Hooks
import { useState, useEffect, useRef, useContext } from 'react';
import { useSpring, animated } from 'react-spring';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';
import { StyleContext } from '../../contexts/StyleContext';
import PropTypes from 'prop-types';

//assets
import SimpleBar from 'simplebar-react';
import topIcon from '../../assets/placeholders/topIcon.png';
import jungleIcon from '../../assets/placeholders/jungleIcon.png';
import midIcon from '../../assets/placeholders/midIcon.png';
import botIcon from '../../assets/placeholders/botIcon.png';
import supportIcon from '../../assets/placeholders/supportIcon.png';
import pickSound from '../../assets/audio/pickSound.ogg';
import banSound from '../../assets/audio/banSound.ogg';
import timerTick from '../../assets/audio/timerTick.ogg';
import timerTick2 from '../../assets/audio/timerTick2.ogg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

export function SearchContainer({ gameData }) {
    const { fetchWithToken } = useContext(AuthContext);
    const {
      isComplete, setIsComplete,  
      setGuesses,
      revealedCards, setRevealedCards,
      setSkipCard,
      startGame, setStartGame,
      setShowEndGame,
      mute, setMute,
      imagesLoaded
    } = useContext(GameContext);
    const { isLoading, setIsLoading } = useContext(StyleContext);

    //Audio
    const pickSoundAudio = new Audio(pickSound);
    const banSoundAudio = new Audio(banSound);
    const timerTickAudio = new Audio(timerTick);
    const timerTick2Audio = new Audio(timerTick2);
    pickSoundAudio.volume = 0.3; 
    banSoundAudio.volume = 0.3;
    timerTickAudio.volume = 0.4;
    timerTick2Audio.volume = 0.4;
    const muteRef = useRef(mute);

    //Style states
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    
    //Game states
    const [currentCard, setCurrentCard] = useState(null);
    const [timer, setTimer] = useState(30);
    const [currentGuess, setCurrentGuess] = useState('');

    //Search states
    const [champions, setChampions] = useState({});
    const [uniqueChampions, setUniqueChampions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const scrollableContainerRef = useRef();

    //Gamedata endpoints
    const gameDataMatch = gameData.gameData.body.game.match;
    const pickOrder = gameData.gameData.body.difficultySettings.order;
    const gameDataCards = gameData.gameData.body.game.data;
    
    let teamNames;
    if(gameDataMatch){
      teamNames = gameDataMatch.split(' vs ');
    }

    useEffect(() => {
      if(!startGame){
        localStorage.removeItem('timer');
      }
    }, [startGame]);
    
    
    useEffect(() => {
      if (startGame) {
        let currentCardIndex = pickOrder.findIndex(card => !revealedCards.includes(card));
        if (currentCardIndex !== -1) {
          setCurrentCard(pickOrder[currentCardIndex]);
        }
      }
    }, [startGame, pickOrder, revealedCards]);

    useEffect(() => {
      muteRef.current = mute;
    }, [mute]);

    
    useEffect(() => {
      if (startGame && currentCard) {
        let interval;
        const startInterval = () => {
          setTimer(30);
          interval = setInterval(() => {
            setTimer(prevTimer => {
              if (prevTimer === 1) {
                clearInterval(interval);
                let currentCardIndex = pickOrder.findIndex(card => card === currentCard);
                let nextCard = pickOrder[currentCardIndex + 1];
                while (nextCard !== undefined && revealedCards.includes(nextCard)) {
                  currentCardIndex += 1;
                  nextCard = pickOrder[currentCardIndex + 1];
                }
                if (nextCard !== undefined) {
                  setCurrentCard(nextCard);
                } 
                return 30;
              } else {
                if(prevTimer <= 5 && !muteRef.current){
                  timerTick2Audio.play();
                } else if (!muteRef.current) {
                  timerTickAudio.play();
                }
                return prevTimer - 1;
              }
            });
          }, 1000);
        };
        startInterval();
        return () => {
          clearInterval(interval);
        };
      }
    }, [startGame, currentCard, pickOrder, revealedCards, isComplete]);

    const correctNames = {
      "MonkeyKing": "Wukong",
      "MissFortune": "Miss Fortune",
      "Chogath": "Cho'Gath",
      "KSante": "K'Sante",
      "TahmKench": "Tahm Kench",
      "RekSai": "Rek'Sai",
      "Kaisa": "Kai'Sa",
      "Velkoz": "Vel'Koz",
      "KogMaw": "Kog'Maw",
      "MasterYi": "Master Yi",
      "TwistedFate": "Twisted Fate",
      "DrMundo": "Dr. Mundo",
      "JarvanIV": "Jarvan IV",
      "Khazix": "Kha'Zix",
      "Leblanc": "LeBlanc",
      "LeeSin": "Lee Sin",
      "Belveth": "Bel'Veth",
      "XinZhao": "Xin Zhao",
      "AurelionSol": "Aurelion Sol",
    };
    
    
    useEffect (() => {
      fetchWithToken.get(`${import.meta.env.VITE_APP_ALL_CHAMPS}`)
        .then(response => {
          
          const correctedData = Object.entries(response.data).reduce((acc, [role, champs]) => {
            acc[role] = Object.entries(champs).reduce((accChamps, [champ, sprite]) => {
              if (correctNames.hasOwnProperty(champ)) {
                accChamps[correctNames[champ]] = sprite;
              } else {
                accChamps[champ] = sprite;
              }
              return accChamps;
            }, {});
            return acc;
          }, {});
    
          setChampions(correctedData);
    
          let uniqueChamps = [];
    
          for (let role in correctedData) {
            for (let champ in correctedData[role]) {
              if (!uniqueChamps.includes(champ)) {
                uniqueChamps.push(champ);
              }
            }
          }
          setUniqueChampions(uniqueChamps);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);

    
    useEffect(() => {
      if (scrollableContainerRef.current) {
        const scrollElement = scrollableContainerRef.current.getScrollElement();
        scrollElement.scrollTo(0, 0);
      }
    }, [selectedRole]);

    
    useEffect(() => {
      if (isComplete) {
        setTimer(0);
      }
    }, [isComplete]);


    
    let addedChampions = [];
    const filteredChampions = Object.keys(champions).reduce((acc, role) => {
      if (selectedRole && selectedRole !== role) {
        return acc;
      }
      
      acc[role] = Object.keys(champions[role]).filter(champ => {
        const lowerCaseChamp = champ.toLowerCase();
        const isChampAdded = addedChampions.includes(lowerCaseChamp);
        if (!isChampAdded && lowerCaseChamp.includes(searchTerm.toLowerCase())) {
          addedChampions.push(lowerCaseChamp);
          return true;
        }
        return false;
      }).sort().reduce((obj, key) => {
        obj[key] = champions[role][key];
        return obj;
      }, {});
      return acc;
    }, {});

    
    const handleChampionClick = (champ) => {
      if(!startGame) return;
      setCurrentGuess(champ);
    };
    
    const handleGuessButtonClick = () => {
      if(currentGuess === '') return;
      if(revealedCards.includes()) return;
      setGuesses(prevGuesses => ({ ...prevGuesses, [currentCard]: currentGuess }));
      setRevealedCards(prevRevealed => [...prevRevealed, currentCard]);
      if (pickOrder[revealedCards.length].includes('Pick') && !mute) {
        pickSoundAudio.play();
      } else if (pickOrder[revealedCards.length].includes('Ban') && !mute) {
        banSoundAudio.play();
      }
      setCurrentGuess('');
      setSkipCard(true); 
    
      setTimer(30);
     
    
      let currentCardIndex = pickOrder.findIndex(card => card === currentCard);
      let nextCard = pickOrder[currentCardIndex + 1];
      while (nextCard !== undefined && revealedCards.includes(nextCard)) {
        currentCardIndex += 1;
        nextCard = pickOrder[currentCardIndex + 1];
      }
      if (nextCard !== undefined) {
        setCurrentCard(nextCard);
      }
    };

    const { width } = useSpring({
      from: { width: '100%' },
      to: { width: `${(timer / 30) * 100}%` },
      config: { duration: 1000 }
    });
    
    return (
        <div className="game-search-container">

              {
                isComplete ? '' : 
                <div className="game-timer">
                    <animated.div
                      style={{
                        width,
                        backgroundColor: timer <= 5 ? '#c2c0c0' : 'white',
                        height: '5px'
                      }}
                    />
                </div>
              }

            <div className="game-searchbar">
              <div className="game-role-filters">
                <img src={topIcon} alt="Top" onClick={() => selectedRole === 'top' ? (setSelectedRole(''), setSearchTerm('')) : setSelectedRole('top')} 
                  style={{border: selectedRole === 'top' ? '2px solid #FFD700' : ''}} 
                />
                <img src={jungleIcon} alt="Jungle" onClick={() => selectedRole === 'jungle' ? (setSelectedRole(''), setSearchTerm('')) : setSelectedRole('jungle')} 
                  style={{border: selectedRole === 'jungle' ? '2px solid #FFD700' : ''}}
                />
                <img src={midIcon} alt="Mid" onClick={() => selectedRole === 'mid' ? (setSelectedRole(''), setSearchTerm('')) : setSelectedRole('mid')} 
                  style={{border: selectedRole === 'mid' ? '2px solid #FFD700' : ''}}
                />
                <img src={botIcon} alt="Bot" onClick={() => selectedRole === 'adc' ? (setSelectedRole(''), setSearchTerm('')) : setSelectedRole('adc')} 
                  style={{border: selectedRole === 'adc' ? '2px solid #FFD700' : ''}}
                />
                <img src={supportIcon} alt="Support" onClick={() => selectedRole === 'support' ? (setSelectedRole(''), setSearchTerm('')) : setSelectedRole('support')} 
                  style={{border: selectedRole === 'support' ? '2px solid #FFD700' : ''}}
                />
                {
                  mute ? (
                    <FontAwesomeIcon className='fa-volume-xmark' icon={faVolumeXmark} onClick={() => setMute(false)} />
                  ) : (
                    <FontAwesomeIcon className='fa-volume-high' icon={faVolumeHigh} onClick={() => setMute(true)} />
                  )
                }
              </div>
              <input
                type="text"
                placeholder="Search..."
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>


            <SimpleBar
              forceVisible="y"
              autoHide={false}
              style={{
                maxHeight: window.innerWidth > 1024 ? 400 : window.innerWidth > 540 ? 300 : 300
              }}
              ref={scrollableContainerRef} 
            >
            <div className="game-search-champions">
            {Object.keys(filteredChampions).map(role =>
              Object.keys(filteredChampions[role]).map(champ => {
                const isChampInGameDataCards = Object.keys(gameDataCards).some(key => revealedCards.includes(key) && gameDataCards[key] === champ);
                return (
                  <div 
                    className="champ-container" 
                    key={champ} 
                    onClick={() => {
                      if (!isChampInGameDataCards) {
                        handleChampionClick(champ)
                      }
                    }}
                    style={{
                      pointerEvents: isChampInGameDataCards ? 'none' : 'auto' 
                    }}
                  >
                    <div className="img-container" style={{ 
                      position: 'relative',
                      display: 'inline-block',
                    }}>
                      <img 
                        src={filteredChampions[role][champ]} 
                        alt={champ} 
                        style={{ 
                          border: isChampInGameDataCards ? '2px solid red' : (currentGuess === champ ? '2px solid #5be0e5ff' : ''),
                          position: 'relative',
                          zIndex: 1,
                        }}
                      />
                      {isChampInGameDataCards && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(255,255,255,0))',
                          zIndex: 2,
                        }}></div>
                      )}
                    </div>
                    <span>{champ}</span>
                  </div>
                );
              })
            )}
          </div>
            </SimpleBar>


            <div className="game-search-submit">
              {gameData.gameData.body.teamImages[teamNames[0]] != '' &&
                <img className="team-image" src={gameData.gameData.body.teamImages[teamNames[0]]} alt={Object.values(gameData.gameData.body.teamImages)[0]} crossOrigin={"anonymous"}/>
              }
              <div className="game-region">
                <h1>{gameData.gameData.body.region}</h1>
              </div>
                  {startGame ? (
                      <button className={`game-guess-button ${isButtonClicked ? 'clicked' : ''}`}
                        onMouseDown={() => setIsButtonClicked(true)}
                        onMouseUp={() => setIsButtonClicked(false)}
                        onClick={handleGuessButtonClick}
                      >
                        <span className="text">GUESS</span>
                        
                      </button>
                    ): (
                      <button 
                        className={`game-guess-button flash-animation ${isButtonClicked ? 'clicked' : ''}`} 
                        onMouseDown={() => setIsButtonClicked(true)}
                        onMouseUp={() => setIsButtonClicked(false)}
                        onClick={() => setStartGame(true)}
                        style={{backgroundColor: '#b81111'}}
                      >
                        <span className="text">START</span>
                        
                      </button>
                    )}

              <div className="game-region">
                <h1>{gameData.gameData.body.game.data.Patch}</h1>
              </div>
              {gameData.gameData.body.teamImages[teamNames[1]] != '' &&
                <img className="team-image" src={gameData.gameData.body.teamImages[teamNames[1]]} alt={gameData.gameData.body.game.data.Team2} crossOrigin={"anonymous"}/>
              }
            </div>

            
        </div>
        
    )
}

SearchContainer.propTypes = {
  gameData: PropTypes.object
};