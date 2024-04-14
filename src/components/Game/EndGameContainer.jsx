import React from 'react'
import { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import lowscoreEmote from '../../assets/emotes/lowscore.png'
import highscoreEmote from '../../assets/emotes/highscore.png'
import medscoreEmote from '../../assets/emotes/medscore.png'
//assets
import topIcon from '../../assets/placeholders/topIcon.png';
import jungleIcon from '../../assets/placeholders/jungleIcon.png';
import midIcon from '../../assets/placeholders/midIcon.png';
import botIcon from '../../assets/placeholders/botIcon.png';
import supportIcon from '../../assets/placeholders/supportIcon.png';

export const EndGameContainer = ({guesses, gameData, fetchWithToken }) => {

    const [scoreRange, setScoreRange] = React.useState(0)
    const [emote, setEmote] = React.useState(null)
    const [totalPoints, setTotalPoints] = React.useState(0)
    const [actualScore, setActualScore] = React.useState(0)
    const icons = [topIcon, jungleIcon, midIcon, botIcon, supportIcon];
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);


    const gameDataMatch = gameData.gameData.body.game.match;
    let teamNames;
    if(gameDataMatch){
      teamNames = gameDataMatch.split(' vs ');
    }

    useEffect(() => {
        if(Object.keys(gameData).length > 0 && Object.keys(guesses).length > 0 && gameData.difficulty) {
            const requestBody = {
                gameData: gameData.gameData.body.game.data,
                difficulty: gameData.difficulty,
                guesses: guesses
            };
    
            if (userInfo) {
                requestBody.userInfo = userInfo;
            }
    
            fetchWithToken.post(`${import.meta.env.VITE_APP_CALCULATE_SCORE}`, requestBody)
            .then(response => {
                if(response === 400){
                    navigate('/game/difficulty')
                }
                setScoreRange((response.data.totalScore / response.data.outOf) * 100)
                setTotalPoints(response.data.outOf)
                setActualScore(response.data.totalScore)
                if((response.data.totalScore / response.data.outOf) * 100 < 33) {
                    setEmote(lowscoreEmote) 
                } else if((response.data.totalScore / response.data.outOf) * 100 < 66) {
                    setEmote(medscoreEmote)
                } else {
                    setEmote(highscoreEmote)
                }
            })
            .catch(error => {
            console.error('Error:', error);
            });
        }
    }, []);

    const goToGame = () => {
        navigate('/game/difficulty')
    }

  return (
    <>
        {gameData.difficulty && Object.keys(guesses).length > 0 && Object.keys(gameData).length > 0 && (
            <section className="end-game-container">
                <header className="end-game-heading-container">
                    {gameData.gameData.body.teamImages[teamNames[0]] != '' &&
                        <img className="team-image" src={gameData.gameData.body.teamImages[teamNames[0]]} alt={Object.values(gameData.gameData.body.teamImages)[0]} crossOrigin={"anonymous"}/>
                    }
                    <h1 className="end-game-heading">GAME COMPLETE</h1>

                    {gameData.gameData.body.teamImages[teamNames[1]] != '' &&
                        <img className="team-image" src={gameData.gameData.body.teamImages[teamNames[1]]} alt={Object.values(gameData.gameData.body.teamImages)[1]} crossOrigin={"anonymous"}/>
                    }
                </header>

                <section className="end-game-details">
                    <div className="end-game-text">
                        <p className="end-game-details-text"
                            style={scoreRange < 33 ? {color: 'red'} : scoreRange < 66 ? {color: 'orange'} : {color: 'lime'}}
                        >ACCURACY: {Number.isInteger(scoreRange) ? scoreRange : Number(scoreRange).toFixed(2)}%</p>
                        <p className="end-game-details-text">TOTAL: {Number.isInteger(actualScore) ? actualScore : Number(actualScore).toFixed(2)}/{Number.isInteger(totalPoints) ? totalPoints : Number(totalPoints).toFixed(2)}</p>
                        <p className="end-game-details-text">REGION: {gameData.gameData.body.region}</p>
                        <p className="end-game-details-text">PATCH: {gameData.gameData.body.game.data.Patch}</p>
                        <button className="btn-53 end-game-details-playagain-button" onClick={() => goToGame()}>
                            <div className="original">PLAY AGAIN</div>
                            <div className="letters">
                                <span>P</span>
                                <span>L</span>
                                <span>A</span>
                                <span>Y</span>
                            </div>
                        </button>
                    </div>
                    <div className="end-game-emote">
                        <img src={emote} alt="emote" className='' />
                    </div>
                </section>

                <section className="end-game-players">
                    {
                        gameData.gameData.body.playerImages && Object.keys(gameData.gameData.body.playerImages).map((team, index) => (
                            <div key={index} className={`team-${index}`}>
                                <span className='team-name'>{team.toUpperCase()}</span>
                                {gameData.gameData.body.playerImages[team].map((player, playerIndex) => (
                                    <div key={playerIndex}>
                                        <img src={player.image} alt={player.player} className='player-image' />
                                        <img src={icons[playerIndex]} alt='role icon' className='role-icon' />
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </section>



            </section>
        )}

        {Object.keys(guesses).length === 0 && (
                <>
                <span className='noguesses'>You made no guesses. Your score was not calculated.</span>
                </>
            )
        }
    </>
  )
}

EndGameContainer.propTypes = {
    guesses: PropTypes.object,
    gameData: PropTypes.object,
    fetchWithToken: PropTypes.func
}
