//Hooks
import { useState, useContext } from 'react';

//Context
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

//Assets
import { Button } from '../Forms/Button.jsx';
import { InputField } from '../Forms/InputField.jsx';


export const RenewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const {  
      fetchWithToken,
       setError,
       setSuccess
  } = useContext(AuthContext);

 const handleResetPassword = async (e) => {
     setError('');
     e.preventDefault();
     if(!newPassword || !confirmPassword) return setError('Please fill in all fields');
     try {
       await fetchWithToken.post(import.meta.env.VITE_APP_RESET_PASSWORD, { token, newPassword, confirmPassword });
       setSuccess('Password has been reset. Redirecting...');
       setNewPassword('');
       setConfirmPassword('');
       setTimeout(() => {
           setSuccess('');
           navigate('/');
       }, 2000);
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
          <InputField label="Password" type="text" name="username" value={newPassword} onChange={e => setNewPassword(e.target.value)} className={'authen-input'} placeholder={"Password"}/>
          <p>Enter your new password</p>
        </div>
        <div className="authen-input-container">
          <InputField label="Password" type="text" name="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={'authen-input'} placeholder={"Confirm Password"} />
          <p>Confirm  your new password</p>
        </div>
        <Button type="submit" className={'authen-button'} onClick={handleResetPassword}>CHANGE PASSWORD</Button>
      </div>
    </>
  )
}

