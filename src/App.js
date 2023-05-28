import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './common/Header'
import LandingPage from './components/LandingPage'
import HomePage from './components/HomePage'
import WeatherPage from './components/WeatherPage'

const App = () => {
  const [weatherData, setWeatherData] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header setWeatherData={setWeatherData}/>}>
          <Route index element={<LandingPage />} />
          <Route path="/home" element={<HomePage setWeatherData={setWeatherData}/>} />
          <Route path="/weather" element={<WeatherPage weatherData={weatherData}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
