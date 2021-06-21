import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Image from './MarsLogo.png'

function Navbar({sol}) {
  const [solInfo, setSolInfo] = useState({});
  const history = useHistory();
  const url = "https://api.maas2.apollorion.com/";

  function handle(e){
    history.push(`/Search/`, {params: {selected: e.target.value, sol: sol.sol, date: sol.terrestrial_date.slice(0,10)}})
  }

return (
    <div className="NavBody">
      <div className="star-container">
        {/* <div id='stars'/> */}
          <div id='stars2' />
          <div id='stars3' />
      </div>

        <Link to="/"><img src={Image} alt="Home" className="Logo" /></Link>
        <form>
          <input id="date" type="date" min="2012-08-07" max={sol.terrestrial_date?.slice(0,10)} onChange={e => {handle(e)}} />
        </form>
    </div>
  )
}

export default Navbar;