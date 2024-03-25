//Hooks
import  { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';

//Components
import { Button } from '../../components/Forms/Button';
import { InputField } from '../../components/Forms/InputField';

//Assets
import biglogo from '../../assets/logoImages/BigLogo.png';
import teemoEmote from '../../assets/emotes/teemo1.png';



export const  PasswordReset = () => {
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const { token } = useParams();
   const navigate = useNavigate();

   const {  
       fetchWithToken,
        error,
        setError,
        success,
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
            navigate('/auth');
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
        <div className='auth-parent-container' >
            <div className="auth-parent">
                <div className='auth-tab'>
                        <button className='auth-tab-top' style={{ backgroundColor: '#5be0e5ff'}}>
                            <span style={{ color: '#221e37ff' }}>FORGOT PASSWORD </span>
                        </button>
                </div>
                <div className='auth-signup'>
                        <InputField label="Password" type="password" name="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className={'auth-input'} />
                        <InputField label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={'auth-input'} />
                        <div className="auth-bar"></div>
                        
                        <Button type="submit" className={'auth-button'} onClick={handleResetPassword}>RESET PASSWORD</Button>
                        <div className="auth-alr-have-account">
                            <img src={teemoEmote} alt="nunu emote" className='auth-emote-nunu' />
                            <span>Link expires in 30 mins.</span>
                            
                        </div>
                    <div className="error-mobile">
                        {error && <p>{error}</p>}
                    </div>

                    <div className="success-mobile">
                        {success && <p>{success}</p>}
                    </div>
                </div>
            </div>
            <div className="auth-status">
                <img src={biglogo} alt="big logo" className='auth-big-logo' />
                {success && <p className='auth-success'>{success}</p>}
                {error && <p className='auth-error'>{error}</p>}
            </div>
        </div>
    </>
  )
}

