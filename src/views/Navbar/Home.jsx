//Hooks
import { useState, useContext, useEffect } from 'react'
import msiLogo from '../../assets/logoImages/msi.png';
import lecLogo from '../../assets/logoImages/lec.png';
import lckLogo from '../../assets/logoImages/lck.png';
import lcsLogo from '../../assets/logoImages/lcs.png';
import lplLogo from '../../assets/logoImages/lpl.png';
import vcsLogo from '../../assets/logoImages/vcs.png';
import pcsLogo from '../../assets/logoImages/pcs.png';
import cblolLogo from '../../assets/logoImages/cblol.png';
import llaLogo from '../../assets/logoImages/lla.png';
import logo from '../../assets/logoImages/logoTest-transformed.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import test2 from '../../assets/placeholders/teamImages2.png';
import home1 from '../../assets/placeholders/home1.jpg';
import home2 from '../../assets/placeholders/home2.jpg';
import home3 from '../../assets/placeholders/tutorial22.jpg';

export function Home() {
  
  return (
    <>
      <main className="home-main-container">


        <section className="home-top-container">
          <main>
            <img src={logo} className='home-top-logo' />
            <div className="home-top-text">
                  <p className="home-top-desktop-text">
                      
                      Guess drafts from professional LoL esports matches, and you&apos;ll gain insights into how draft compositions work.
                      Spot patterns, understand strategies, and improve your game with BlitzDraft.
                  </p>    
                  <p className="home-top-mobile-text">
                    Guess pro LoL esports drafts, understand strategies, and improve your game.
                  </p>
            </div>
            <div className="home-top-tags">
              <span className="home-top-tag">Drafting</span>
              <span className="home-top-tag">Esports</span>
              <span className="home-top-tag">Strategy</span>
              <span className="home-top-tag">Improvement</span>
            </div>
            <div className="home-top-buttons">
              <Link to="/tutorial" className="home-top-tutorial">
                <FontAwesomeIcon icon={faQuestion} />
                <span>TUTORIAL</span>
              </Link>
              <Link to="/game/difficulty" className="home-top-play">
                <FontAwesomeIcon icon={faPlay} />
                <span>PLAY</span>
              </Link>
            </div>
          </main>
          <img src={test2} className="home-top-image" />
        </section>


        <section className="home-bottom-container">
          
          <ul className="home-bottom-regions-container">
            <li className="home-bottom-region">
              <span className="home-bottom-region-title">MSI 2024</span>
              <img src={msiLogo} />
            </li>
            <li className="home-bottom-region">
              <span className="home-bottom-region-title">LEC</span>
              <img src={lecLogo} />
            </li>
            <li className="home-bottom-region">
              <span className="home-bottom-region-title">LCK</span>
              <img src={lckLogo} />
            </li>
            <li className="home-bottom-region">
              <span className="home-bottom-region-title">LCS</span>
              <img src={lcsLogo} />
            </li>
            <li className="home-bottom-region">
              <span className="home-bottom-region-title">LPL</span>
              <img src={lplLogo} />
            </li>
            <li className="home-bottom-region">
              <span className="home-bottom-region-title">VCS</span>
              <img src={vcsLogo} />
            </li>
            <li className="home-bottom-region">
              <span className="home-bottom-region-title">PCS</span>
              <img src={pcsLogo} />
            </li>
            <li className="home-bottom-region">
              <span className="home-bottom-region-title">CBLOL</span>
              <img src={cblolLogo} />
            </li>
            <li className="home-bottom-region">
              <span className="home-bottom-region-title">LLA</span>
              <img src={llaLogo} />
            </li>
            
          </ul>

        </section>


        
      </main>
    </>
  )
}

