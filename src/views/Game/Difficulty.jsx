
//Hooks
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useTournaments } from '../../hooks/useTournaments.jsx';
import { useOrder } from '../../hooks/useOrder.jsx';
//REACT/NODEJS
import { AuthContext } from '../../contexts/AuthContext.jsx';

//Assets

import { TeamImages } from '../../components/Layout/TeamImages.jsx';




export function Difficulty() {
  const emote = '/emotes/olaf1.png'
  const [difficulty, setDifficulty] = useState('easy');
  const [difficultySettings, setDifficultySettings] = useState({
    easy: {
      pointsPer: 10,
      startCard: 'Team1Ban5',
      cardsShown: 15,
      total: 50
    },
    medium: {
      pointsPer: 10,
      startCard: 'Team1Pick2',
      cardsShown: 9,
      total: 110
    },
    hard: {
      pointsPer: 10,
      startCard: 'Team2Ban3',
      cardsShown: 5,
      total: 150
    },
    custom: {
      pointsPer: 10,
      startCard: 'Team1Ban1',
      cardsShown: 0,
      total: 200
    }
  });
  const { fetchWithToken, error, setError } = useContext(AuthContext);
  const [modifiedGameData, setModifiedGameData] = useState({});
  const [gameLoaded, setGameLoaded] = useState(true);
  const [gameLink, setGameLink] = useState('');
  const navigate = useNavigate();
  const { tournaments, getRandomTournament } = useTournaments();
  const order = useOrder();
  const [selectedTournament, setSelectedTournament] = useState(getRandomTournament());
  const [selectedPatch, setSelectedPatch] = useState('');
  const [selectedStart, setSelectedStart] = useState('Team1Ban1');
  const [isRandomTournament, setIsRandomTournament] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleDifficulty = (difficulty) => {
    setDifficulty(difficulty);
  }

  
  function handleGetGame(tournament, difficulty, patch, startPick) {
    setGameLoaded(false);
    setError('');
    setIsLoading(true)
    if(!tournament || !difficulty) {
      setError('Please select a tournament and difficulty.');
      setGameLoaded(true);
      setGameLink('');
      return;
    }
    if (tournament || patch || startPick || difficulty) {
      const requestBody = {};
      if (tournament) {
        requestBody.tournament = tournament.name;
      }
      if (patch) {
        requestBody.patch = patch;
      }
      if(startPick && difficulty == "custom"){
        requestBody.startPick = startPick;
      } 
      if(difficulty){
        requestBody.difficulty = difficulty;
      }
    fetchWithToken.post(`${import.meta.env.VITE_APP_ALL_GAME_DATA}`, requestBody)
      .then(response => {
        if (response.data) {
          fetchWithToken.post(`${import.meta.env.VITE_APP_MODIFIED_GAME_DATA}`, { body: response.data })
            .then(response => {
              if (response.data) {
                setModifiedGameData(response.data);
                setGameLoaded(true);
                setGameLink(`/game/${response.data.token}`);
              }
            })
            .catch(error => {
              setGameLoaded(true);
              setGameLink('');
              setIsLoading(false)
              if(error.response.status === 429) {
                setError("Too many requests, please try again later.");
                
              } else if(error.response.status === 500) {
                setError("Internal server error. Please try again.");
                
              } else if (error.response.status === 504) {
                setError("Gateway Timeout. Please try again.");
                
              } else if (error.message.includes('cors')) {
                setError("CORS policy error. Please try again.");
                
              } else if (error.response.status === 400) {
                setError("No games found for selected parameters.");
                
              }  else {
                console.error('Error:', error);
                setError("Something went wrong. Please try again.");
                
              }
            });
        }
      })
      .catch(error => {
        setGameLoaded(true);
        setGameLink('');
        setIsLoading(false)
        if(error.response.status === 429) {
          setError("Too many requests, please try again later.");
          
        } else if(error.response.status === 500) {
          setError("Internal server error. Please try again.");
          
        } else if (error.response.status === 504) {
          setError("Gateway Timeout. Please try again.");
          
        } else if (error.message.includes('cors')) {
          setError("CORS policy error. Please try again.");
          
        } else if (error.response.status === 400) {
          setError("No games found for selected parameters.");
          
        }  else {
          console.error('Error:', error);
          setError("Something went wrong. Please try again.");
          
        }
        
      });
    }
  }

  useEffect(() => {
    if(gameLink) {
      navigate(gameLink);
    }
  }, [gameLink, navigate]);

  useEffect(() => {
    return () => {
      setError('');
    };
  }, []);

  

  

  function calculatePoints({ startPick }) {
    const startPickIndex = order.indexOf(startPick);
    
    if (startPickIndex === -1) {
      setError('Invalid start pick.');
      return;
    }
    
    let total = (order.length - startPickIndex) * 10;
    const cardsShown = order.slice(0, startPickIndex).length;
    
    total += 30;
    
    return {
      ...difficultySettings,
      custom: {
        pointsPer: 10,
        startCard: startPick,
        cardsShown: cardsShown,
        total: total
      }
    };
  }

  function generatePatches(patchesPlayed) {
    if (!patchesPlayed.includes('-')) {
      return [patchesPlayed];
    }
    
  
    const [start, end] = patchesPlayed.split('-');
    const [startInt, startDec] = start.split('.').map(part => parseInt(part, 10));
    const [endInt, endDec] = end.split('.').map(part => parseInt(part, 10));
  
    const patches = [];
  
    for (let i = startInt; i <= endInt; i++) {
      let decStart = i === startInt ? startDec : 0;
      let decEnd = i === endInt ? endDec : 9;
  
      for (let j = decStart; j <= decEnd; j++) {
        patches.push(`${i}.${j < 10 ? j : j}`);
      }
    }
   
    return patches;
  }

  const handleImageClick = (region) => {
    const selectedTournament = tournaments[region][tournaments[region].length - 1];
    setSelectedTournament(selectedTournament);
    setSelectedPatch('');
    setIsRandomTournament(false);
  };
 
  return (
    <>
      <main className="difficulty-container fade-in-fwd">
        
        <div className="difficulty-wrapper">

            {/* LEFT SIDE */}
            <section className="stat-filters">
              <div className="stat-filter">
                  <label htmlFor="tournament">Tournament</label>
                  <select 
                    id="tournament" 
                    value={isRandomTournament ? 'random' : selectedTournament?.name}
                    onChange={e => {
                      if (e.target.value === 'random') {
                        setSelectedTournament(getRandomTournament());
                        setSelectedPatch('');
                        setIsRandomTournament(true);
                      } else {
                        const selectedTournament = Object.values(tournaments).flat().find(t => t.name === e.target.value);
                        setSelectedTournament(selectedTournament);
                        setIsRandomTournament(false);
                      }
                    }}
                  >
                    <option value="random">Random</option>
                    {Object.keys(tournaments).map((tournament, index) => (
                      <optgroup key={index} label={tournament}>
                        {tournaments[tournament].map((t, i) => (
                          <option key={i} value={t.name}>{t.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="stat-filter">
                  <label htmlFor="patch">Patch</label>
                  <select id="patch" onChange={e => {
                      setSelectedPatch(e.target.value); 
                    }}
                    disabled={isRandomTournament}
                  >
                    {isRandomTournament && <option value="">Any</option>}
                    {selectedTournament && generatePatches(selectedTournament.patchesPlayed).map((patch, index) => (
                      <option key={index} value={patch}>{patch}</option>
                    ))}
                  </select>
                </div>

                  
                <div className="stat-filter">
                  <label htmlFor="startPick">Start Pick</label>
                  <select id="startPick" 
                    disabled={difficulty !== 'custom'}
                    onChange={e => {
                    setSelectedStart(e.target.value);
                    setDifficultySettings(calculatePoints({startPick: e.target.value}));
                  }}>
                    {difficulty != 'custom' && (<option value="">Custom mode only</option>)}
                    {difficulty === 'custom' && (
                      <>
                        {order.map((pick, index) => (
                          <option key={index} value={pick}>{pick}</option>
                        ))}
                      </>
                    )}
                  </select>

                  
                </div>
                <section className="difficulty-lost">
                    <Link to="/tutorial" className="difficulty-lost-link flash-animation">
                      <span>Lost? Check out the tutorial!</span>
                    </Link>
                  </section>
            
            </section>


            {/* RIGHT SIDE */}
            <section className="difficulty-main">
              <div className="difficulty-main-text">
                <div>
                  <h1
                    style={{color: 
                      difficulty === 'easy' ? '#5cd860' : 
                      difficulty === 'medium' ? '#ec9f39' : 
                      difficulty === 'hard' ? '#f14d4d' : 
                      difficulty === 'custom' ? '#c0b4f5' : '#000' 
                    }}
                  >
                    Difficulty
                  </h1>
                  <p style={{color: error ? 'red' : '#fff'}} className={error ? 'flash-animation' : ''}>
                    {error ? error : 'Choose a difficulty to start the game.'}
                  </p>
                  <ul className="difficulty-main-settings">
                    <li>
                      <span>
                        <span>Points Per:</span> {difficultySettings[difficulty].pointsPer}
                      </span>
                    </li>
                    <li>
                      <span>
                        <span>Start Card:</span> {difficulty == "custom" && selectedStart ? selectedStart : difficultySettings[difficulty].startCard}
                      </span>
                    </li>
                    <li>
                      <span>
                        <span>Total Points:</span> {difficultySettings[difficulty].total}
                      </span>
                    </li>
                    <li>
                      <span>
                        <span>Cards-Shown:</span> {difficultySettings[difficulty].cardsShown+"/20"}
                      </span>
                    </li>
                  </ul>
                </div>
                <img src={emote} alt="emote" />
              </div>

              <div className="difficulty-main-buttons">
                <button className="end-game-details-playagain-button easy" onClick={() => handleDifficulty('easy')}>
                  EASY
                </button>
                <button className="end-game-details-playagain-button med" onClick={() => handleDifficulty('medium')}>
                  MEDIUM
                </button>
                <button className="end-game-details-playagain-button hard" onClick={() => handleDifficulty('hard')}>
                  HARD
                </button>
                <button className="end-game-details-playagain-button custom" onClick={() => handleDifficulty('custom')}>
                  CUSTOM
                </button>
              </div>

              <div className="difficulty-main-submit-button">
                <button className={isLoading ? 'end-game-details-playagain-button difficulty-ellipsis-button' : 'end-game-details-playagain-button'} 
                  onClick={() => handleGetGame(selectedTournament, difficulty, selectedPatch, selectedStart)}>
                  {isLoading ? 'LOADING' : 'PLAY'}
                </button>
              </div>
            </section>
         </div>

         
          {/* BOTTOM SIDE */}
          <section className="difficulty-regions">
            <TeamImages
              containerClass="difficulty-regionimgs-container"
              itemClass="difficulty-region"
              showName={false}
              onImageClick={handleImageClick}
            />
          </section>
         
      </main>
      
    </>
  )
}
