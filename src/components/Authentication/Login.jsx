//Hooks
import { useState, useContext } from 'react';

//Context
import { AuthContext } from '../../contexts/AuthContext';

//Assets
import { Button } from '../Forms/Button';
import { InputField } from '../Forms/InputField';
import ezrealEmote from '../../assets/emotes/ezreal1.png';
import udyrEmote from '../../assets/emotes/udyr1.png';


function Login({  setForgotPassword, forgotPassword }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  //Context
  const {
    setIsAuthenticated,
    setUserInfo,
    setError,
    fetchWithToken,
    setSuccess,
    success,
    error
  } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    setError('');
    setSuccess('');

    e.preventDefault();
    if(!username || !password) return setError('Please fill in all fields');
    try {
      const response = await fetchWithToken.post(import.meta.env.VITE_APP_LOGIN, { username, password }, { withCredentials: true });      
      if (response.status === 200) {
        setIsAuthenticated(true);
        const userInfoResponse = await fetchWithToken.get(import.meta.env.VITE_APP_GET_USER_INFO, { withCredentials: true });
        setUserInfo(userInfoResponse.data.user);
      }
      setSuccess('Logged in successfully. Redirecting...');
      setError('');
      setUsername('');
      setPassword('');
      setSuccess('');
      
    } catch (error) {
      if (error.response.status === 429) {
        setError('Too many requests. Please try again later.');
      } else {
          setError(error.response.data.error);
      }
    }
  };

  const handleForgotPassword = () => {
    setEmail('');
    setUsername('');
    setError('');
    setForgotPassword(prev => !prev);
    
  };

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
    <div className='auth-signup'>
      {!forgotPassword ? (
        <>
          <InputField label="Username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} className={'auth-input'} />
          <InputField label="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className={'auth-input'} />
          <div className="auth-bar"></div>
          <Button type="submit" className={'league-button'} onClick={handleSubmit}>LOGIN</Button>
          <div className="auth-alr-have-account">
            <p onClick={() => handleForgotPassword()}>Forgot your password?</p>
            <img src={ezrealEmote} alt="nunu emote" className='auth-emote-nunu' />
          </div>
        </>
      ) : (
        <>
          <InputField label="Username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} className={'auth-input'} />
          <InputField label="Email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className={'auth-input'} />
          <div className="auth-bar"></div>
          <Button type="submit" className={'league-button'} onClick={handleForgotPassReq}>RESET PASSWORD</Button>
          <div className="auth-alr-have-account">
            <p onClick={() => handleForgotPassword()}>Go back to login</p>
            <img src={udyrEmote} alt="nunu emote" className='auth-emote-nunu' />
          </div>
        </>
      )}

      <div className="error-mobile">
        {error && <p>{error}</p>}
      </div>

      <div className="success-mobile">
        {success && <p>{success}</p>}
      </div>
    </div>
  );
}



export default Login;