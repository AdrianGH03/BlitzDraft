//Hooks
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { TeamImages } from '../../components/Layout/TeamImages.jsx'
export function Home() {

  useEffect(() => {
    const container = document.querySelector('.home-bottom-regions-container');
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener('wheel', handleWheel);
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  return (
    <>
      <main className="home-main-container fade-in-fwd">


        <section className="home-top-container">
          <main>
            <img src='/logoImages/logoTest-transformed.png' className='home-top-logo' />
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
          <img src='/emotes/test2.png' className="home-top-image" />
        </section>


        <section className="home-bottom-container">
          <TeamImages
            containerClass="home-bottom-regions-container"
            itemClass="home-bottom-region"
            titleClass="home-bottom-region-title"
            showName={true}
          />
        </section>


        
      </main>
    </>
  )
}

