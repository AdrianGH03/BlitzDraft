//Hooks
import { useState, useContext } from 'react';

//Context
import { AuthContext } from '../../contexts/AuthContext';

//Assets
import { Button } from '../Forms/Button';
import { InputField } from '../Forms/InputField';
import PropTypes from 'prop-types';

export const Login = ({ setForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Context
  const {
    setIsAuthenticated,
    setUserInfo,
    setError,
    fetchWithToken,
    setSuccess,
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


  return (
    <>
      <div className="authen-cred-container">
        <div className="authen-input-container">
          <InputField label="Username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} className={'authen-input'} placeholder={"Username"}/>
          <p>Enter your username</p>
        </div>
        <div className="authen-input-container">
          <InputField label="Password" type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} className={'authen-input'} placeholder={"Password"} />
          <p className='authen-switch' onClick={() => {setForgotPassword(true)}}>Forgot your password?</p>
        </div>
        <Button type="submit" className={'authen-button'} onClick={handleSubmit}>LOGIN</Button>
      </div>
    </>
  )
}


Login.propTypes = {
  forgotPassword: PropTypes.bool,
  setForgotPassword: PropTypes.func
}