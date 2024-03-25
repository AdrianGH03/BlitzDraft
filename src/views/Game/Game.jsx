//Context
import { AuthContext } from '../../contexts/AuthContext';
import { StyleContext } from '../../contexts/StyleContext';

//Hooks
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export function Game() {
  const { token } = useParams();
  const { fetchWithToken } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(StyleContext);
  const [gameData, setGameData] = useState({});
  
  useEffect(() => {
    fetchWithToken.get(`${import.meta.env.VITE_APP_GET_GAME_TOKEN}/${token}`)
      .then(response => {
        setGameData(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, [token]);

  if (isLoading) { 
    return <div>Loading...</div>;
  }

  

  return (
    <>
      <div>
        <h1>{gameData ? 'Working!' : 'Bruh...'}</h1>
      </div>

          {gameData && gameData.gameData && gameData.gameData.body && (
            <div className="test">
            {gameData && gameData.gameData && (
              <div>
                
                <h2>{gameData.gameData.body.game.data.Team1} vs {gameData.gameData.body.game.data.Team2}</h2>
                <h3>{gameData.gameData.body.game.data.Winner} won</h3>
              </div>
            )}

            {gameData.gameData.body.teamImages[0] != '' && gameData.gameData.body.teamImages[1] != '' ? (
              <div className='team-images'>
                <img src={Object.values(gameData.gameData.body.teamImages)[0]} alt={Object.values(gameData.gameData.body.teamImages)[0]} crossOrigin={"anonymous"}/>
                <h2>vs</h2>
                <img src={Object.values(gameData.gameData.body.teamImages)[1]} alt={gameData.gameData.body.game.data.Team2} crossOrigin={"anonymous"}/>
              </div>
            ) : <div>Loading...</div>}

              {gameData.gameData.body.playerImages && Object.values(gameData.gameData.body.playerImages)[0] && (
                <div className="players-parent">
                  {Object.values(gameData.gameData.body.playerImages)[0].map((player, index) => (
                    <div className='player' key={index}>
                      <img src={player.image} alt={`Player ${index + 1}`} crossOrigin={"anonymous"}/>
                    </div>
                  ))}
                </div>
              )}

              {gameData.gameData.body.playerImages && Object.values(gameData.gameData.body.playerImages)[1] && (
                <div className="players-parent">
                  {Object.values(gameData.gameData.body.playerImages)[1].map((player, index) => (
                    <div className='player' key={index}>
                      <img src={player.image} alt={`Player ${index + 1}`} crossOrigin={"anonymous"}/>
                    </div>
                  ))}
                </div>
              )}

              {gameData.gameData.body.champSplashes && gameData.gameData.body.champSplashes.picks && (
                <div className="picks-parent">
                  <h1>Picks</h1>
                  {Object.keys(gameData.gameData.body.champSplashes.picks).map((key, index) => (
                    <div className='pick' key={index}>
                      <img src={gameData.gameData.body.champSplashes.picks[key]} alt={key} crossOrigin={"anonymous"}/>
                    </div>
                  ))}
                </div>
              )}

              {gameData.gameData.body.champSplashes && gameData.gameData.body.champSplashes.bans && (
                <div className="bans-parent">
                  <h1>Bans</h1>
                  {Object.keys(gameData.gameData.body.champSplashes.bans).map((key, index) => (
                    <div className='ban' key={index}>
                      <img src={gameData.gameData.body.champSplashes.bans[key]} alt={key} />
                    </div>
                  ))}
                </div>
              )}

          </div>
      )}
    </>
  )
}
