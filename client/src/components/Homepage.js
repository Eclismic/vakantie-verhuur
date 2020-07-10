import React from 'react'
import foto from '../img/woestijn.jpeg'
import './Homepage.css'

 const Homepage = () => {
    return (
    <div className = "homepage-container">
            <div>
            <img src={foto} className="background-image"/>
            </div>
            <div className="text">
                    <div>
                    Vakantiehuisjes
                    </div> 
            <div> 

                <span>Mienterglop 13, De Koog</span>
            </div>
        </div>  
    </div>
    )
}

export default Homepage