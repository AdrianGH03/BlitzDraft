
//Components
import { DesktopTutorial } from '../../components/Navbar/DesktopTutorial';
import { MobileTutorial } from '../../components/Navbar/MobileTutorial';

export const Tutorial = () => {
  return (
    <>
        <section className="tutorial-container fade-in-fwd">
            <div className="tutorial-desktop fade-in-fwd">
                <DesktopTutorial />
            </div>
            <div className="tutorial-mobile fade-in-fwd">
                <MobileTutorial />
            </div>
        </section>
    </>
  )
}
