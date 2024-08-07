//Context
import { GameContext } from '../../contexts/GameContext.jsx';

//Hooks
import {  useState } from 'react';
import { useParams } from 'react-router-dom';


//Assets
import { GameContainer } from '../../components/Game/GameContainer.jsx';


export function Game() {
  const { token } = useParams();
  const [isComplete, setIsComplete] = useState(false);
  const [showEndGame, setShowEndGame] = useState(true);
  const [guesses, setGuesses] = useState({});
  const [skipCard, setSkipCard] = useState(false);
  const [revealedCards, setRevealedCards] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const sequentialPicks = [['Team1Pick2', 'Team1Pick3'], ['Team2Pick1','Team2Pick2'], ['Team1Pick4', 'Team1Pick5']]
  const [cardAhead, setCardAhead] = useState('');
  const [currentCard, setCurrentCard] = useState(null);
  const [nextCard, setNextCard] = useState('');
  const [previousCard, setPreviousCard] = useState('');
  

  

  
  

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
      currentCard, setCurrentCard,
      nextCard, setNextCard,
      sequentialPicks,
      cardAhead, setCardAhead,
      previousCard, setPreviousCard
    }} >
        <GameContainer />
      </GameContext.Provider>
    </>
  )
}

