import React from 'react'
import {NavLink} from 'react-router-dom'

export default function ContentBlockTwo() {
    return (
        <div className="content-container-vierpersoons">
            <h3>Vierpersoons</h3>
            <p>hier komt beschrijving vierpersoons huisje</p>
            <NavLink to="/Boeking" className="nav-link-vierpersoons" >
                 Boek hier uw verblijf
            </NavLink>
        </div>
    )
}