import React, { Component } from 'react';
import axios from 'axios';

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

        this.state = {
            voornaam: '...',
            achternaam: '...',
            plaats: '...',
            land: '...',
            appartement: 'Tweepersoons',
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
            prijs: 0
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
                enddateDay: date.getDate()
            })
        }
        console.log(this.state.fulldateEnd)
        if(this.state.fulldateStart !== this.state.fulldateEnd){
            this.calculatePrice()
        }
    }

    calculatePrice(){
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = this.state.fulldateStart
        console.log(firstDate)
        const secondDate = this.state.fulldateEnd

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        console.log(diffDays)
        const berekendePrijs = diffDays * 65

        this.setState({prijs: berekendePrijs})
        this.setState({showLabel:true})
    }

    async processBooking(e) {
        e.preventDefault()

        await this.getAllBookDates()

        
            await this.checkForConflict()
            .then(() => this.addBooking())
            .catch(err => console.log(err))
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

            allVacationDays.push(this.state.fulldateStart.toISOString().substring(0, 10));
            let counter = 1;
            while (counter <= diffDays) {
                let vakantieDag = this.state.fulldateStart.addDays(counter).toISOString().substring(0, 10);
                allVacationDays.push(vakantieDag);
                counter = counter + 1;
            }

            resolve(this.setState({
                geboekteDagen: allVacationDays
            }, () => console.log(this.state.geboekteDagen)))

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
            return !this.state.boekingenTweepersoons.includes(teFilterenDag);
        } else {
            return !this.state.boekingenVierpersoons.includes(teFilterenDag);
        }
    };


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
                        <input type="text" required className="form-control" value={this.state.voornaam} onFocus={(e) => e.target.value === '...' ? e.target.value = '' : e.target.value} onChange={this.onChangeVoornaam} />
                    </div>
                    <div className="form-group">
                        <label>Achternaam</label>
                        <input type="text" required className="form-control" value={this.state.achternaam} onFocus={(e) => e.target.value === '...' ? e.target.value = '' : e.target.value} onChange={this.onChangeAchternaam} />
                    </div>
                    <div className="form-group">
                        <label>Plaats</label>
                        <input type="text" required className="form-control" value={this.state.plaats} onFocus={(e) => e.target.value === '...' ? e.target.value = '' : e.target.value} onChange={this.onChangePlaats} />
                    </div>
                    <div className="form-group">
                        <label>Land</label>
                        <input type="text" required className="form-control" value={this.state.land} onFocus={(e) => e.target.value === '...' ? e.target.value = '' : e.target.value} onChange={this.onChangeLand} />
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
                                placeholderText="Op de maandag en vrijdag kennen wij wisseldagen"
                                filterDate={this.isBezet}
                                withPortal
                                strictParsing
                            />
                        </div>
                        <div className="datepicker-flex-item">
                            <label>Einde vakantie</label>
                            <DatePicker
                                selected={this.state.fulldateEnd}
                                onChange={date => this.onChangeEndDate(date)}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Op de maandag en vrijdag kennen wij wisseldagen"
                                filterDate={this.isBezet}
                                withPortal
                                strictParsing
                            />
                        </div>
                    </div>
                    <label style={this.state.showLabel ? {} : {display:'none'}}>prijs van uw vakantie is: {this.state.prijs}</label>
                    <div className="form-group">
                        <input type="submit" value="Bevestig" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
export default Boeking