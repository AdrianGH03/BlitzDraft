//Hooks
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


import { TeamImages } from '../Layout/TeamImages';

export function DesktopTutorial() {
  const tutorial1 = '/placeholders/tutorialtest.png'
  const tutorial2 = '/placeholders/tutorialtest2.png'
  const tutorial3 = '/placeholders/tutorialtest4.png'
  const tutorial4 = '/placeholders/tutorialtest3.png'
  const tutorial0 = '/placeholders/tutorialtest0.png'

  const tutorials = [
    { image: tutorial0, text: 'Head over to the difficulty page to load a game. Feel free to select an available region or international of your choice or a random choice in the drop-down list. Points are not stored for non-registered users.' },
    { image: tutorial1, text: 'All parts of the game are showcased in the yellow text. The goal of the game is to guess the correct pick or ban as they appear in a regular LoL esports game. Cards are NOT sorted by role order.' },
    { image: tutorial2, text: 'A total of 20 cards will be shown. The order in which they appear is shown here marked 1-20. Each correct guess is 10 points. Sequential picks will be flashing on hover.' },
    { image: tutorial3, text: 'The current card will be flashing yellow. To make a guess, select a champion and click the guess button. You may also use the filters and search bar to narrow down your guess.' },
    { image: tutorial4, text: 'When all cards are revealed, the game will calculate your score. Cards ARE sorted by role order here. Once a game is complete, it cannot be replayed.' },
  ];

  const [currentTutorial, setCurrentTutorial] = useState(0);

  const nextTutorial = () => {
    setCurrentTutorial((prevTutorial) => (prevTutorial + 1) % tutorials.length);
  };

  
  
  return (
    <>
      <main className="tutorial-container-desk">
        <section className="tutorial-top-container-desk">
          <div className="tutorial-text-container-desk">
            <h2>TUTORIAL {currentTutorial+1}</h2>
            <div className="tutorial-text-desk">
              {tutorials && currentTutorial >= 0 && (
                <p>
                  {tutorials[currentTutorial].text}
                </p>
                )
              }
            </div>
          
          </div>

          <div className="tutorial-img-container-desk">
            <img src={tutorials[currentTutorial].image} alt="Tutorial" title="Next"
              onClick={nextTutorial}
            />
            <div className="tutorial-navigation-desk">
              {tutorials.map((tutorial, index) => (
                <button
                  key={index}
                  className={`nav-button ${index === currentTutorial ? 'active' : ''}`}
                  onClick={() => setCurrentTutorial(index)}
                  style={{
                    backgroundColor: index === currentTutorial && '#e63b3be6' 
                    
                  }}
                />
              ))}
            </div>

          </div>


          <div className="tutorial-regions-container-desk">
            <TeamImages
              containerClass="tutorial-regions-imagesL-desk"
              itemClass="tutorial-region-desk"
              showName={false}
            />
          </div>

        </section>

        

        <section className="tutorial-bot-container-desk">
            <TeamImages
              containerClass="tutorial-regions-imagesL-desk-2"
              itemClass="tutorial-region-desk"
              showName={false}
            />
          <div className="tutorial-bot-links">
            <Link to="/game/difficulty" className="tutorial-bot-play">
              <FontAwesomeIcon icon={faPlay} />
              <span>PLAY</span>
            </Link>

            <Link to="/help" className="tutorial-bot-tutorial">
              <FontAwesomeIcon icon={faQuestion} />
              <span>HELP</span>
            </Link>

            <Link to="/guides" className="tutorial-bot-help">
              <span>GUIDES</span>
            </Link>
          </div>

        </section>

      </main>
    </>
  )
}

