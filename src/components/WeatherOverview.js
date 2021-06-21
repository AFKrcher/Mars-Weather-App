import { Link, useHistory } from 'react-router-dom'
import Details from './Details'
import Image from './alien.png'
function WeatherOverview({sol, week}) {  
  const history = useHistory();

  const eventHandler = (week) =>{
    history.push(`/Details`, {params: week})
  }

  const days = () => {
    if (week.length > 0) {
      return week.map(week => (
        <div className="flip-card" onClick={e => {eventHandler(week)}} >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <p>{week.terrestrial_date?.slice(0,10) || " "}</p>
              <p>Highs {(week.max_temp  *1.8 +32).toFixed(2)}°F</p>
              <p>Lows {(week.min_temp *1.8 +32).toFixed(2)}°F</p>
            </div>
            <div className="flip-card-back">
              <img alt="alien" src={Image} style={{height: 120, width: 300}}/>
            </div>
          </div>
        </div>

      ))
    } else {
      return  <div>Loading Mars weather...</div>
    }
  }
  return (
    <div>
      <div className="Weather-Container">
          <h1 className="Center-Me">Mars weather for {sol.terrestrial_date?.slice(0,10) || " "}</h1>
        <div className="Weather">
          <p>It is currently {sol.atmo_opacity} on Mars.</p>
          <p>Today's high is {(sol.max_temp *1.8 +32).toFixed(2)}°F
          <br />With lows at {(sol.min_temp *1.8 +32).toFixed(2)}°F </p>
          <p>UV Index is {sol.local_uv_irradiance_index}.</p>
          {sol.wind_speed ? sol.wind_speed : ''}
        </div>
          <h3 className="Center-Me">Perfect weather for a 5-second insta-tan.</h3>
      </div>
      <h2 className="Center-Me">This week's weather on Mars</h2>
      <div className="Flex-Container">
        {days()}
      </div>
    </div>
  )
}

export default WeatherOverview;