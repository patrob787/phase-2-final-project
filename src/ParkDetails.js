import React, {useState} from 'react'
import { useLocation } from "react-router-dom"


export default function ParkDetails({ onMyParks}) {
  
    const location = useLocation()
    const state = location.state
    console.log(state.transit.subway)

    const [parkFav, setParkFav] = useState(state.visited)

    function handleClick() {
        setParkFav(!parkFav)
        console.log(parkFav)
    
        fetch(`http://localhost:4001/parks/${state.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            visited: !parkFav
          })
        })
        .then(resp => resp.json())
        .then(data => onMyParks(data))
      }

    const featuresArray = state.features.map((feature) => {
        return <li key={feature}>{feature}</li>
    })

    const subwayArray = state.transit.subway.map((icon) => {
        return <img src={icon} alt={icon} key={icon} className='subway-icon' />
    })

    const busArray = state.transit.bus.map((busOption) => {
        return <li key={busOption}>{busOption}</li>
    })

    const ferryArray = state.transit.ferry.map((icon) => {
        return <img src={icon} alt={icon} key={icon} className='ferry-icon' />
    })

    return (
        <div>
            <div className="park-name">
                <h1>{state.name}</h1>
            </div>
            <div className="parkDetails">
                <div className="left-panel">
                    <div className="park-content">
                        <div className="park-basics">
                            <h3>{state.borough}</h3>
                            <a href={state.map}>Find On Google Maps</a>
                            <div>
                            {parkFav ? <button onClick={handleClick} className='visited'>Remove from My Parks</button>
                            : <button onClick={handleClick} className='not-visited'>Add to My Parks</button>}
                            </div>
                        </div>
                        
                        <div className="transit">
                            <h3>Transportation:</h3>
                            <div className="transit-options">
                                <h4>Subway: </h4>
                                    <div className="subway">{subwayArray}</div>
                                <h4>Bus: </h4>
                                    <ul className="bus">{busArray}</ul>
                                <h4>Ferry: </h4>
                                    <div className="ferry">{ferryArray}</div>
                            </div>
                        </div>
                        

                        <div className="features">
                            <h3>Features & Attractions:</h3>
                                <ul className="list-of-features">
                                    {featuresArray}
                                </ul>
                        </div>

                    </div>
                </div>
                <div className="right-panel">
                    <img className="details-image"src={state.image} alt={state.name}></img>
                </div>
            </div>
        </div>
      )
}

