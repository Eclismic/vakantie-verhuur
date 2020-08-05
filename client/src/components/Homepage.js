import React, { Component } from 'react'
import './Homepage.css'
import Footer from './Footer.js'
import DatePicker from "react-datepicker";
import axios from 'axios';
import { set } from 'lodash';



 class Homepage extends Component{
    constructor(props) {
        super(props);

        this.isBezetTweepersoons = this.isBezetTweepersoons.bind(this);
        this.isBezetVierpersoons = this.isBezetVierpersoons.bind(this);
        this.fetchBoekingen = this.fetchBoekingen.bind(this);
        
    }

    componentDidMount(){
        this.fetchBoekingen();
    }

    bookingsArrTweepersoons = []
    bookingsArrVierpersoons = []   


    showCardTweepersoons(){
        this.setState({showTweepersoons:""})
    }
   
    //ophalen boekingen
    async fetchBoekingen() {
         await axios.get('/bookings/')
            .then(res => res.data.map((dataRow) => {
                if (dataRow.appartement === 'Tweepersoons') {
                    this.bookingsArrTweepersoons = [...this.bookingsArrTweepersoons, dataRow.allVacationDays] 
                } else if (dataRow.appartement === 'Vierpersoons') {
                    this.bookingsArrVierpersoons = [...this.bookingsArrVierpersoons, dataRow.allVacationDays] 
                }
            }))

        this.bookingsArrTweepersoons = this.bookingsArrTweepersoons.concat.apply([], this.bookingsArrTweepersoons) 
        this.bookingsArrVierpersoons = this.bookingsArrVierpersoons.concat.apply([], this.bookingsArrVierpersoons)
    }

    isBezetTweepersoons(dateparam){
        let teFilterenDag = dateparam.toISOString().substring(0, 10);
        return !this.bookingsArrTweepersoons.includes(teFilterenDag);
    };

    isBezetVierpersoons(dateparam){
        let teFilterenDag = dateparam.toISOString().substring(0, 10);
        return !this.bookingsArrVierpersoons.includes(teFilterenDag);
    };

    render(){
        return (
            <div className = "homepage-container">
                <Footer/>
                <div className="homepage-section-one" >
                    <div className="text">
                            <div>
                                 Vakantiehuisjes
                            </div> 
                    <div> 
                        <span>Mienterglop 13, De Koog</span>
                    </div>
                    </div>
                    <div className="scroll-down">
                        <a href="#section-two">
                    <svg width="100px" height="150px" viewBox="0 0 512 512" >
        <g>
            <g>
                <path d="M487.99,220.156L282.65,14.817c-19.758-19.756-51.904-19.756-71.662,0c-19.757,19.758-19.757,51.905,0,71.663
                    l169.508,169.508L210.988,425.495c-19.757,19.758-19.757,51.905,0,71.663C220.559,506.73,233.283,512,246.819,512
                    c13.535,0,26.26-5.27,35.831-14.842L487.99,291.819c9.57-9.571,14.842-22.297,14.842-35.831
                    C502.831,242.452,497.56,229.727,487.99,220.156z M473.565,277.395L268.225,482.734c-5.718,5.718-13.32,8.867-21.406,8.867
                    s-15.689-3.149-21.406-8.867c-11.804-11.804-11.804-31.01,0-42.813l176.719-176.72c3.983-3.984,3.983-10.442,0-14.425
                    L225.412,72.054c-11.803-11.804-11.803-31.01,0-42.813c5.903-5.903,13.653-8.852,21.407-8.852c7.752,0,15.506,2.952,21.406,8.852
                    l205.339,205.341c5.719,5.718,8.868,13.321,8.868,21.406C482.432,264.074,479.282,271.677,473.565,277.395z"/>
            </g>
        </g>
        <g>
            <g>
                <path d="M458.645,233.423l-14.248-14.043c-4.013-3.954-10.471-3.908-14.424,0.105c-3.953,4.013-3.908,10.47,0.105,14.424
                    l14.248,14.043c1.987,1.958,4.574,2.935,7.159,2.935c2.636,0,5.269-1.015,7.265-3.041
                    C462.704,243.835,462.658,237.377,458.645,233.423z"/>
            </g>
        </g>
        <g>
            <g>
                <path d="M417.641,192.772L260.197,37.589c-4.012-3.954-10.471-3.908-14.424,0.105c-3.953,4.013-3.908,10.47,0.105,14.424
                    l157.445,155.183c1.987,1.958,4.574,2.935,7.159,2.935c2.635,0,5.269-1.015,7.264-3.041
                    C421.699,203.184,421.653,196.726,417.641,192.772z"/>
            </g>
        </g>
        <g>
            <g>
                <path d="M300.989,220.156L95.649,14.817c-19.758-19.756-51.904-19.756-71.662,0c-19.758,19.758-19.758,51.905,0,71.663
                    l169.508,169.508L23.987,425.495c-19.758,19.758-19.758,51.905,0,71.663C33.558,506.73,46.282,512,59.818,512
                    c13.535,0,26.259-5.27,35.831-14.842l205.34-205.339c9.57-9.571,14.842-22.297,14.842-35.831
                    C315.83,242.452,310.559,229.727,300.989,220.156z M286.562,277.395L81.223,482.734c-5.718,5.718-13.32,8.867-21.406,8.867
                    c-8.086,0-15.689-3.149-21.406-8.867c-11.804-11.804-11.804-31.01,0-42.813l176.72-176.72c3.983-3.984,3.983-10.442,0-14.425
                    L38.411,72.054c-11.803-11.804-11.803-31.01,0-42.813c5.903-5.903,13.653-8.852,21.407-8.852c7.751,0,15.505,2.952,21.406,8.852
                    l205.338,205.34C298.366,246.386,298.366,265.592,286.562,277.395z"/>
            </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        </svg>
        </a>
                    </div>
                </div>  
                <div className="homepage-section-two" id="section-two">
                    <div className= "section-two-wrapper">
                        <div className="section-two-column-one">	
                            <h4>Kalendar tweepersoons</h4>
                            <div className = "react-datepicker-homepage">
                                <DatePicker
                                filterDate={this.isBezetTweepersoons}
                                placeholderText="Wat is er vrij? Klik hier voor tweepersoons huisje"
                                calendarClassName="kalendar-homepage"
                                popperPlacement="top-start"
                                popperModifiers={{
                                    offset: {
                                    enabled: true,
                                    offset: "150px, 10px"
                                    }}}
                                />
                            </div>
                        </div>
                        <div className="section-two-column-two">
                            <h4>kalendar vierpersoons</h4>
                            <div className = "react-datepicker-homepage">
                                <DatePicker
                                filterDate={this.isBezetVierpersoons}
                                placeholderText="Wat is er vrij? Klik hier voor vierpersoons huisje"
                                calendarClassName="kalendar-homepage"
                                popperPlacement="top"
                                popperModifiers={{
                                    offset: {
                                    enabled: true,
                                    offset: "150px, 10px"
                                    }}}
                                />
                            </div>    
                    
                    </div>
                    <div className="section-two-column-three">
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
                                <p>De keuken is ingericht met koelkast, magnetron, filter koffiezetapparaat en waterkoker.</p>
                                <p>Er is een slaapkamer met 1 tweepersoons bed. De badkamer heeft een douche en toilet.</p>
                                <p>Op de bovenverdieping zijn twee slaapkamers met elk 2 eenpersoons bedden en een wastafel.</p>
                                <p>Dit vakantiehuis heeft een tuin met terras. Tuinmeubilair is aanwezig.</p>
                                <br></br>
                                <p style={{fontWeight: 'bold'}}>Extra’s:</p>
                                <p>Digitenne tv. De bedden zijn bij aankomst opgemaakt.</p>
                                <br></br>
                                <p style={{fontWeight: 'bold'}}>Bijzonderheden:</p>
                                <p>Jongeren onder de 20 jaar zijn welkom als de ouders de gehele periode aanwezig zijn.</p>
                                <p>Bij het schoon achterlaten van het vakantiehuis worden er geen schoonmaakkosten in rekening gebracht.</p>
                            </div>
                    </div>
                    </div>
                
                </div>
        
                
            </div>
            )
        }
    }
   

export default Homepage