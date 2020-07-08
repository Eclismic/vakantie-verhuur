import React from 'react'

export default function Footer() {
    return (
        <div className="main-footer">
            <div className="container-footer">
                <div className="row">
                    <div className="col">
                        <h4>Contact</h4>
                        <ul>
                            <li>1796AK</li>
                            <li>Mienterglop 13</li>
                            <li>De Koog</li>
                            <li>Texel</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Made by</h4>
                        <ul>
                            <li>Milco Kats</li>
                            <li>Designing</li>
                            <li>HTML, CSS, React, Javascript</li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <p className = "col-sm">
                        &copy;{new Date().getFullYear()} |  
                    </p>
                    <p className = "col-sm"> 
                        Vakantie op Texel | Mienterglop 13, De Koog, Texel
                    </p>
                </div>
            </div>
        </div>
    )
}