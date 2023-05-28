import {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';

const HomePage = ({setWeatherData}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState();
  const [isError, setIsError] = useState(false);
  const {
    user
  } = useAuth0();
  const githubLink = `https://github.com/${user?.nickname}`;

  const handleDisplayWeather = () => {
    console.log(input)
    input && axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=a463cf4ce24722d4dc35094495cb226b`)
      .then(response=>{
        const data = response.data
        setWeatherData?.(data)
        navigate('/weather')
      })
      .catch(error=>setIsError(true))
  };

  const handleInputChange = (e) => {
    setInput(e.target.value)
    setIsError(false)
  }

  return <div className='homepage-container'>
    {user && <><span className='homepage-greet'>Good Day{user.name ? <span className='homepage-name'> {user.name}</span> : ''}!</span>
      <Link className='homepage-github' target="_blank" rel="noopener noreferrer" to={githubLink}>{githubLink}</Link></>}
    <input className='homepage-input' type="text" onChange={handleInputChange}></input>
    <div className='homepage-error-cont'>
      {isError && <div className="homepage-error">CITY NOT FOUND!</div>}
    </div>
    <button className='homepage-display-weather-btn' type="button" onClick={handleDisplayWeather}>Display Weather</button>
  </div>
}

export default HomePage;
