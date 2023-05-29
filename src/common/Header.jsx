import {useEffect} from 'react'
import { Outlet, Link } from "react-router-dom";
import {useNavigate, useLocation} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../img/logo.png'
import Loader from "react-spinners/MoonLoader";


const Header = () => {
    const {isAuthenticated, logout, isLoading } = useAuth0();
    const navigate= useNavigate();
    const location= useLocation();
    
    useEffect(()=>{
        !isLoading && !isAuthenticated && location.pathname !== '/' && navigate('/');
    },[location, isLoading, isAuthenticated, navigate])
    
    const headerLinks = [{
        name: 'LANDING',
        path: '/'
    },{
        name: 'HOME',
        path: '/home'
    },{
        name: 'WEATHER',
        path: '/weather'
    }]
    

    return <div className='weather-forecast-container'>
        <div className='header-container'>
            <div className='header-body'>
                <div className='header-left'>
                    <img src={logo} alt={logo} className='header-logo'/>
                    <h1 className='header-title'>WEATHER FORECAST</h1>
                </div>
                <div className='header-right'>
                    <div className='link-container'>
                        {headerLinks.map((val, i)=>{
                            const activeTab = location.pathname === val.path ? 'active-link' : '';
                            const notAuthClass = !isAuthenticated && i > 0 ? 'no-auth' : '';
                            return <div className={activeTab}>
                                { !notAuthClass ? <Link key={`${val}-${i}`} to={val.path} className={`header-link ${activeTab}`}>{val.name}</Link>
                                    : <span className={`header-link ${notAuthClass}`}>{val.name}</span>
                                }
                            </div>
                        })}
                    </div>
                    <div className='header-logout-btn-cont'>
                        {isAuthenticated && <button className="logout-btn" onClick={() => {
                            logout({ 
                                logoutParams: {
                                    returnTo: window.location.origin
                                }
                            });
                        }}>
                            Logout
                        </button>}
                    </div>
                </div>
            </div>
        </div>
        <div className='outlet-container'>
            <Outlet/>
        </div>
        {isLoading && <div className='loader-cont'>
            <Loader
                color='#cd8a00'
                loading={isLoading}
                size={100}
            />
        </div>}
    </div>

}

export default Header;