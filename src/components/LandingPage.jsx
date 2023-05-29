import { useAuth0 } from '@auth0/auth0-react';
import logo from '../img/landing-logo.png'

const LandingPage = ({userData}) => {
  const {
    isAuthenticated,
    loginWithRedirect
  } = useAuth0();
  
  return <div className='landingpage-container'>
      <div className='landingpage-welcome-btn-cont'>
        <div className='landingpage-welcome-txt-cont' >
          <div className='landingpage-welcome-txt-header'>
            Welcome <span className='landingpage-welcome-txt-name'>{userData?.name ? ` ${userData.name}, ` : ''}</span>to the weather forecast web application.  
          </div>
          {!isAuthenticated && <div className='landingpage-welcome-txt-body'>
            Please login with your Github user to use the application and view the weather in your city
          </div>}
        </div>
        <div className='landingpage-btn-cont'>
          {!isAuthenticated && <button type="button" className='login-btn' onClick={loginWithRedirect}>Log in</button>}
        </div>
      </div>
      <div className='landingpage-logo-cont'>
        <img src={logo} alt={logo} className='landingpage-logo'/>
      </div>
  </div>
}

export default LandingPage;
