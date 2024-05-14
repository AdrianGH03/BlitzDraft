//Hooks
import { useState } from 'react'
import msiLogo from '../../assets/logoImages/msi.png';
import lecLogo from '../../assets/logoImages/lec.png';
import lckLogo from '../../assets/logoImages/lck.png';
import lcsLogo from '../../assets/logoImages/lcs.png';
import lplLogo from '../../assets/logoImages/lpl.png';
import vcsLogo from '../../assets/logoImages/vcs.png';
import pcsLogo from '../../assets/logoImages/pcs.png';
import cblolLogo from '../../assets/logoImages/cblol.png';
import llaLogo from '../../assets/logoImages/lla.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import tutorial2 from '../../assets/placeholders/tutorialm2.png';
import tutorial3 from '../../assets/placeholders/tutorialm3.png';
import tutorial4 from '../../assets/placeholders/home3.png';
import tutoriallast from '../../assets/placeholders/tutorialguessmobile.gif';
import { TeamImages } from '../Layout/TeamImages';

export function MobileTutorial() {
  const tutorials = [
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
    { image: tutoriallast, text: 'The current card will be flashing yellow. To make a guess, select a champion and click the guess button.' },
    { image: tutorial4, text: 'When all cards are revealed, the game will be set to complete and showcase your score and accuracy. Picks ARE sorted by role order here. Sequential picks are calculated as if they were swapped.' },
    
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

