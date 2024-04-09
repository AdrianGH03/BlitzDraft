//Hooks
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

//REACT/NODEJS
import { AuthContext } from '../../contexts/AuthContext';

//Assets
import leeSinEmote from '../../assets/emotes/leesin1.png';

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

  function goToGame() {
    navigate(gameLink);
  }

  return (
    <>
      <div className="difficulty-container" style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="difficulty-content" style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="difficulty-title">
            <h1>DIFFICULTY</h1>
          </div>

          <div className="difficulty-settings-container">
            
            <div className="difficulty-buttons">
              <button className="btn-23 difficulty-button easy" onClick={() => handleDifficulty('easy')}
                style={difficulty === 'easy' ? { border: '3px solid white' } : {}}
              >
                <span className="text">EASY</span>
                <span aria-hidden="" className="marquee">EASY</span>
              </button>
              <button className="btn-23 difficulty-button medium" onClick={() => handleDifficulty('medium')}
                style={difficulty === 'medium' ? { border: '3px solid white' } : {}}
              >
                <span className="text">MEDIUM</span>
                <span aria-hidden="" className="marquee">MEDIUM</span>
              </button>
              <button className="btn-23 difficulty-button hard" onClick={() => handleDifficulty('hard')}
                style={difficulty === 'hard' ? { border: '3px solid white' } : {}}
              >
                <span className="text">HARD</span>
                <span aria-hidden="" className="marquee">HARD</span>
              </button>
            </div>


            <div className="difficulty-settings">
              <div className="difficulty-settings-setting">
                <h1>{difficulty.toUpperCase()}</h1>
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

          <div className="difficulty-play-container">
            
          {!gameLoaded ? (
            <span className="loader"></span>
          ) : gameLink ? (
            <button className="btn-53 difficulty-play-button" onClick={() => goToGame()}>
              <div className="original">GAME READY</div>
              <div className="letters">
                <span>P</span>
                <span>L</span>
                <span>A</span>
                <span>Y</span>
              </div>
            </button>
          ) : (
            <button className="btn-53 difficulty-play-button" onClick={() => handleGetGame()}>
              <div className="original">GET GAME</div>
              <div className="letters">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
              </div>
            </button>
          )}
          </div>

          <div className="difficulty-note-container">
            {!gameLoaded ? (
              ''
            ) : error ? (
              <p className="difficulty-note">
                {error}
              </p>
            ) : (
              <p className="difficulty-note">
                Points will not be awarded for non-registered users. 
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}