import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import ImgComp from "./ImgComp"
import woestijn from '../img/woestijn.jpeg'
import buitenkant from "../img/tweepersoonsBuitenkant.jpg"
import slaapkamer from "../img/tweepersoonsSlaapkamer.jpg"
import slaapkamer02 from "../img/tweepersoonsSlaapkamer02.jpg"
import keuken from "../img/tweepersoonsKeuken.jpg"
import woonkamer from "../img/tweepersoonsWoonkamer.jpg"




 function ContentBlockOne() {
    const sliderArr = [<ImgComp src={buitenkant}/>, <ImgComp src={slaapkamer}/>, <ImgComp src={slaapkamer02}/>, <ImgComp src={keuken}/>,<ImgComp src={woonkamer}/>];
    const [x,setX] = useState(0);

    const goLeft = () => {
        x === 0 ? setX(-100 * (sliderArr.length -1)) : setX(x + 100);
    };

    const goRight = () => {
        x === -100 * (sliderArr.length -1) ? setX(0) : setX(x - 100);
    };


    return (
        <div className= "parent-tweepersoons">
          <div className="content-container-tweepersoons">
            <div className="content-tweepersoons">
                <div className="slider">{
                    sliderArr.map((item,index) => {
                       return <div key = {index} className="slide" style={{transform: `translateX(${x}%)`}}>
                            {item}
                        </div>    
                    }
                    )
                }
                <button id="goLeft" onClick={goLeft}>links</button>
                <button id="goRight" onClick={goRight}>rechts</button>
                
                </div>
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
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Accommodatie kenmerken </span></p>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Sanitair </span></p>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Apparatuur </span></p>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Aantal slaapkamers </span></p>
                            <br></br>
                            <br></br>
                            <p><span style={{fontWeight: 'bold'}}>Faciliteiten gedeeld </span></p>
                        </div>
                        <div className="value">
                            <p>60 m2</p>
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
                            <p>Op erf / in boerderij</p>
                            <br></br>
                            <p>Vrijstaand vakantiehuis</p>
                            <p>Slaapkamer parterre</p>
                            <p>Centrale verwarming</p>
                            <p>Niet roken</p>
                            <p>Eigen parkeerplaats</p>
                            <p>Tuin</p>
                            <br></br>
                            <p>Douche</p>
                            <p>Badkamer parterre</p>
                            <p>Toilet in badkamer</p>
                            <br></br>
                            <p>Koelkast</p>
                            <p>Koelkast/vriesvak</p>
                            <p>Magnetron</p>
                            <br></br>
                            <p>1 slaapkamer</p>
                            <p>2 slaapkamers</p>
                            <br></br>
                            <p>Parkeerterrein</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="knop-boeken">
                <NavLink to="/Boeking" className="nav-link-tweepersoons" >
                    Boek hier uw verblijf
                </NavLink>
            </div>
        </div>
        </div>
    )
}

export default ContentBlockOne