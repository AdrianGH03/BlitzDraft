//Hooks and Context
import { useContext, useEffect, useState } from 'react';
import { StyleContext } from '../../contexts/StyleContext';
import { GameContext } from '../../contexts/GameContext';
import PropTypes from 'prop-types';


//Components
import { TeamContainer } from './TeamContainer';
import { SearchContainer } from './SearchContainer';
import { EndGameContainer } from './EndGameContainer';
import { AudioPlayer } from './AudioPlayer';

export function GameContainer({token, setIsLoading, fetchWithToken}) {
    const [gameData, setGameData] = useState({});
    const timer = localStorage.getItem('timer') || 0;
  
    const { isLoading } = useContext(StyleContext);
    const {
        showEndGame,
        isComplete, setIsComplete,
        guesses, setGuesses,
        revealedCards, setRevealedCards,
        startGame, setStartGame,
        skipCard, setSkipCard,
    } = useContext(GameContext);

    useEffect(() => {
      fetchWithToken.get(`${import.meta.env.VITE_APP_GET_GAME_TOKEN}/${token}`)
      .then(response => {
        setGameData(response.data);
        setGuesses(response.data.guesses || {});
        setIsLoading(false);
        console.log(response.data)
        if(response.data.cardsRevealed && response.data.cardsRevealed.length > 0) {
          setRevealedCards(response.data.cardsRevealed);
          if(Object.keys(response.data.guesses).length > 0){
            setTimeout(() => {
              setStartGame(true);
            }, 1000);
            
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
      if(!startGame && !showEndGame) {
        setTimeout(() => {
          setStartGame(true);
        
        }, 5110000); 
      }
    }, [startGame, timer]);
    

    
    useEffect(() => {
      if (startGame && !showEndGame) {
        fetchWithToken.put(`${import.meta.env.VITE_APP_SAVE_GAME}`, {
          token: token,
          guesses: guesses,
          cardsRevealed: revealedCards,
        });
      }
    }, [startGame, guesses, revealedCards]);
  
    useEffect(() => {
      
        console.log(guesses)
      
    } , [guesses])
  
    return (
      <>
      {gameData && gameData.gameData && gameData.gameData.body && revealedCards && (
        <div className="game-container">
          <TeamContainer gameData={gameData} team="Team1" 
          />
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
          ) : (
            <SearchContainer gameData={gameData} 
            />
          )}
          <TeamContainer gameData={gameData} team="Team2" 
          />
          
        </div>
      )}
      </>
  );
}

GameContainer.propTypes = {
    token: PropTypes.string,
    setIsLoading: PropTypes.func,
    fetchWithToken: PropTypes.func,
};