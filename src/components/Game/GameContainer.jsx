//Hooks and Context
import { useContext, useEffect, useState } from 'react';
import { StyleContext } from '../../contexts/StyleContext.jsx';
import { GameContext } from '../../contexts/GameContext.jsx';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


//Components
import { TeamContainer } from './TeamContainer.jsx';
import { SearchContainer } from './SearchContainer.jsx';
import { EndGameContainer } from './EndGameContainer.jsx';


export function GameContainer() {
    const [gameData, setGameData] = useState({});
    const timer = localStorage.getItem('timer') || 0;
    const navigate = useNavigate();

    const { isLoading, setIsLoading } = useContext(StyleContext);
    const { fetchWithToken, error } = useContext(AuthContext);
    const {
      isComplete,  
      showEndGame, 
      token, 
      guesses, setGuesses,
      revealedCards, setRevealedCards,
      setSkipCard,
    } = useContext(GameContext);
    
    
    useEffect(() => {
      fetchWithToken.get(`${import.meta.env.VITE_APP_GET_GAME_TOKEN}/${token}`)
      .then(response => {
        setGameData(response.data);
        setGuesses(response.data.guesses || {});
        setIsLoading(false);
        
        if(response.data.cardsRevealed && response.data.cardsRevealed.length > 0) {
          setRevealedCards(response.data.cardsRevealed);
          if(Object.keys(response.data.guesses).length > 0){
            if(timer && timer < 3){
              setSkipCard(true);
            }
          }
        } else if(response.data.gameData?.body?.difficultySettings?.cardsRevealed) {
          setRevealedCards(response.data.gameData.body.difficultySettings.cardsRevealed);
        }
      })
      .catch(error => {
        if(error.response.status === 404) {
          navigate('*');
        }
        console.error('Error:', error);
        setIsLoading(false);
      });
    }, []);
    
    
    return (
      <>
      {gameData && gameData.gameData && gameData.gameData.body && revealedCards ? (
        <div className="game-container">
          <TeamContainer gameData={gameData} team="Team1" />
          {showEndGame == true && isComplete ? (
            <EndGameContainer 
              gameData={gameData} 
              guesses={guesses}
              fetchWithToken={fetchWithToken}
              showEndGame={showEndGame}
            />
          ) : isLoading ? (
            <div className="loader-container loader-game" id='loader-game'>
              <span className="loader"></span>
              
            </div>
          ) : error  ? (
              <h1 className='toomanyreqgame'>Too many requests. Please try again later.</h1>
          ) : (
            <SearchContainer gameData={gameData} />
          )}
          <TeamContainer gameData={gameData} team="Team2" />
          
        </div>
      ) : (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )
      
    }
        
      </>
  );
}

