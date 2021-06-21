import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Home.css';
import './stars.css';
import Navbar from './components/Navbar'
import Search from './components/Search'
import Details from './components/Details'
import WeatherOverview from './components/WeatherOverview'

function Home() {
  const [sol, setSol] = useState({})
  const [week, setWeek] = useState([])
  const url = "https://api.maas2.apollorion.com/"
  
  useEffect(() => {
    async function fetchData(url){
      await fetch(url)
      .then(response => response.json())
      .then(json => setSol(json))
    }
    fetchData(url)
  }, [])
  
  useEffect(() => {
    async function fetchWeek(url, sol) {
      await fetch(url)
      .then(response => response.json())
      .then(json => setWeek(week => [...week, json]))
    }
    for (let i = 1; i < 7; i++) {
      if (sol.sol === undefined) {
        break
      } else {
        setTimeout(function() {fetchWeek(`${url}${sol.sol - i}`)}, (i*250))
      }
    }
  }, [sol])
  
  return (
    <Router>
      <Navbar sol={sol} />
      <Switch>
        <Route exact path="/">
          <WeatherOverview sol={sol} week={week}/>
        </Route>
        <Route exact path='/Search/' >
          <Search />
        </Route>
        <Route exact path="/Details">
          <Details week={week} />
        </Route>
      </Switch>
   </Router>
    );
  }
  
  export default Home;