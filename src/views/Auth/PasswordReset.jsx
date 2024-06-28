//Hooks
import { RenewPassword } from '../../components/Authentication/RenewPassword';

//Hooks
import { useContext } from 'react';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';


export function PasswordReset() {
  const yasuoEmote = '/emotes/yasuo1.png'
  const bigLogo = '/logoImages/logoTest-transformed.png'
  const {  
    error, 
    success,
  } = useContext(AuthContext);
  
  return (
    <>
      <main className="authen-container">
        <div className="authen-content">
          <section className="authen-topright-container">
            <div className="authen-topright-top">
              <h5>CHANGE PASSWORD</h5>
              <h1>
                <span>Blitz</span>
                <span>Draft</span>
              </h1>
              <RenewPassword />
              
              <p className='authen-error'>
              {
                error ? error : success
              }
              </p>
            </div>
            
          </section>
        </div>
        <div className="authen-images">
            <section className="authen-botleft-container">
                <img src={bigLogo} alt="big logo" className='authen-big-logo' />
                <img src={yasuoEmote} className="authen-botleft-image" />
            </section>
        </div>
        <div className="authen-guidelines">
          <h1>GUIDELINES</h1>
          <ul>
            <li>Passwords must be at least 3-20 characters long with one special character (!?), one number, and one uppercase character.</li>
          </ul>
        </div>
      </main>
    </>
  )
}

