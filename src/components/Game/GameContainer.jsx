//Hooks and Context
import { useContext, useEffect, useState } from 'react';
import { StyleContext } from '../../contexts/StyleContext';
import { GameContext } from '../../contexts/GameContext';
import { AuthContext } from '../../contexts/AuthContext';



//Components
import { TeamContainer } from './TeamContainer';
import { SearchContainer } from './SearchContainer';
import { EndGameContainer } from './EndGameContainer';
import { AudioPlayer } from './AudioPlayer';

export function GameContainer() {
    const [gameData, setGameData] = useState({});
    const timer = localStorage.getItem('timer') || 0;
  
    const { isLoading, setIsLoading } = useContext(StyleContext);
    const { fetchWithToken } = useContext(AuthContext);
    const {
      isComplete,  
      showEndGame, 
      token, 
      guesses, setGuesses,
      revealedCards, setRevealedCards,
      setSkipCard,
      startGame, 
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
        console.error('Error:', error);
        setIsLoading(false);
      });
    }, [token]);
    
    useEffect(() => {
      if (startGame && !showEndGame && !isComplete) {
        fetchWithToken.put(`${import.meta.env.VITE_APP_SAVE_GAME}`, {
          token: token,
          guesses: guesses,
          cardsRevealed: revealedCards,
        });
      }
    }, [startGame, guesses, revealedCards]);
  
    
  
    return (
      <>
      {gameData && gameData.gameData && gameData.gameData.body && revealedCards && (
        <div className="game-container">
          <TeamContainer gameData={gameData} team="Team1" />
          {showEndGame == true ? (
            <EndGameContainer 
              gameData={gameData} 
              guesses={guesses}
              fetchWithToken={fetchWithToken}
            />
          ) : isLoading ? (
            <div className="loader-container">
              <span className="loader"></span>
            </div>
          ) :  (
            <SearchContainer gameData={gameData} />
          )}
          <TeamContainer gameData={gameData} team="Team2" />
          
        </div>
      )}
      </>
  );
}

