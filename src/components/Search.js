import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

function Search() {
  const [solDate, setSolDate] = useState({})
  const [fixedSol, setFixedSol] = useState({})
  const location = useLocation();
  const information = location.state.params;
  const url = "https://api.maas2.apollorion.com/"

  var current = new Date(information.date)
  var selected = new Date(information.selected)
  var diff = Math.abs(current - selected)
  var diffDays = Math.floor(diff/86400000)
  var requestSolDate = (information.sol - diffDays)

  useEffect(() => {
    async function fetchData(url){
      await fetch(url)
      .then(response => response.json())
      .then(json => setSolDate(json))
      
    }
    fetchData(`${url}${requestSolDate}`)
  }, [location.state.params.selected])

  useEffect(() => {
    async function fetchFixData(url){
      await fetch(url)
      .then(response => response.json())
      .then(json => setFixedSol(json))
    }
    if (solDate.terrestrial_date !== undefined) {
      var fixEarthDate = new Date(solDate.terrestrial_date.slice(0,10))
      var fixDiff = Math.abs(selected - fixEarthDate)
      var fixDays = Math.floor(fixDiff/86400000)
   
      if (fixDays > 0) {
        fetchFixData(`${url}${solDate.sol + fixDays}`)
      }
    }
  }, [solDate])

    return (

      <div className="Center-Me">
      <div>
        <h1 className="Center-Me">Mars weather for {fixedSol.terrestrial_date?.slice(0,10) || solDate.terrestrial_date?.slice(0,10) || "Loading"}</h1>
        <p>Max Temp: {fixedSol.max_temp || solDate.max_temp}</p>
        <p>Min Temp: {fixedSol.min_temp || solDate.min_temp}</p>
        <p>Atmospheric Pressure: {fixedSol.pressure || solDate.pressure}</p>
        <p>Currently: {fixedSol.atmo_opacity || solDate.atmo_opacity}</p>
        <p>Sunrise: {fixedSol.sunrise || solDate.sunrise}</p>
        <p>Sunset: {fixedSol.sunset || solDate.sunset}</p>
        <p>Local UV Radiation: {fixedSol.local_uv_irradiance_index || solDate.local_uv_irradiance_index}</p>
      </div>
      </div>
    )
}

export default Search;
