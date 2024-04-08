//Hooks
import { useState, useEffect, useRef, useContext } from 'react';
import { useSpring, animated } from 'react-spring';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';
import PropTypes from 'prop-types';

//assets
import SimpleBar from 'simplebar-react';
import topIcon from '../../assets/placeholders/topIcon.png';
import jungleIcon from '../../assets/placeholders/jungleIcon.png';
import midIcon from '../../assets/placeholders/midIcon.png';
import botIcon from '../../assets/placeholders/botIcon.png';
import supportIcon from '../../assets/placeholders/supportIcon.png';

export function SearchContainer({ gameData }) {
    const { fetchWithToken } = useContext(AuthContext);
    const { 
      setStartGame, startGame,
      setSkipCard,
      isComplete, setIsComplete,
      setGuesses
    } = useContext(GameContext);
    
    //Style states
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    //Game states
    const [currentCard, setCurrentCard] = useState(null);
    const [timer, setTimer] = useState(5);
    const [currentGuess, setCurrentGuess] = useState('');
    const [revealedCards, setRevealedCards] = useState([]);

    //Search states
    const [champions, setChampions] = useState({});
    const [uniqueChampions, setUniqueChampions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const scrollableContainerRef = useRef();

    //Gamedata endpoints
    const gameDataMatch = gameData.gameData.body.game.match;
    const pickOrder = gameData.gameData.body.difficultySettings.order;
    const cardsRevealed = gameData.gameData.body.difficultySettings.cardsRevealed;
    let teamNames;
    if(gameDataMatch){
      teamNames = gameDataMatch.split(' vs ');
    }

    useEffect(() => {
      if(!startGame){
        localStorage.removeItem('timer');
      }
    }, [startGame]);
    
    // Sets the current card to the next card in the pick order that has not been revealed
    useEffect(() => {
      if (startGame) {
        let currentCardIndex = pickOrder.findIndex(card => !cardsRevealed.includes(card));
        if (currentCardIndex !== -1) {
          setCurrentCard(pickOrder[currentCardIndex]);
        }
      }
    }, [startGame, pickOrder, cardsRevealed]);


    // Timer for each card
    useEffect(() => {
      if (startGame && currentCard) {
        let savedTimer = localStorage.getItem('timer');
        if (savedTimer) {
          setTimer(parseInt(savedTimer, 10));
        } else {
          setTimer(5);
        }
        let interval;
        const startInterval = () => {
          interval = setInterval(() => {
            setTimer(prevTimer => {
              if (prevTimer === 1) {
                clearInterval(interval);
                if (currentGuess === '') {
                  setTimeout(() => setGuesses(prevGuesses => ({ ...prevGuesses, [currentCard]: 'None' })), 0);
                }
                let currentCardIndex = pickOrder.findIndex(card => card === currentCard);
                let nextCard = pickOrder[currentCardIndex + 1];
                while (nextCard !== undefined && revealedCards.includes(nextCard)) {
                  currentCardIndex += 1;
                  nextCard = pickOrder[currentCardIndex + 1];
                }
                if (nextCard !== undefined) {
                  setCurrentCard(nextCard);
                  clearInterval(interval);
                  startInterval();
                } else {
                  setIsComplete(true); 
                }
                localStorage.setItem('timer', 5);
                return 30;
              } else {
                localStorage.setItem('timer', prevTimer - 1);
                return prevTimer - 1;
              }
            });
          }, 1000);
        };
        startInterval();
        return () => {
          clearInterval(interval);
          if (isComplete) {
            localStorage.removeItem('timer');
          }
        };
      }
    }, [startGame, currentCard, currentGuess, pickOrder, revealedCards, isComplete, setGuesses]);

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
    
    // Fetches all champion sprites and sets them to the champions state SEARCH CONTAINER
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

    // Scrolls to the top of the search container when the selected role changes
    useEffect(() => {
      if (scrollableContainerRef.current) {
        const scrollElement = scrollableContainerRef.current.getScrollElement();
        scrollElement.scrollTo(0, 0);
      }
    }, [selectedRole]);

    // Resets the timer when the game is complete
    useEffect(() => {
      if (isComplete) {
        setTimer(0);
      }
    }, [isComplete]);


    // Filters the champions based on the selected role and search term
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

    // Handles the click event for a champion in the search container
    const handleChampionClick = (champ) => {
      if(!startGame) return;
      setCurrentGuess(champ);
    };
    
    const handleGuessButtonClick = () => {
      if(currentGuess === '') return;
      setGuesses(prevGuesses => ({ ...prevGuesses, [currentCard]: currentGuess }));
    
      const newRevealedCards = [...revealedCards, currentCard];
      setRevealedCards(newRevealedCards);
      setCurrentGuess('');
      setSkipCard(true); 
    
      
      localStorage.setItem('timer', 5);
    
      let currentCardIndex = pickOrder.findIndex(card => card === currentCard);
      let nextCard = pickOrder[currentCardIndex + 1];
      while (nextCard !== undefined && newRevealedCards.includes(nextCard)) {
        currentCardIndex += 1;
        nextCard = pickOrder[currentCardIndex + 1];
      }
      if (nextCard !== undefined) {
        setCurrentCard(nextCard);
      }
    };

    const { width } = useSpring({
      from: { width: '100%' },
      to: { width: `${(timer / 5) * 100}%` },
      config: { duration: 1000 }
    });

  
    return (
        <div className="game-search-container">

              {
                isComplete ? '' : 
                <div className="game-timer">
                  <animated.div style={{ 
                    width, 
                    backgroundColor: 'white', 
                    height: '5px' 
                  }} />
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
                maxHeight: window.innerWidth > 1024 ? 400 : window.innerWidth > 540 ? 300 : 200
              }}
              ref={scrollableContainerRef} 
            >
            <div className="game-search-champions">
              {Object.keys(filteredChampions).map(role =>
                Object.keys(filteredChampions[role]).map(champ => (
                  <div className="champ-container" key={champ} onClick={() => handleChampionClick(champ)}>
                    <img src={filteredChampions[role][champ]} alt={champ} style={{ border: currentGuess === champ ? '2px solid #5be0e5ff' : '' }} />
                    <span>{champ}</span>
                  </div>
                ))
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