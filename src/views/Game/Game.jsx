//Context
import { AuthContext } from '../../contexts/AuthContext';
import { StyleContext } from '../../contexts/StyleContext';
import { GameContext } from '../../contexts/GameContext';

//Hooks
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


//Assets
import { GameContainer } from '../../components/Game/GameContainer';


export function Game() {
  const { token } = useParams();
  const { fetchWithToken } = useContext(AuthContext);
  //eslint-disable-next-line
  const { isLoading, setIsLoading } = useContext(StyleContext);
  const [isComplete, setIsComplete] = useState(false);
  const [showEndGame, setShowEndGame] = useState(true);

  const [startGame, setStartGame] = useState(false);
  const [skipCard, setSkipCard] = useState(false);
  const [guesses, setGuesses] = useState({});
  const [revealedCards, setRevealedCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (isComplete) {
        fetchWithToken.put(`${import.meta.env.VITE_APP_SET_GAME_COMPLETE}/${token}`)
          .then(response => {
            if(response.data.message == 'Game completed') {
              setShowEndGame(true);
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
        showEndGame,
        isComplete, setIsComplete,
        guesses, setGuesses,
        revealedCards, setRevealedCards,
        startGame, setStartGame,
        skipCard, setSkipCard,
      }}>
        <GameContainer 
          token={token}
          fetchWithToken={fetchWithToken}
          setIsLoading={setIsLoading} 
        />
      </GameContext.Provider>
    </>
  )
}

