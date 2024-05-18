//Hooks
import { useState, useEffect, useRef, useContext } from 'react';
import { useSpring, animated } from 'react-spring';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';
import PropTypes from 'prop-types';

//assets
import SimpleBar from 'simplebar-react';

export function SearchContainer({ gameData }) {
    const { fetchWithToken } = useContext(AuthContext);
    const {
      isComplete, 
      setGuesses,
      revealedCards, setRevealedCards,
      setSkipCard,
      startGame, setStartGame,
      currentCard, setCurrentCard,
      sequentialPicks,
      previousCard, 
    } = useContext(GameContext);
    

    //Images
    const topIcon = '/placeholders/topIcon.png'
    const jungleIcon = '/placeholders/jungleIcon.png'
    const midIcon = '/placeholders/midIcon.png'
    const botIcon = '/placeholders/botIcon.png'
    const supportIcon = '/placeholders/supportIcon.png'
   
    

    //Style states
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    
    //Game states
    const [timer, setTimer] = useState(30);
    const [currentGuess, setCurrentGuess] = useState('');

    //Search states
    const [champions, setChampions] = useState({});
    const [uniqueChampions, setUniqueChampions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const scrollableContainerRef = useRef();

    //Gamedata endpoints
    const gameDataMatch = gameData.gameData.body.game.match;
    const pickOrder = gameData.gameData.body.difficultySettings.order;
    
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
                let cardAhead = pickOrder[currentCardIndex + 2];
                let cardBehind = pickOrder[currentCardIndex - 1];
                // Check if nextCard and cardAhead are a pair in sequentialPicks
                const isSequentialPick = sequentialPicks.some(pair => pair.includes(nextCard) && pair.includes(cardAhead));
    
                // If they are a pair, wait for both guesses before revealing the next card
                if (isSequentialPick && !revealedCards.includes(cardAhead)) {
                  return 30;
                }
    
                while (nextCard !== undefined && revealedCards.includes(nextCard)) {
                  currentCardIndex += 1;
                  nextCard = pickOrder[currentCardIndex + 1];
                }
                if (nextCard !== undefined) {
                  setCurrentCard(nextCard);
                } 
                return 30;
              } else {
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
    
    
    useEffect(() => {
      const storedChampions = localStorage.getItem('champions');
      if (storedChampions) {
        let parsedChampions = JSON.parse(storedChampions);
    
        parsedChampions = Object.entries(parsedChampions).reduce((acc, [role, champs]) => {
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
    
        setChampions(parsedChampions);
    
        let uniqueChamps = [];
        for (let role in parsedChampions) {
          for (let champ in parsedChampions[role]) {
            if (!uniqueChamps.includes(champ)) {
              uniqueChamps.push(champ);
            }
          }
        }
        setUniqueChampions(uniqueChamps);
      } else {
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

            localStorage.setItem('champions', JSON.stringify(correctedData));
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
      }
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
      setGuesses(prevGuesses => ({ ...prevGuesses, [currentCard]: currentGuess }));
      setRevealedCards(prevRevealed => [...prevRevealed, currentCard]);
      setCurrentGuess('');
      setSkipCard(true); 
    
      setTimer(30);
    
      let currentCardIndex = pickOrder.findIndex(card => card === currentCard);
      let nextCard = pickOrder[currentCardIndex + 1];
      let cardAhead = pickOrder[currentCardIndex + 2];
    
      // Check if nextCard and cardAhead are a pair in sequentialPicks
      const isSequentialPick = sequentialPicks.some(pair => pair.includes(nextCard) && pair.includes(cardAhead));
    
      // If they are a pair, wait for both guesses before revealing the next card
      if (isSequentialPick && !revealedCards.includes(cardAhead)) {
        return;
      }
    
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
    

    const isSequentialPick = (card) => {
      // sequentialPicks is an array of pairs of sequential picks
      const pair = sequentialPicks.find(pair => pair.includes(card));
    
      // If the card is part of a sequential pick and the other card in the pair has not been guessed yet
      if (pair && !revealedCards.includes(pair[0] === card ? pair[1] : pair[0])) {
        return true;
      }
      
      return false;
    };
    const picks = gameData?.gameData?.body?.game?.data
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
                <img src={topIcon} alt="Top" onClick={() => selectedRole === 'top' ? (setSelectedRole('all'), setSearchTerm('')) : setSelectedRole('top')} 
                  style={{border: selectedRole === 'top' ? '2px solid #FFD700' : ''}} 
                />
                <img src={jungleIcon} alt="Jungle" onClick={() => selectedRole === 'jungle' ? (setSelectedRole('all'), setSearchTerm('')) : setSelectedRole('jungle')} 
                  style={{border: selectedRole === 'jungle' ? '2px solid #FFD700' : ''}}
                />
                <img src={midIcon} alt="Mid" onClick={() => selectedRole === 'mid' ? (setSelectedRole('all'), setSearchTerm('')) : setSelectedRole('mid')} 
                  style={{border: selectedRole === 'mid' ? '2px solid #FFD700' : ''}}
                />
                <img src={botIcon} alt="Bot" onClick={() => selectedRole === 'adc' ? (setSelectedRole('all'), setSearchTerm('')) : setSelectedRole('adc')} 
                  style={{border: selectedRole === 'adc' ? '2px solid #FFD700' : ''}}
                />
                <img src={supportIcon} alt="Support" onClick={() => selectedRole === 'support' ? (setSelectedRole('all'), setSearchTerm('')) : setSelectedRole('support')} 
                  style={{border: selectedRole === 'support' ? '2px solid #FFD700' : ''}}
                />
                
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
                  const isBlocked = (revealedCards.includes(Object.keys(picks).find(key => picks[key] === champ)) && !(isSequentialPick(previousCard) && picks[previousCard] === champ));
                  return (
                    <div className="champ-container" key={champ} onClick={isBlocked ? () => {} : () => handleChampionClick(champ)}>
                      <img 
                        className={isBlocked ? 'blocked-champion' : ''}
                        src={filteredChampions[role][champ]} 
                        alt={champ} 
                        style={{ 
                          border: currentGuess === champ ? '2px solid #5be0e5ff' : isBlocked ? '2px solid red' : '',
                          pointerEvents: isBlocked ? 'none' : ''
                        }}
                      />
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
                        className={` flash-animation ${isButtonClicked ? 'clicked' : ''}`} 
                        onMouseDown={() => setIsButtonClicked(true)}
                        onMouseUp={() => setIsButtonClicked(false)}
                        onClick={() => setStartGame(true)}
                        
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