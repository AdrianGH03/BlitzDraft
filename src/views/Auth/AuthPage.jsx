//Hooks
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';

//Components
import Login from '../../components/Authentication/Login';
import Signup from '../../components/Authentication/Signup';

//Assets
import biglogo from '../../assets/logoImages/BigLogo.png';


function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const {  
    userInfo, 
    error, 
    success
  } = useContext(AuthContext);
  

  

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (

    <div className='auth-parent-container' >
        
        <div className="auth-parent">
            <div className='auth-tab'>
                {forgotPassword ? (
                    <button className='auth-tab-top' style={{ backgroundColor: isLogin ? '#5be0e5ff' : '#221e37ff',}}>
                        <span style={{ color: isLogin ? '#221e37ff' : 'white',}}>FORGOT PASSWORD </span>
                    </button>
                ) : (
                  <>
                    <button onClick={() => setIsLogin(true)} className='auth-tab-top' style={{ backgroundColor: isLogin ? '#5be0e5ff' : '#221e37ff',}}>
                        <span style={{ color: isLogin ? '#221e37ff' : 'white',}}>LOGIN </span>
                    </button>
                    <button onClick={() => setIsLogin(false)} className='auth-tab-top'style={{ backgroundColor: isLogin ? '#221e37ff' : '#5be0e5ff',}}>
                        <span style={{ color: isLogin ? 'white' : '#221e37ff',}}>SIGN UP</span>
                    </button>
                  </>
                
                )}
            </div>
            {isLogin ? <Login forgotPassword={forgotPassword} setForgotPassword={setForgotPassword} /> : 
            <Signup setIsLogin={setIsLogin} />}
        </div>
        <div className="auth-status">
            <img src={biglogo} alt="big logo" className='auth-big-logo' />
            {success && <p className='auth-success'>{success}</p>}
            {error && <p className='auth-error'>{error}</p>}
        </div>

        
        
    </div>
  );
}

export default AuthPage;