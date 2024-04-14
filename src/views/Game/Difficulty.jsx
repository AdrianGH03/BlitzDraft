//Hooks
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

//REACT/NODEJS
import { AuthContext } from '../../contexts/AuthContext';

//Assets
import leeSinEmote from '../../assets/emotes/leesin1.png';
import azirEmote from '../../assets/emotes/nasus1.png';

export const Difficulty = () => {
  const [difficulty, setDifficulty] = useState('easy');
  //eslint-disable-next-line
  const [difficultySettings, setDifficultySettings] = useState({
    easy: {
      pick: 10,
      ban: 8.33,
      startCard: 'Team1Ban5',
      cardsShown: 15,
      total: 50
    },
    medium: {
      pick: 10,
      ban: 15,
      startCard: 'Team1Pick3',
      cardsShown: 10,
      total: 100
    },
    hard: {
      pick: 10,
      ban: 16.66,
      startCard: 'Team2Ban3',
      cardsShown: 5,
      total: 150
    }
  });
  const { fetchWithToken, error, setError } = useContext(AuthContext);
  //eslint-disable-next-line
  const [modifiedGameData, setModifiedGameData] = useState({});
  const [gameLoaded, setGameLoaded] = useState(true);
  const [gameLink, setGameLink] = useState('');
  const navigate = useNavigate();


  const handleDifficulty = (difficulty) => {
    setDifficulty(difficulty);
  }


  function handleGetGame() {
    setGameLoaded(false);
    setError('');
    fetchWithToken.get(`${import.meta.env.VITE_APP_ALL_GAME_DATA}?difficulty=${difficulty}`)
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
              console.error('Error:', error);
              setError("Something went wrong. Please try again.");
              setGameLoaded(true);
              setGameLink('');
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    if(gameLink) {
      navigate(gameLink);
    }
  }, [gameLink, navigate]);

  return (
    <>
      <div className="difficulty-container fade-in-fwd" style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      
        <div className="difficulty-content" style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="difficulty-title">
            <h1>DIFFICULTY</h1>
          </div>

          <div className="difficulty-settings-container fade-in-fwd">

            
            
            <div className="difficulty-buttons">
              <button className="btn-23 difficulty-button easy" onClick={() => handleDifficulty('easy')}
                style={difficulty === 'easy' ? { border: '2px solid #b2b2bcff' } : { border: '2px solid transparent'}}
              >
                <span className="text">EASY</span>
                <span aria-hidden="" className="marquee">EASY</span>
              </button>
              <button className="btn-23 difficulty-button medium" onClick={() => handleDifficulty('medium')}
                style={difficulty === 'medium' ? { border: '2px solid #b2b2bcff' } : { border: '2px solid transparent'}}
              >
                <span className="text">MEDIUM</span>
                <span aria-hidden="" className="marquee">MEDIUM</span>
              </button>
              <button className="btn-23 difficulty-button hard" onClick={() => handleDifficulty('hard')}
                style={difficulty === 'hard' ? { border: '2px solid #b2b2bcff' } : { border: '2px solid transparent'}}
              >
                <span className="text">HARD</span>
                <span aria-hidden="" className="marquee">HARD</span>
              </button>
            </div>


            <div className="difficulty-settings fade-in-fwd">
              <div className="difficulty-settings-setting">
                <h1
                  style={difficulty === 'easy' ? { color: 'lime' } : difficulty === 'medium' ? { color: 'orange' } : { color: 'red' }}
                >{difficulty.toUpperCase()}</h1>
                {difficulty && (
                  <>
                  <div className="settings">
                    <span>PICK/BAN PER: &nbsp;{difficultySettings[difficulty].pick}</span>
                    <span>START: &nbsp;{difficultySettings[difficulty].startCard}</span>
                    <span>CARDS SHOWN: &nbsp;{difficultySettings[difficulty].cardsShown}</span>
                    <span>TOTAL POINTS: &nbsp;{difficultySettings[difficulty].total}</span>
                    </div>
                  </>
                )}
              </div>


              <div className="difficulty-emote">
                <img src={leeSinEmote} alt="Lee Sin Emote" />
              </div>


            </div>
          </div>

          <div className="difficulty-play-container fade-in-fwd">
              <p className='difficulty-guide'>
                  <Link to="/tutorial">Lost? Check out the tutorial for more information.</Link>
                </p>
          {!gameLoaded ? (
            <span className="loader"></span>
          ) : (
            <button className='league-button' onClick={() => handleGetGame()}>PLAY</button>
          )}
          </div>

          <div className="difficulty-note-container fade-in-fwd">
            {!gameLoaded ? (
              ''
            ) : error ? (
              <p className="difficulty-note">
                {error}
              </p>
            ) : (
              <>
                <p className="difficulty-note">
                  Points will not be stored for non-registered users. 
                </p>
                
              </>
            )}
          </div>
            {!gameLoaded ? (
              <div></div>
            ) : (
              <div className="difficulty-emote-side">
                <img src={azirEmote} alt="Lee Sin Emote" />
              </div>
            )}
        </div>
      </div>
    </>
  )
}