import {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios'

const HomePage = ({setWeatherData, userData}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState();
  const [isError, setIsError] = useState(false);
  const firstName = userData?.name ? userData.name : '';
  const githubLink = userData?.html_url;

  const handleDisplayWeather = () => {
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
    <span className='homepage-greet'>Good Day{firstName? <span className='homepage-name'> {firstName}</span> : ''}!</span>
    {githubLink && <Link className='homepage-github' target="_blank" rel="noopener noreferrer" to={githubLink}>{githubLink}</Link>}
    <input className='homepage-input' type="text" onChange={handleInputChange}></input>
    <div className='homepage-error-cont'>
      {isError && <div className="homepage-error">CITY NOT FOUND!</div>}
    </div>
    <button className='homepage-display-weather-btn' type="button" onClick={handleDisplayWeather}>Display Weather</button>
  </div>
}

export default HomePage;
