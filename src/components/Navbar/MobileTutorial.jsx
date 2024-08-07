//Hooks
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { TeamImages } from '../Layout/TeamImages.jsx';

export function MobileTutorial() {
  const tutorial1 = '/placeholders/tutorialm1.jpg'
  const tutorial2 = '/placeholders/tutorialm2.jpg'
  const tutorial3 = '/placeholders/tutorialm3.jpg'
  const tutorial4 = '/placeholders/tutorialm4.jpg'
  const tutorial5 = '/placeholders/tutorialm5.jpg'
  const tutorial6 = '/placeholders/tutorialm6.jpg'

  const tutorials = [
    { image: tutorial1, text: 'Head over to the difficulty page to load a game. A random game will be selected by default and difficulty is split into 4 modes, each with a different starting card. You have options to choose a valid tournament from an available region and/or patch games were played. Choose custom mode to select your starting card in the game.' },
    { 
      image: tutorial2, 
      text: [
        'All parts of the game are numbered here. The goal of the game is to guess the correct pick or ban as they appear. Picks are NOT sorted by role order. Top Team is Blue side, Bottom Team is Red side. Revealed cards will be greyed out.',
        'Team Bans',
        'Team Picks (Top, Jungle, Mid, ADC, Support)',
        'Role Filters',
        'Search Champions',
        'Selected champion guess',
        'Blue Team Logo',
        'Region',
        'Start Game / Guess Button',
        'Game Patch',
        'Red Team Logo',
        'Current card',
        '30 Second Timer',
        'Sequential Picks'
      ].map((item, index) => index === 0 ? item : `${index}. ${item}`),
    },
    { image: tutorial3, text: 'A total of 20 cards will be shown. The order in which they appear is shown here marked 1-20. Each correct guess is 10 points. Lime/green colored order numbers mean sequential picks.' },
    { image: tutorial4, text: 'Sequential picks (ex. Blue Pick 4 and Blue Pick 5) will be marked by lime green borders as they appear. You must guess for BOTH picks before they are revealed. If you got the order of the sequential picks wrong, your score will still be calculated as if they were reversed.' },
    { image: tutorial5, text: 'When all cards are revealed, the game will calculate your score. Cards ARE sorted by role order here. Once a game is complete, you can refresh to retry, but you only have 30 minutes per game before it expires.' },
    { image: tutorial6, text: 'Additionally, check out the stats or guides page for more insight on pick and bans of champions and how to draft.' },
  ];
  const [currentTutorial, setCurrentTutorial] = useState(0);

  const nextTutorial = () => {
    setCurrentTutorial((prevTutorial) => (prevTutorial + 1) % tutorials.length);
  };

  return (
    <>
      <main className="tutorial-container-mb">
        
      <section className="tutorial-top-container-mb">
          <div className="tutorial-img-container-mb">
            <img src={tutorials[currentTutorial].image} alt="Tutorial" title="Next"
              onClick={nextTutorial}
            />
            <div className="tutorial-navigation-mb">
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
          <div className="tutorial-text-container-mb">
            <h2>TUTORIAL {currentTutorial+1}</h2>
            <div className="tutorial-text-mb">
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
          
          </div>
        </section>

        <section className="tutorial-bot-container-mb">
            <div className="tutorial-bot-links-mb">
              <Link to="/game/difficulty">
                <FontAwesomeIcon icon={faPlay} />
                <span>PLAY</span>
              </Link>

              <Link to="/help">
                <FontAwesomeIcon icon={faQuestion} />
                <span>HELP</span>
              </Link>

              <Link to="/guides">
                <span>GUIDES</span>
              </Link>
            </div>
            <TeamImages
              containerClass="tutorial-regions-imagesL-mb-2"
              itemClass="tutorial-region-mb"
              showName={false}
            />

        </section>
      </main>
    </>
  )
}

