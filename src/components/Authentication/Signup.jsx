//Hooks
import { useState, useContext, useEffect } from 'react';

//Context
import { AuthContext } from '../../contexts/AuthContext.jsx';

//Assets
import { Button } from '../Forms/Button.jsx';
import { InputField } from '../Forms/InputField.jsx';


export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const {  
    setIsAuthenticated, 
    setUserInfo, 
    setError,
    fetchWithToken,
    setSuccess,
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
      if(error.response.status === 429) {
        setError('Too many requests. Please try again later.');
      } else {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div className="authen-cred-container">
      <div className="authen-input-container">
        <InputField label="Email" type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} className={'authen-input'} placeholder={"Email"} />
        <p>Enter a valid email.</p>
      </div>
      <div className="authen-input-container">
        <InputField label="Username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} className={'authen-input'} placeholder={"Username"}/>
        <p>Enter a valid username.</p>
      </div>
      <div className="authen-input-container">
        <InputField label="Password" type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} className={'authen-input'} placeholder={"Password"}/>
        <p>Enter a valid password.</p>
      </div>
      <Button type="submit" className={'authen-button'} onClick={handleSubmit}>SIGN UP</Button>
    </div>
  )
}
