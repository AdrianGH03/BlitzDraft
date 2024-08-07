//Hooks
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


import { TeamImages } from '../Layout/TeamImages.jsx';

export function DesktopTutorial() {
  const tutorial0 = '/placeholders/tutorialtest0.jpg'
  const tutorial1 = '/placeholders/tutorialtest1.jpg'
  const tutorial2 = '/placeholders/tutorialtest2.jpg'
  const tutorial3 = '/placeholders/tutorialtest3.jpg'
  const tutorial4 = '/placeholders/tutorialtest4.jpg'
  const tutorial5 = '/placeholders/tutorialtest5.jpg'

  const tutorials = [
    { image: tutorial0, text: 'Head over to the difficulty page to load a game. A random game will be selected by default and difficulty is split into 4 modes, each with a different starting card. You have options to choose a valid tournament from an available region and/or patch games were played. Choose custom mode to select your starting card in the game.' },
    { image: tutorial1, text: 'All parts of the game are showcased by the text. The goal of the game is to guess the correct pick or ban as they would appear in a regular LoL esports game. Cards are NOT sorted by role order. The current card/guess will be flashing with either a yellow or lime border (if a sequential pick). Revealed champs are greyed out.' },
    { image: tutorial2, text: 'A total of 20 cards will be shown. The order in which they appear is shown here marked 1-20. Each correct guess is 10 points. Lime/green colored order numbers mean sequential picks.' },
    { image: tutorial3, text: 'Sequential picks (ex. Blue Pick 4 and Blue Pick 5) will be marked by lime green borders as they appear. You must guess for BOTH picks before they are revealed. If you got the order of the sequential picks wrong, your score will still be calculated as if they were reversed.' },
    { image: tutorial4, text: 'When all cards are revealed, the game will calculate your score. Cards ARE sorted by role order here.' },
    { image: tutorial5, text: 'Additionally, check out the stats or guides page for more insight on pick and bans of champions and how to draft.' },
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

            <Link to="/stats" className="tutorial-bot-tutorial">
              <FontAwesomeIcon icon={faSquarePollVertical} />
              <span>STATS</span>
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

