//Hooks
import { useState, useContext } from 'react';

//Context
import { AuthContext } from '../../contexts/AuthContext.jsx';

//Assets
import { Button } from '../Forms/Button.jsx';
import { InputField } from '../Forms/InputField.jsx';



export const PasswordReset = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  //Context
  const {
    setError,
    fetchWithToken,
    setSuccess
  } = useContext(AuthContext);


  const handleForgotPassReq = async (e) => {
    setError(''); 
    setSuccess('');
    
    e.preventDefault();
    if(!email || !username) return setError('Please fill in all fields');
    try {
      await fetchWithToken.post(import.meta.env.VITE_APP_PASSWORD_REQUEST, { email, username });
      setSuccess('Check your email for further instructions');
      setEmail('');
      setUsername('');
      
    } catch (error) {
      if (error.response.status === 429) {
        setError('Too many requests. Please try again later.');
      } else {
          setError(error.response.data.error);
      }
    }
  };
  return (
    <div className="authen-cred-container">
        <div className="authen-input-container">
          <InputField label="Username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} className={'authen-input'} placeholder={"Username"}/>
          <p>Enter your username</p>
        </div>
        <div className="authen-input-container">
        <InputField label="Email" type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} className={'authen-input'} placeholder={"Email"}/>
          <p>Enter your email</p>
        </div>
        <Button type="submit" className={'authen-button'} onClick={handleForgotPassReq}>REQUEST EMAIL</Button>
      </div>
  )
}
