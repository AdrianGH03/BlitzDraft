//Hooks
import { useState } from 'react';

//Assets
import tutorial1 from '../../assets/placeholders/tutorialgetgamemobile.gif';
import tutorial2 from '../../assets/placeholders/tutorialm2.png';
import tutorial3 from '../../assets/placeholders/tutorialm3.png';
import tutorial4 from '../../assets/placeholders/home3.png';
import tutorial5 from '../../assets/placeholders/tutoriallast2.png';
import tutoriallast from '../../assets/placeholders/tutorialguessmobile.gif';


const tutorials = [
  { image: tutorial1, text: 'Head over to the difficulty page (navigation menu). Choose your difficulty and click the "Play" button to load a game.' },
  { 
    image: tutorial2, 
    text: [
      'All parts of the game are numbered in yellow. The goal of the game is to guess the correct pick or ban as they appear. Picks are NOT sorted by role order. Team 1 is Blue side, Team 2 is Red side',
      'Team Bans',
      'Team Picks (Top, Jungle, Mid, ADC, Support)',
      'Role Filters',
      'Search Champions',
      'Selected champion guess',
      'Team 1 Logo',
      'Region',
      'Start Game / Guess Button',
      'Game Patch',
      'Team 2 Logo',
      'Current card',
      '30 Second Timer'
    ].map((item, index) => index === 0 ? item : `${index}. ${item}`),
  },
  { image: tutorial3, text: 'A total of 20 cards will be shown. The amount of cards revealed when loading a game depends on your difficulty. The order in which they appear is shown above as marked by 1-20.' },
  { image: tutoriallast, text: 'The current card will be flashing yellow. To make a guess, select a champion and click the guess button. If you fail to make a guess, the game will still continue.' },
  { image: tutorial4, text: 'When all cards are revealed, the game will be set to complete and showcase your score and accuracy. Picks ARE sorted by role order here.' },
  { image: tutorial5, text: 'If you are confused about drafting, head on over to the guides page in the navigation menu to watch videos that educate you on how drafting works.' },
];

export const MobileTutorial = () => {
  const [currentTutorial, setCurrentTutorial] = useState(0);

  const nextTutorial = () => {
    setCurrentTutorial((prevTutorial) => (prevTutorial + 1) % tutorials.length);
  };

  const prevTutorial = () => {
    setCurrentTutorial((prevTutorial) => (prevTutorial - 1 + tutorials.length) % tutorials.length);
  };

  return (
    <>
      <section className="tutorial-container-mobile">
        <h1 className="auth-tab-top">TUTORIAL</h1>
        <img src={tutorials[currentTutorial].image} alt={`Tutorial ${currentTutorial + 1}`} />
        <div className="tutorial-mobile-pagination">
            
                <button onClick={prevTutorial}><i className="bi bi-arrow-left-circle-fill"></i></button>
            
            
                <button onClick={nextTutorial}><i className="bi bi-arrow-right-circle-fill"></i></button>
           
        </div>
        <div className="tutorial-mobile-text">
          {Array.isArray(tutorials[currentTutorial].text) ? (
            <ul>
              {tutorials[currentTutorial].text.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>
              {tutorials[currentTutorial].text.includes('NOT') ? (
                <>
                  {tutorials[currentTutorial].text.split('NOT')[0]}
                  <span className="tutorial-desktop-highlight">NOT</span>
                  {tutorials[currentTutorial].text.split('NOT')[1]}
                </>
              ) : (
                tutorials[currentTutorial].text
              )}
            </p>
          )}
        </div>
        
      </section>
    </>
  );
};