import { useState, useEffect } from 'react';
import { Button } from '../Forms/Button';
import { InputField } from '../Forms/InputField';
import nunuEmote from '../../assets/emotes/nunu1.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';



//eslint-disable-next-line
function Signup({ setIsLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  //Context
  const {  
    setIsAuthenticated, 
    setUserInfo, 
    error, 
    setError,
    fetchWithToken,
    setSuccess,
    success
  } = useContext(AuthContext);

  useEffect(() => {
    
    return () => {
      setError('');
    };
  }, [setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !password || !email) return setError('Please fill in all fields');
    try {
      const signup = await fetchWithToken.post(import.meta.env.VITE_APP_SIGNUP, { username, password, email }, { withCredentials: true });
      setIsAuthenticated(true);
      setError('');

      if(signup.status === 200) {
        setSuccess('Account created successfully');
        
      }
      setUsername('');
      setPassword('');
      setEmail('');

      
  
      const response = await fetchWithToken.get(import.meta.env.VITE_APP_GET_USER_INFO, { withCredentials: true });
      setUserInfo(response.data.user);
      
      
      setSuccess('');
      
    } catch (error) {
      //eslint-disable-next-line
      setError(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='auth-signup'>
      <InputField label="Username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} className={'auth-input'} />
      <InputField label="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className={'auth-input'} />
      <InputField label="Email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className={'auth-input'} />
      <div className="auth-bar"></div>

      <Button type="submit" className={'auth-button'} onClick={handleSubmit}>SUBMIT</Button>

      <div className="auth-alr-have-account">
        <p onClick={() => setIsLogin(true)}>Already have an account?</p>
        <img src={nunuEmote} alt="nunu emote" className='auth-emote-nunu' />
      </div>


      <div className="error-mobile">
        {error && <p>{error}</p>}
      </div>

      <div className="success-mobile">
        {success && <p>{success}</p>}
      </div>
    </form>
  );
}



export default Signup;




