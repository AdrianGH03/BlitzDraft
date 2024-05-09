//Context
import { AuthContext } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';

//Hooks
import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


//Assets
import { GameContainer } from '../../components/Game/GameContainer';


export function Game() {
  const { token } = useParams();
  const { fetchWithToken, error, setError } = useContext(AuthContext);
  const [isComplete, setIsComplete] = useState(false);
  const [showEndGame, setShowEndGame] = useState(true);
  const [guesses, setGuesses] = useState({});
  const [skipCard, setSkipCard] = useState(false);
  const [revealedCards, setRevealedCards] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const pairs = [
    ['Team1Pick2', 'Team1Pick3'],
    ['Team2Pick1', 'Team2Pick2'],
    ['Team1Pick4', 'Team1Pick5']
  ];
  const [currentCard, setCurrentCard] = useState(null);
  const [nextCard, setNextCard] = useState('');
  
  

  useEffect(() => {
    async function fetchData() {
      if (isComplete) {
        fetchWithToken.put(`${import.meta.env.VITE_APP_SET_GAME_COMPLETE}/${token}`)
          .then(response => {
            if(response.data.message == 'Game completed') {
              setShowEndGame(true);
              setStartGame(false);
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }
    fetchData();
  }, [isComplete]);

  async function checkIsComplete() {
    try {
      const response = await fetchWithToken.get(`${import.meta.env.VITE_APP_CHECK_GAME_COMPLETE}/${token}`);
      if(response.data.isCompleted) {
        const value = response.data.isCompleted;
        return value;
      } else {
        return false;
      }
    } catch (error) {
      if(error.response.status === 429) {
        setError('Too many requests, please try again later');
      }
      console.error('Error:', error);
      return false;
    }
  }

  useEffect(() => {
    async function checkGameComplete() {
      const value = await checkIsComplete();
      setShowEndGame(value);
      setIsComplete(value);
    }
    checkGameComplete();
  }, [token]);


  return (
    <>
    <GameContext.Provider value={{ 
      isComplete, setIsComplete, 
      showEndGame, setShowEndGame,
      token, 
      guesses, setGuesses,
      revealedCards, setRevealedCards,
      skipCard, setSkipCard,
      startGame, setStartGame,
      imagesLoaded, setImagesLoaded,
      pairs,
      currentCard, setCurrentCard,
      nextCard, setNextCard
    }} >
        <GameContainer />
      </GameContext.Provider>
    </>
  )
}

