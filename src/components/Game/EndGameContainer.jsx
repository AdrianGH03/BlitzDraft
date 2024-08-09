//Hooks
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'


//Contexts
import { AuthContext } from '../../contexts/AuthContext.jsx'

const logos = {
    'MSI': '/logoImages/msi.png',
    'LEC': '/logoImages/lec.png',
    'LCK': '/logoImages/lck.png',
    'LCS': '/logoImages/lcs.png',
    'LPL': '/logoImages/lpl.png',
    'VCS': '/logoImages/vcs.png',
    'PCS': '/logoImages/pcs.png',
    'CBLOL': '/logoImages/cblol.png',
    'LLA': '/logoImages/lla.png',
    "PCL": '/logoImages/pcl.png',
    "LJL": '/logoImages/LJL.png',
    "NACL": '/logoImages/nacl.png',
    "LVPSL": '/logoImages/lvpsl.png',
    "LFL": '/logoImages/lfl.png',
    "EMEAM": '/logoImages/emeam.png',
    "LCO": '/logoImages/LCO.png',
    "LCKCL": '/logoImages/lckcl.png',
};

export const EndGameContainer = ({guesses, gameData, fetchWithToken, showEndGame }) => {

    //images
    const topIcon = '/placeholders/topIcon.png'
    const jungleIcon = '/placeholders/jungleIcon.png'
    const midIcon = '/placeholders/midIcon.png'
    const botIcon = '/placeholders/botIcon.png'
    const supportIcon = '/placeholders/supportIcon.png'
    const placeholder = '/placeholders/lolplaceholder.jpg'


    const [scoreRange, setScoreRange] = useState(0)
    const [emote, setEmote] = useState(null)
    const [totalPoints, setTotalPoints] = useState(0)
    const [actualScore, setActualScore] = useState(0)
    const icons = [topIcon, jungleIcon, midIcon, botIcon, supportIcon];
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [teamGuessed, setTeamGuessed] = useState(false);


    const lowscoreEmote = '/emotes/lowscore2.png';
    const highscoreEmote = '/emotes/highscore5.png';
    const medscoreEmote = '/emotes/medscore2.png';

    const emotes = {
        lowscore: [lowscoreEmote],
        highscore: [highscoreEmote],
        medscore: [medscoreEmote]
    };


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
        if (Object.keys(gameData).length > 0 && Object.keys(guesses).length > 0 && gameData.difficulty) {
            const requestBody = {
                gameData: gameData.gameData.body.game.data,
                difficulty: gameData.difficulty,
                guesses: guesses,
                difficultySettings: gameData.gameData.body.difficultySettings,
                selectedTeam: selectedTeam
            };
    
            if (userInfo) {
                requestBody.userInfo = userInfo;
            }
    
            fetchWithToken.post(`${import.meta.env.VITE_APP_CALCULATE_SCORE}`, requestBody)
                .then(response => {
                    if (response === 400) {
                        navigate('/game/difficulty');
                    }
    
                    let totalGuesses = response.data.outOf / 10;
                    let correctGuesses = response.data.totalScore / 10;
    
                    if (selectedTeam) {
                        totalGuesses += 1;
                        if (gameData.gameData.body.game.data.Winner === selectedTeam) {
                            correctGuesses += 1;
                            correctGuesses -= 2;
                        }
                    }
                    
    
                    
                    setScoreRange((correctGuesses / totalGuesses) * 100);
                    setTotalPoints(response.data.outOf);
                    setActualScore(response.data.totalScore);
    
                    let scorePercentage = (correctGuesses / totalGuesses) * 100;
                    let selectedEmotesArray;
    
                    if (scorePercentage < 33) {
                        selectedEmotesArray = emotes.lowscore;
                    } else if (scorePercentage < 66) {
                        selectedEmotesArray = emotes.medscore;
                    } else {
                        selectedEmotesArray = emotes.highscore;
                    }
    
                    let randomEmote = selectedEmotesArray[0];
                    setEmote(randomEmote);
    
                    const imageUrls = [topIcon, jungleIcon, midIcon, botIcon, supportIcon, lowscoreEmote, highscoreEmote, medscoreEmote];
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
    }, [selectedTeam]);

    const handleTeamSelection = (team) => {
        setSelectedTeam(team);
    };
    const handleDisableGuess = () => {
        setTeamGuessed(true);
    }
    const handleWinnerguess = (team) => {
        handleTeamSelection(team);
        handleDisableGuess();
    }

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
                        <p className="end-game-details-text">REGION: 
                            <img src={logos[gameData.gameData.body.region]} alt={gameData.gameData.body.region} className='end-game-region-logo' />
                        </p>
                        <p className="end-game-details-text">PATCH: {gameData.gameData.body.game.data.Patch}</p>
                        
                        <section className="end-game-guess">
                            <h2>Guess Winner +20 PTS</h2>
                            <div className="">
                                <button className="end-game-details-playagain-button endgameblue" onClick={() => handleWinnerguess("1")}
                                    style={{
                                        backgroundColor: 
                                        gameData.gameData.body.game.data.Winner === "1" && selectedTeam === "1" ? 'lime' : 
                                        gameData.gameData.body.game.data.Winner === "2" && selectedTeam === "1" ? 'red' : 
                                        gameData.gameData.body.game.data.Winner === "1" && selectedTeam === "2" ? 'lime' :
                                        gameData.gameData.body.game.data.Winner === "2" && selectedTeam === "2" ? 'red' :
                                        'blue'
                                    }}
                                    disabled={selectedTeam}
                                >
                                    {
                                        gameData.gameData.body.game.data.Winner === "1" && selectedTeam === "1" ? <FontAwesomeIcon icon={faCheck} /> : 
                                        gameData.gameData.body.game.data.Winner === "2" && selectedTeam === "1" ? <FontAwesomeIcon icon={faXmark} /> :
                                        gameData.gameData.body.game.data.Winner === "2" && selectedTeam === "2" ? <FontAwesomeIcon icon={faXmark} /> : 
                                        gameData.gameData.body.game.data.Winner === "1" && selectedTeam === "2" ? <FontAwesomeIcon icon={faCheck} /> : null
                                    }
                                    BLUE
                                </button>
                                <button className="end-game-details-playagain-button endgamered" onClick={() => handleWinnerguess("2")}
                                    style={{
                                        backgroundColor: 
                                        gameData.gameData.body.game.data.Winner === "2" && selectedTeam === "2" ? 'lime' : 
                                        gameData.gameData.body.game.data.Winner === "1" && selectedTeam === "2" ? 'red' : 
                                        gameData.gameData.body.game.data.Winner === "2" && selectedTeam === "1" ? 'lime' :
                                        'red'
                                    }}
                                    disabled={selectedTeam}
                                >
                                    {
                                        gameData.gameData.body.game.data.Winner === "2" && selectedTeam === "2" ? <FontAwesomeIcon icon={faCheck} /> : 
                                        gameData.gameData.body.game.data.Winner === "2" && selectedTeam === "1" ? <FontAwesomeIcon icon={faCheck} /> : 
                                        gameData.gameData.body.game.data.Winner === "1" && selectedTeam === "2" ? <FontAwesomeIcon icon={faXmark} /> : 
                                        gameData.gameData.body.game.data.Winner === "1" && selectedTeam === "1" ? <FontAwesomeIcon icon={faXmark} /> : null
                                    }
                                    RED
                                </button>
                            </div>
                        </section>
                       <button className="end-game-details-playagain-button" onClick={() => goToGame()}>
                            NEW GAME

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
                                        <img src={player && player.image ? player.image : placeholder} alt={player && player.player ? player.player : 'placeholder'} className='player-image' />
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
