import React, { Component } from 'react';
import axios from 'axios';

import Popup from './Popup'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import emailjs from 'emailjs-com';

class Boeking extends Component {
    constructor(props) {
        super(props);

        this.onChangeVoornaam = this.onChangeVoornaam.bind(this);
        this.onChangeAchternaam = this.onChangeAchternaam.bind(this);
        this.onChangePlaats = this.onChangePlaats.bind(this);
        this.onChangeLand = this.onChangeLand.bind(this);
        this.processBooking = this.processBooking.bind(this)
        this.isBezet = this.isBezet.bind(this);
        this.onChangeAppartement = this.onChangeAppartement.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.validateBegindate = this.validateBegindate.bind(this);
        this.validateVacationLength = this.validateVacationLength.bind(this);
        this.togglePopupError = this.togglePopupError.bind(this);
        this.togglePopupSucces = this.togglePopupSucces.bind(this);


        this.state = {
            voornaam: null,
            achternaam: null,
            plaats: null,
            land: null,
            appartement: 'Tweepersoons',
            showConfirmationButton: false,
            fulldateStart: new Date(),
            startdateDay: new Date().getDay(),
            startdateMonth: new Date().getMonth(),
            fulldateEnd: new Date(),
            enddateDay: new Date().getDay(),
            enddateMonth: new Date().getMonth(),
            month: new Date().getMonth(),
            period: [],
            bestaandeBoekingen: [],
            boekingenTweepersoons: [],
            boekingenVierpersoons: [],
            showLabel: false,
            prijs: 0,
            error: '',
            showPopupError: false,
            showPopupSucces: false
        }

    }

    componentDidMount() {
        this.fetchBoekingen();
    }

    //ophalen boekingen
    async fetchBoekingen() {
        await axios.get('/bookings/')
            .then(res => res.data.map((dataRow) => {
                if (dataRow.appartement === 'Tweepersoons') {
                    this.setState({ boekingenTweepersoons: [...this.state.boekingenTweepersoons, dataRow.allVacationDays] })
                } else if (dataRow.appartement === 'Vierpersoons') {
                    this.setState({ boekingenVierpersoons: [...this.state.boekingenVierpersoons, dataRow.allVacationDays] })
                }
            }))

        this.setState({ boekingenTweepersoons: this.state.boekingenTweepersoons.concat.apply([], this.state.boekingenTweepersoons) })
        this.setState({ boekingenVierpersoons: this.state.boekingenVierpersoons.concat.apply([], this.state.boekingenVierpersoons) })

    }

    onChangeVoornaam(e) {
        this.setState({
            voornaam: e.target.value
        })
    }

    onChangeAchternaam(e) {
        this.setState({
            achternaam: e.target.value
        })
    }

    onChangePlaats(e) {
        this.setState({
            plaats: e.target.value
        })
    }

    onChangeLand(e) {
        this.setState({
            land: e.target.value
        })
    }

    onChangeAppartement(e) {
        this.setState({
            appartement: e.target.value
        })
    }

    onChangeStartDate(date) {
        if (date) {
            this.setState({
                fulldateStart: date,
                startdateMonth: date.getMonth(),
                startdateDay: date.getDate()
            })
        }
    }

    onChangeEndDate(date) {
        if (date) {
            this.setState({
                fulldateEnd: date,
                enddateMonth: date.getMonth(),
                enddateDay: date.getDate(),
                showConfirmationButton: true
            }, () =>{
                if(this.state.fulldateStart !== this.state.fulldateEnd){
                    this.calculatePrice()
                }
                
            })
        }
    }

    calculatePrice(){
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = this.state.fulldateStart
        const secondDate = this.state.fulldateEnd

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        const berekendePrijs = diffDays * 65

        this.setState({prijs: berekendePrijs})
        this.setState({showLabel:true})
    }

    async processBooking(e) {
        e.preventDefault()

        this.getAllBookDates()
        .then(() => this.validateBegindate())
        .then(() => this.validateEnddate())
        .then(()=> this.validateVacationLength())
        .then(() =>this.checkForConflict())
        .then(() => this.addBooking())
        .then(() => this.togglePopupSucces())
        .catch(err => {
            console.log(err);
            this.setState({error: err}, ()=> this.togglePopupError());
           }
        )
    };

    async getAllBookDates() {
        return new Promise((resolve) => {

            const oneDay = 24 * 60 * 60 * 1000;
            const diffDays = Math.round(Math.abs((this.state.fulldateStart - this.state.fulldateEnd) / oneDay));
            const allVacationDays = [];

            Date.prototype.addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }

            var startDateForFiltering = new Date();
            startDateForFiltering.setDate(this.state.fulldateStart.getDate() -1);
            startDateForFiltering.setMonth(this.state.fulldateStart.getMonth());

            allVacationDays.push(startDateForFiltering.toISOString().substring(0, 10));
            let counter = 1;
            while (counter < diffDays) {
                let vakantieDag = startDateForFiltering.addDays(counter).toISOString().substring(0, 10);
                allVacationDays.push(vakantieDag);
                counter = counter + 1;
            }

            resolve(this.setState({
                geboekteDagen: allVacationDays
            }, () => console.log(this.state.geboekteDagen)))

        })
    }

    async validateBegindate(){
        return new Promise((resolve, reject) => {
            (this.state.fulldateStart.getDay() === 1 || this.state.fulldateStart.getDay() ===  5) ? resolve('aankomst is op een maandag/vrijdag') : reject('aankomst is niet op maandag/vrijdag');
        })
    }

    async validateEnddate(){
        return new Promise((resolve, reject) => {
            (this.state.fulldateEnd.getDay() === 1 || this.state.fulldateEnd.getDay() === 5) ? resolve('vertrek is op een maandag/vrijdag') : reject('vertrek is niet op maandag/vrijdag');
        })
    }

    async validateVacationLength(){
        return new Promise((resolve, reject) =>{
            (this.state.geboekteDagen.length <= 1) ? reject('Minimale vakantieduur is vier dagen (ofwel een weekend)') : resolve('Vakantieperiode is akkoord qua lengte');
        })
    }

    async checkForConflict(){
        return new Promise((resolve, reject) =>{
            this.state.geboekteDagen.map(dag => {
                if(this.state.appartement === 'Tweepersoons'){
                    this.state.boekingenTweepersoons.includes(dag) ? reject('Tweepersoons huisje is al geboekt voor deze periode...') : resolve('Tweepersoons huisje is deze periode vrij!')
                }else{
                    this.state.boekingenVierpersoons.includes(dag) ? reject('Vierpersoons huisje is al geboekt voor deze periode...') : resolve('Vierpersoons huisje is deze periode vrij!')
                }
            })
        })
    }

    togglePopupError() {
        this.setState({
          showPopupError: !this.state.showPopupError
        });
    }

    togglePopupSucces() {
        this.setState({
          showPopupSucces: !this.state.showPopupSucces
        });
     }

    addBooking(){
        const boeking = {
            customername: this.state.voornaam,
            startdateMonth: this.state.startdateMonth,
            startdateDay: this.state.startdateDay,
            enddateMonth: this.state.enddateMonth,
            enddateDay: this.state.enddateDay,
            allVacationDays: this.state.geboekteDagen,
            appartement: this.state.appartement
        }

        console.log(boeking);

        axios.post('/bookings/add', boeking)
            .then((res) => {
                console.log(res.data);
                //this.sendMessage();
            });
    }
        
    isBezet(dateparam) {
        let teFilterenDag = dateparam.toISOString().substring(0, 10);

        if (this.state.appartement === 'Tweepersoons') {
           // console.log('[RESULTAAT]te filteren dag: ' + teFilterenDag + !this.state.boekingenTweepersoons.includes(teFilterenDag))
            return !this.state.boekingenTweepersoons.includes(teFilterenDag);
        } else {
            return !this.state.boekingenVierpersoons.includes(teFilterenDag);
        }
    };
    
    highlightWithRanges(){
        const maandag = new Date(2020, 7, 10);
        const vrijdag = new Date (2020, 7, 7);


        var arrayHighlightedDays = [
            maandag,
        ]

        var counter = 0;
        
        var laatstAangemaakteMaandag = new Date(maandag.getFullYear(), maandag.getMonth(), maandag.getDate());
        var laatstAangemaakteVrijdag = new Date(vrijdag.getFullYear(), vrijdag.getMonth(), vrijdag.getDate());


        while(counter < 52){
            laatstAangemaakteMaandag.setDate(laatstAangemaakteMaandag.getDate() + 7)
            laatstAangemaakteVrijdag.setDate(laatstAangemaakteVrijdag.getDate() + 7)

            const appendDateMaandag = new Date(laatstAangemaakteMaandag.getFullYear(), laatstAangemaakteMaandag.getMonth(), laatstAangemaakteMaandag.getDate());
            const appendDateVrijdag = new Date(laatstAangemaakteVrijdag.getFullYear(), laatstAangemaakteVrijdag.getMonth(), laatstAangemaakteVrijdag.getDate());

            arrayHighlightedDays.push(appendDateMaandag);
            arrayHighlightedDays.push(appendDateVrijdag);


            counter = counter + 1
        }

        return [ 
            {
                "react-datepicker__day--highlighted-custom-1": arrayHighlightedDays
        }
        ]
    }

    //send email
    sendMessage() {

        const templateParams = {
            from_name: this.state.voornaam,
            to_name: "milcokats@gmail.com"
        };

        emailjs
            .send("gmail", "template_FWsMu9Vo", templateParams, "user_NLpRcuoPFiAcI81sxdIwx")
            .then(
                function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                },
                function (err) {
                    console.log("Your message was not able to be sent" + err);
                }
            );

    };


    render() {
        return (
            <div className="container-boekingsformulier">
                <h3>Boek hier uw verblijf</h3>
                <form onSubmit={this.processBooking}>
                    <div className="form-group">
                        <label>Voornaam</label>
                        <input type="text" required className="form-control" onChange={this.onChangeVoornaam} />
                    </div>
                    <div className="form-group">
                        <label>Achternaam</label>
                        <input type="text" required className="form-control"  onChange={this.onChangeAchternaam} />
                    </div>
                    <div className="form-group">
                        <label>Plaats</label>
                        <input type="text" required className="form-control"  onChange={this.onChangePlaats} />
                    </div>
                    <div className="form-group">
                        <label>Land</label>
                        <input type="text" required className="form-control"  onChange={this.onChangeLand} />
                    </div>
                    <label >Kies uw appartement:</label>
                    <select className="appartementen" form="appartementenform" defaultValue="kies-appartement" onChange={this.onChangeAppartement}>
                        <option disabled value="kies-appartement"> -- maak uw keuze -- </option>
                        <option>Tweepersoons</option>
                        <option>Vierpersoons</option>
                    </select>
                    <div className="gekozen-appartement">
                        <h3>Onderstaand kunt u zien wat er vrij is voor {this.state.appartement}</h3>
                    </div>
                    <div className="datepicker-container">
                        <div className="datepicker-fixed">
                            <label>Begin vakantie</label>
                            <DatePicker
                                selected={this.state.fulldateStart}
                                onChange={date => this.onChangeStartDate(date)}
                                dateFormat="dd-MM-yyyy"
                                filterDate={this.isBezet}
                                withPortal
                                strictParsing
                                highlightDates={this.highlightWithRanges()}
                            />
                        </div>
                        <div className="datepicker-flex-item">
                            <label>Einde vakantie</label>
                            <DatePicker
                                selected={this.state.fulldateEnd}
                                onChange={date => this.onChangeEndDate(date)}
                                dateFormat="dd-MM-yyyy"
                                filterDate={this.isBezet}
                                withPortal
                                strictParsing
                            />
                        </div>
                    </div>
                    <label style={this.state.showLabel ? {} : {display:'none'}}>prijs van uw vakantie is: {this.state.prijs}</label>
                    <div className="form-group">
                        {this.state.showConfirmationButton ? <input type="submit" value="Bevestig" className="btn btn-primary" display='false'/> : null}
                    </div>
                </form>
                {this.state.showPopupError ? <Popup text='Oeps, daar ging iets fout.' errorMessage={this.state.error} error= {true}
                closePopup={this.togglePopupError.bind(this)} />  : null }
                {this.state.showPopupSucces ? <Popup text='Gelukt, uw boeking is doorgekomen' error={false}
                closePopup={this.togglePopupSucces.bind(this)} />  : null }
            </div>
        );
    }
}
export default Boeking