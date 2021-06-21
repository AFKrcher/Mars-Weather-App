import { useLocation } from 'react-router-dom'

function Details() {
  const location = useLocation();
  const myparam = location.state.params;
    console.log("object: ", myparam)
  return (
    <div className="Center-Me">
      <div>
        <h1 className="Center-Me">Mars weather for {myparam.terrestrial_date?.slice(0,10) || " "}</h1>
        <p>Max Temp: {myparam.max_temp}</p>
        <p>Min Temp: {myparam.min_temp}</p>
        <p>Atmospheric Pressure: {myparam.pressure}</p>
        <p>Currently: {myparam.atmo_opacity}</p>
        <p>Sunrise: {myparam.sunrise}</p>
        <p>Sunset: {myparam.sunset}</p>
        <p>Local UV Radiation: {myparam.local_uv_irradiance_index}</p>
      </div>
    </div>
  )
}
export default Details;