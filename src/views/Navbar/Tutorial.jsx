
//Components
import { DesktopTutorial } from '../../components/Navbar/DesktopTutorial.jsx';
import { MobileTutorial } from '../../components/Navbar/MobileTutorial.jsx';

export const Tutorial = () => {
  return (
    <>
        <section className="tutorial-container fade-in-fwd">
            
              <DesktopTutorial />
            
            
              <MobileTutorial />
            
        </section>
    </>
  )
}
