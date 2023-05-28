import { useNavigate} from 'react-router-dom';

const WeatherPage = ({weatherData}) => {
  const navigate = useNavigate();
  const {name, dt, main, weather} = weatherData;

  const tableHeader = ["Date (mm/dd/yyyy)", "Temp(F)", "Description", "Main", "Pressure", "Humidity"]

  const convertDate = e => e && new Intl.DateTimeFormat('en-US',{month: '2-digit',day: '2-digit', year:'numeric'}).format(e+'000');
  
  return <div className='weatherpage-container'>
    <span className='weatherpage-city'>{name}</span>
    <table>
      <tr>
        {tableHeader.map((val, i)=><th className={i > 1 ? 'hide-on-mobile' : ''} key={i}>{val}</th>)}
      </tr>
      {Object.keys(weatherData).length > 0 && <tr>
        <td>{convertDate(dt)}</td>
        <td>{main.temp}</td>
        <td className='hide-on-mobile'>{weather[0]?.description}</td>
        <td className='hide-on-mobile'>{weather[0]?.main}</td>
        <td className='hide-on-mobile'>{main.pressure}</td>
        <td className='hide-on-mobile'>{main.humidity}</td>
      </tr>}
    </table>
    <button className='weatherpage-back-btn' type="button" onClick={()=>navigate('/home')}>{`< Back`}</button>
  </div>
}

export default WeatherPage;
