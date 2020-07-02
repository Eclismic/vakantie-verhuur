import React from 'react'
import "./Vierpersoons.css"
import{NavLink} from 'react-router-dom'

export default function ContentBlockTwo() {
    return (
        <div className="container">
            <h3>Vierpersoons</h3>
            <NavLink to="/Boeking" className="nav-link" >
                 Boek hier uw verblijf
            </NavLink>
        </div>
    )
}