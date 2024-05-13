//Hooks
import { useState } from 'react'
import { Login } from '../../components/Authentication/Login'
import { Signup } from '../../components/Authentication/Signup'
import  { PasswordReset }  from '../../components/Authentication/PasswordReset'
//Hooks
import { useContext } from 'react';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';
import bigLogo from '../../assets/logoImages/logoTest-transformed.png';
import teamImages from '../../assets/placeholders/teamImages2.png';
import briarEmote from '../../assets/emotes/teemo2.png';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const {  
    error, 
    success,
    setError,
    setSuccess,
  } = useContext(AuthContext);
  
  return (
    <>
      <main className="authen-container fade-in-fwd">
        <div className="authen-content">
          <section className="authen-topright-container">
            <div className="authen-topright-top">
              <h5>{isLogin && !forgotPassword ? 'LOGIN' : forgotPassword ? 'RESET PASSWORD' : 'SIGN UP'}</h5>
              <h1>
                <span>Blitz</span>
                <span>Draft</span>
              </h1>
              {isLogin && !forgotPassword ? <Login forgotPassword={forgotPassword} setForgotPassword={setForgotPassword}/> : forgotPassword ? <PasswordReset /> : <Signup />}
              <p onClick={
                () => {
                  if(isLogin && !forgotPassword) {
                    setIsLogin(prev => !prev);
                  } else if (forgotPassword) {
                    setError('');
                    setSuccess('');
                    setForgotPassword(false);
                  } else {
                    setIsLogin(prev => !prev);
                  }
              }} className='authen-switch'>
                {isLogin && !forgotPassword ? 'Don\'t have an account?' : forgotPassword ? 'Go back to login?' : 'Already have an account?'}
              </p>
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
                <img src={briarEmote} className="authen-botleft-image" />
            </section>
        </div>
        <div className="authen-guidelines">
          <h1>GUIDELINES</h1>
          <ul>
            <li>Username must be appropriate and 3-20 characters.</li>
            <li>Emails must be valid and end in gmail.com, outlook.com, yahoo.com, etc.</li>
            <li>Passwords must be at least 3-20 characters long with one special character (!?), one number, and one uppercase character.</li>
          </ul>
        </div>
      </main>
    </>
  )
}

