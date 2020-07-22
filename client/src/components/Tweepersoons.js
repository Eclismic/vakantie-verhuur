import React from 'react'
import {NavLink} from 'react-router-dom'

export default function ContentBlockOne() {
    return (
        <div className= "parent-tweepersoons">
          <div className="content-container-tweepersoons">
            <div className="content-tweepersoons">
                <div className="content-beschrijving">
                    <div className= "beschrijving-titel">
                        <h3>Vierpersoons</h3>
                    </div>
                    <div className="beschrijving-details">
                        <p style={{fontWeight: 'bold'}}>Ligging:</p> 
                        <p>De zeven dorpen van Texel zijn ieder omringd door heel veel natuur.</p>
                        <p>Badplaats De Koog grenst aan een uitgestrekt duingebied, bos en landerijen.</p>
                        <p>Uw vakantiehuis is rustig en landelijk gelegen aan de rand van De Koog.</p>
                        <p>Het is een prima uitvalsbasis om de Texelse natuur te ontdekken: de natuurgebieden:</p>
                        <p>De Nederlanden, De Muy en De Slufter liggen in de omgeving. Op het brede pad</p>
                        <p>van De Nederlanden naar De Slufter kunt u heerlijk wandelen en fietsen.</p>
                        <p>Vanaf uw vakantiehuis fietst u binnen 5 minuten naar het uitgestrekte Noordzeestrand.</p>
                        <p>Als u op Texel bent wilt u natuurlijk ook zeehonden zien. Bij zeehondenopvangcentrum</p>
                        <p>Ecomare - op 5 kilometer van uw vakantiehuis - kan dat van heel dichtbij.</p>
                        <br></br>
                        <p style={{fontWeight: 'bold'}}>Indeling:</p>
                        <p>De woonkamer is voorzien van zithoek met tv. Er is ook een eethoek.</p>
                        <p>De open keuken is ingericht met koelkast, magnetron en kooktoestel.</p>
                        <p>Er zijn twee slaapkamers met elk 2 eenpersoonsbedden. De badkamer heeft een douche en toilet.</p>
                        <p>Deze bungalow heeft een tuin met terras. Tuinmeubilair is aanwezig.</p>
                        <p></p>
                        <br></br>
                        <p style={{fontWeight: 'bold'}}>Extra’s:</p>
                        <p>Digitenne tv. De bedden zijn bij aankomst opgemaakt.</p>
                        <br></br>
                        <p style={{fontWeight: 'bold'}}>Bijzonderheden:</p>
                        <p>Jongeren onder de 20 jaar zijn welkom als de ouders de gehele periode aanwezig zijn.</p>
                        <p>Bij het schoon achterlaten van het vakantiehuis worden er geen schoonmaakkosten in rekening gebracht.</p>
                    </div>
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
            <div className="content-one-images">
                    
            </div>
        </div>
        </div>
    )
}