//Hooks
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'


//Contexts
import { AuthContext } from '../../contexts/AuthContext'



export const EndGameContainer = ({guesses, gameData, fetchWithToken, showEndGame }) => {

    //images
    const topIcon = '/placeholders/topIcon.png'
    const jungleIcon = '/placeholders/jungleIcon.png'
    const midIcon = '/placeholders/midIcon.png'
    const botIcon = '/placeholders/botIcon.png'
    const supportIcon = '/placeholders/supportIcon.png'
    const placeholder = '/placeholders/lolplaceholder.png'

    const [scoreRange, setScoreRange] = useState(0)
    const [emote, setEmote] = useState(null)
    const [totalPoints, setTotalPoints] = useState(0)
    const [actualScore, setActualScore] = useState(0)
    const icons = [topIcon, jungleIcon, midIcon, botIcon, supportIcon];
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);
    const [imagesLoaded, setImagesLoaded] = useState(false);


    const lowscoreEmote = '/emotes/lowscore.png'
    const lowScoreEmote2 = '/emotes/lowscore2.png'
    const lowScoreEmote3 = '/emotes/lowscore3.png'
    const lowScoreEmote4 = '/emotes/lowscore4.png'
    const lowScoreEmote5 = '/emotes/lowscore5.png'

    const highscoreEmote = '/emotes/highscore.png'
    const highScoreEmote2 = '/emotes/highscore2.png'
    const highScoreEmote3 = '/emotes/highscore3.png'
    const highScoreEmote4 = '/emotes/highscore4.png'
    const highScoreEmote5 = '/emotes/highscore5.png'

    const medscoreEmote = '/emotes/medscore.png'
    const medScoreEmote2 = '/emotes/medscore2.png'
    const medScoreEmote3 = '/emotes/medscore3.png'
    const medScoreEmote4 = '/emotes/medscore4.png'
    const medScoreEmote5 = '/emotes/medscore5.png'

    const emotes = {
        lowscore: [lowscoreEmote, lowScoreEmote2, lowScoreEmote3, lowScoreEmote4, lowScoreEmote5],
        highscore: [highscoreEmote, highScoreEmote2, highScoreEmote3, highScoreEmote4, highScoreEmote5],
        medscore: [medscoreEmote, medScoreEmote2, medScoreEmote3, medScoreEmote4, medScoreEmote5]
    }


    const gameDataMatch = gameData.gameData.body.game.match;
    let teamNames;
    if(gameDataMatch){
      teamNames = gameDataMatch.split(' vs ');
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useEffect(() => {
        if(Object.keys(gameData).length > 0 && Object.keys(guesses).length > 0 && gameData.difficulty) {
            const requestBody = {
                gameData: gameData.gameData.body.game.data,
                difficulty: gameData.difficulty,
                guesses: guesses,
                difficultySettings: gameData.gameData.body.difficultySettings
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
                let scorePercentage = (response.data.totalScore / response.data.outOf) * 100;
                let selectedEmotesArray;

                if(scorePercentage < 33) {
                    selectedEmotesArray = emotes.lowscore;
                } else if(scorePercentage < 66) {
                    selectedEmotesArray = emotes.medscore;
                } else {
                    selectedEmotesArray = emotes.highscore;
                }

                let randomEmote = selectedEmotesArray[Math.floor(Math.random() * selectedEmotesArray.length)];
                setEmote(randomEmote);

                
                const imageUrls = [topIcon, jungleIcon, midIcon, botIcon, supportIcon, lowscoreEmote, lowScoreEmote2, lowScoreEmote3, lowScoreEmote4, lowScoreEmote5, highscoreEmote, highScoreEmote2, highScoreEmote3, highScoreEmote4, highScoreEmote5, medscoreEmote, medScoreEmote2, medScoreEmote3, medScoreEmote4, medScoreEmote5];
                let imagesToLoad = imageUrls.length;

                
                if (gameData.gameData && gameData.gameData.body && gameData.gameData.body.teamImages) {
                    imagesToLoad += Object.values(gameData.gameData.body.teamImages).length;
                    Object.values(gameData.gameData.body.teamImages).forEach(url => {
                        imageUrls.push(url);
                    });
                }

                imageUrls.forEach(url => {
                    const img = new Image();
                    img.onload = () => {
                        imagesToLoad--;
                        if (imagesToLoad === 0) {
                            setImagesLoaded(true);
                        }
                    };
                    img.src = url;
                });
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
        {imagesLoaded && gameData && (
            <section className="end-game-container fade-in-fwd">
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
                        <button className="end-game-details-playagain-button" onClick={() => goToGame()}>
                            PLAY AGAIN

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
                                <span className='team-name'
                                    style={windowSize < 768 ? {maxWidth: '70px', minWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'} : {maxWidth: '90px', minWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                                >{team.toUpperCase()}</span>
                                {gameData.gameData.body.playerImages[team].map((player, playerIndex) => (
                                    <div key={playerIndex}>
                                        <img src={player.image ? player.image : placeholder} alt={player.player} className='player-image' />
                                        <img src={icons[playerIndex]} alt='role icon' className='role-icon' />
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </section>



            </section>
        )}

        {Object.keys(guesses).length == 0 && showEndGame && (
               <div className="noguesses-container fade-in-fwd">
                    <span className='noguesses'>You made no guesses. Your score was not calculated.</span>
               </div>
                
            )
        }
    </>
  )
}

EndGameContainer.propTypes = {
    guesses: PropTypes.object,
    gameData: PropTypes.object,
    fetchWithToken: PropTypes.func,
    showEndGame: PropTypes.bool
}
