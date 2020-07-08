import React from 'react'
import {NavLink} from 'react-router-dom'

export default function ContentBlockOne() {
    return (
        <div className="content-container-tweepersoons">
            <h3>Tweepersoons</h3>
            <p>hier komt beschrijving tweepersoons huisje</p>
            <NavLink to="/Boeking" className="nav-link-tweepersoons" >
                 Boek hier uw verblijf
            </NavLink>
        </div>
    )
}