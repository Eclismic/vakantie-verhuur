import React from 'react'
import "./Tweepersoons.css"
import {NavLink} from 'react-router-dom'

export default function ContentBlockOne() {
    return (
        <div className="container">
            <h3>Tweepersoons</h3>
            <p>hier komt beschrijving tweepersoons huisje</p>
            <NavLink to="/Boeking" className="nav-link" >
                 Boek hier uw verblijf
            </NavLink>
        </div>
    )
}