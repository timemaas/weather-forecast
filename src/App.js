import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import Header from './common/Header'
import LandingPage from './components/LandingPage'
import HomePage from './components/HomePage'
import WeatherPage from './components/WeatherPage'

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState({});

  useEffect(()=>{
    isAuthenticated && user?.nickname && axios.get(`https://api.github.com/users/${user.nickname}`)
    .then(response=>{
      const data = response.data
      setUserData(data)
    })
    .catch()
  },[user, isAuthenticated])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header setWeatherData={setWeatherData}/>}>
          <Route index element={<LandingPage userData={userData}/>} />
          <Route path="/home" element={<HomePage setWeatherData={setWeatherData} userData={userData}/>} />
          <Route path="/weather" element={<WeatherPage weatherData={weatherData}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
