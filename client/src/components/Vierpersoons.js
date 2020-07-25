import React from 'react'
import {NavLink} from 'react-router-dom'
import newYork from '../img/newYork.jpg'
import zee from '../img/zee.jpeg'
import rainSea from '../img/rainSea.jpg'
import woestijn from '../img/woestijn.jpeg'
import Slider from "react-slick";
import { render } from 'react-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ContentBlockTwo extends React.Component {
    render(){
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            className:"slides",
            centerMode: true,
            centerPadding: 0,
            variableWidth: true,
            swipe: true
          };
    
    return (
        <div className= "parent-vierpersoons">
            <div className="content-container-vierpersoons">
            <Slider {...settings}>
                <div className="slider-container">  
                    <img height="500px" src= {newYork}/>
                    </div>
                    <div>
                    <img height="500px" src= {zee}/>
                    </div>
                    <div>
                    <img height="500px" src= {rainSea}/>
                    </div>
                    <div>
                    <img height="500px" src= {woestijn}/>
                    </div>
                    <div>
                    <img  height="500px" src= {newYork}/>
                    </div>
                    <div>
                    <img height="500px" src= {newYork}/>
                </div>
               
            </Slider>
                <div className="content-kenmerken">
                    <div className="kenmerken-titel">
                        <h3>Kenmerken & faciliteiten</h3>
                    </div>
                    <div className="kenmerken-details">
                        <div className="key">
                            <p><span style={{fontWeight: 'bold'}}>Woonoppervlakte</span></p>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Buitenruimte </span></p>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Accomodatietype </span></p>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Huisdieren </span></p>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Ligging </span></p>
                            <br></br>
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
                            <br></br>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Apparatuur </span></p>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Aantal slaapkamers </span></p>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Faciliteiten gedeeld </span></p>
                        </div>
                        <div className="value">
                            <p>90 m2</p>
                            <br></br>
                            <p>400 m2</p>
                            <br></br>
                            <p>Vakantiehuis</p>
                            <br></br>
                            <p>1 huisdier</p>
                            <br></br>
                            <p>Niet op een park</p>
                            <p>Noordzeestrand {"<1km"}</p>
                            <p>{">1km"} van dorp</p>
                            <p>In / bij bos </p>
                            <p>Bij particulier</p>
                            <br></br>
                            <p>Vrijstaand vakantiehuis</p>
                            <p>Slaapkamer parterre</p>
                            <p>Centrale verwarming</p>
                            <p>Niet roken</p>
                            <p>Eigen parkeerplaats</p>
                            <p>Tuin</p>
                            <br></br>
                            <p>Douche</p>
                            <p>Toilet in badkamer</p>
                            <br></br>
                            <p>Koelkast</p>
                            <p>Koelkast/vriesvak</p>
                            <p>Magnetron</p>
                            <br></br>
                            <p>1 slaapkamer</p>
                            <p>2 slaapkamers</p>
                            <p>3 slaapkamers</p>
                            <br></br>
                            <p>Parkeerterrein</p>
                        </div>
                    </div>
                </div>
            
            <div className="knop-boeken">
                <NavLink to="/Boeking" className="nav-link-vierpersoons" >
                    Boek hier uw verblijf
                </NavLink>
            </div>
        </div>
        </div>

        
    )
    }
}

export default ContentBlockTwo