import bigLogo from '../../assets/logoImages/BigLogo.png';
import azirEmote from '../../assets/emotes/azir1.png'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
        <div className="home-background">
        
            <div className="home-div">
                <div className="home-div-container">
                    <img src={bigLogo} alt="BlitzDraft Logo" className='home-biglogo' />
                    <div className="home-content">
                        <img src={azirEmote} alt="Azir Emote" className='home-emote'/>
                        <p className="desktop-text">
                        Welcome to BlitzDraft, your companion for understanding the drafting phase in League of Legends. 
                        Guess drafts from professional LoL esports matches, and you&apos;ll gain insights into how draft compositions work. 
                        Spot patterns, understand strategies, and improve your game with BlitzDraft.
                        </p>
                        <p className="mobile-text">
                        Welcome to BlitzDraft! Guess pro LoL esports drafts, understand strategies, and improve your game.
                        </p>
                    </div>
                    <div className="home-play-container">
                        <Link to="/" className="home-play">PLAY NOW</Link>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}

