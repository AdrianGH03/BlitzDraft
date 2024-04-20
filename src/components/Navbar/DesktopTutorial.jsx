//Hooks
import { useState } from 'react';

//Assets

import tutorial2 from '../../assets/placeholders/tutorial1.jpg';
import tutorial3 from '../../assets/placeholders/tutorial2.jpg';
import tutorial4 from '../../assets/placeholders/tutorial22.jpg';
import tutoriallast from '../../assets/placeholders/tutoriallast1.jpg';
import tutoriallast2 from '../../assets/placeholders/tutorialguess.gif';
import tutorialstats from '../../assets/placeholders/tutorialstats.jpg';

const tutorials = [
  { image: tutorial2, text: 'All parts of the game are showcased in the yellow text. The goal of the game is to guess the correct pick or ban as they appear. Cards are NOT sorted by role order.' },
  { image: tutorial3, text: 'A total of 20 cards will be shown. The order in which they appear is shown above as marked by 1-20.' },
  { image: tutoriallast2, text: 'The current card will be flashing yellow. To make a guess, select a champion and click the guess button.' },
  { image: tutorial4, text: 'When all cards are revealed, the game will calculate your score. Cards ARE sorted by role order here. Sequential picks are calculated as if they were swapped.' },
  { image: tutoriallast, text: 'If you are confused about drafting, head on over to the guides page at the top to watch videos that educate you on how drafting works.' },
  { image: tutorialstats, text: 'As a guide, you can also check out the pick and ban stats of champions in the current season using the Stats page. It is located in the navigation menu.' },
];

export const DesktopTutorial = () => {
  const [currentTutorial, setCurrentTutorial] = useState(0);

  const nextTutorial = () => {
    setCurrentTutorial((prevTutorial) => (prevTutorial + 1) % tutorials.length);
  };

  const prevTutorial = () => {
    setCurrentTutorial((prevTutorial) => (prevTutorial - 1 + tutorials.length) % tutorials.length);
  };

  const prevIndex = (currentTutorial - 1 + tutorials.length) % tutorials.length;
  const nextIndex = (currentTutorial + 1) % tutorials.length;

  return (
    <section className="tutorial-container-desktop">

      <h1>TUTORIAL</h1>
      
      <div className="tutorial-wrapper-desktop">
        <div className='tutorial-images-desktop'>
          <img src={tutorials[prevIndex].image} alt={`Tutorial ${prevIndex + 1}`} className="tutorial-image prev" />
          <img src={tutorials[currentTutorial].image} alt={`Tutorial ${currentTutorial + 1}`} className="tutorial-image main" />
          <img src={tutorials[nextIndex].image} alt={`Tutorial ${nextIndex + 1}`} className="tutorial-image next" />
        </div>
        <div className="tutorial-desktop-text">
          <button onClick={prevTutorial}><i className="bi bi-arrow-left-circle-fill"></i></button>
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
          <button onClick={nextTutorial}><i className="bi bi-arrow-right-circle-fill"></i></button>
        </div>
      </div>

      
    </section>
  );
};