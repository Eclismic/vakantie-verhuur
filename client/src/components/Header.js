import React from 'react'
import { Link} from 'react-router-dom'

function Header() {
    return (
        <header>
            <nav className="navBar">
                <div>
                    <Link to="/">
                        <h4>Vakantie op Texel</h4>
                    </Link>
                </div>
                <ul>
                    <Link to="/Tweepersoons">
                        <li className= "navItem" >Tweepersoons</li>
                    </Link>
                    <Link to="/Vierpersoons">
                        <li className= "navItem">Vierpersoons</li>
                    </Link>
                    <Link to="/Locatie">
                        <li className= "navItem">Locatie</li>
                    </Link>
                    <Link to="Contact">
                        <li className= "navItem" >Contact </li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header