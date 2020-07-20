import React from 'react'
import {NavLink} from 'react-router-dom'
import newYork from '../img/newYork.jpg'
import zee from '../img/zee.jpeg'
import rainSea from '../img/rainSea.jpg'
import woestijn from '../img/woestijn.jpeg'

export default function ContentBlockTwo() {
    return (
        <div className= "parent-vierpersoons">
<div className="content-container-vierpersoons">
            <div className="content-vierpersoons">
                <div className="content-beschrijving">
                    <div className= "beschrijving-titel">
                        <h3>Vierpersoons</h3>
                    </div>
                    <div className="beschrijving-details">
                        <p>hier komt beschrijving vierpersoons huisje</p>
                        <p>hier komt beschrijving vierpersoons huisje</p>
                        <p>hier komt beschrijving vierpersoons huisje</p>
                    </div>
                </div>
                <div className="content-kenmerken">
                    <div className="kenmerken-titel">
                        <h3>Kenmerken & faciliteiten</h3>
                    </div>
                    <div className="kenmerken-details">
                        <div className="key">
                            <p><span style={{fontWeight: 'bold'}}>Woonoppervlakte</span></p>
                            <p><span style={{fontWeight: 'bold'}}>Buitenruimte </span></p>
                            <p><span style={{fontWeight: 'bold'}}>Accomodatietype </span></p>
                            <p><span style={{fontWeight: 'bold'}}>Huisdieren </span></p>
                            <p><span style={{fontWeight: 'bold'}}>Ligging </span></p>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Accommodatie kenmerken </span></p>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Sanitair </span></p>
                           
                        </div>
                        <div className="value">
                            <p>90 m2</p>
                            <p>400 m2</p>
                            <p>Vakantiehuis</p>
                            <p>1 huisdier</p>
                            <p>Niet op een park</p>
                            <p>Noordzeestrand {"<1km"}</p>
                            <p>{">1km"} van dorp</p>
                            <p>In / bij bos </p>
                            <p>Bij particulier</p>
                            <p>Vrijstaand vakantiehuis</p>
                            <p>Slaapkamer parterre</p>
                            <p>Centrale verwarming</p>
                            <p>Niet roken</p>
                            <p>Eigen parkeerplaats</p>
                            <p>Tuin</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="knop-boeken">
                <NavLink to="/Boeking" className="nav-link-vierpersoons" >
                    Boek hier uw verblijf
                </NavLink>
            </div>
            <div className="content-two-images">
                    <img id="newYork" src={newYork}/>
                    <img id="zee" src={zee}/>
                    <img id="rainSea" src={rainSea}/>
                    <img id="woestijn" src={woestijn}/>
                </div>
            
        </div>
        </div>
        
    )
}