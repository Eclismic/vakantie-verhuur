import React, { Component } from 'react';
import axios from 'axios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './Boeking.css'

class Boeking extends Component {
    constructor(props) {
        super(props);

        this.onChangeVoornaam = this.onChangeVoornaam.bind(this);
        this.onChangeAchternaam = this.onChangeAchternaam.bind(this);
        this.onChangePlaats = this.onChangePlaats.bind(this);
        this.addBooking = this.addBooking.bind(this);
        this.isBezet = this.isBezet.bind(this);
        this.onChangeAppartement = this.onChangeAppartement.bind(this);

        this.state = {
            voornaam: '...',
            achternaam: '...',
            plaats: '...',
            land: '...',
            appartement: null,
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
            boekingenVierpersoons: []
        }
    }

    componentDidMount() {
        this.fetchBoekingen();
    }

    //ophalen boekingen
    async fetchBoekingen() {
        await axios.get('/bookings/')
            .then(res => res.data.map((dataRow) => this.setState({ bestaandeBoekingen: [...this.state.bestaandeBoekingen, dataRow.allVacationDays] })))

        this.setState({ bestaandeBoekingen: this.state.bestaandeBoekingen.concat.apply([], this.state.bestaandeBoekingen) })


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
    }


    async addBooking(e) {
        e.preventDefault();

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


        await this.setState({
            geboekteDagen: allVacationDays
        })


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
            .then(res => console.log(res.data));
    };

    isBezet(dateparam) {
        let teFilterenDag = dateparam.toISOString().substring(0, 10);

        return !this.state.bestaandeBoekingen.includes(teFilterenDag);

    }



    render() {
        return (

            <div className="container-boekingsformulier">
                <h3>Boek hier uw verblijf</h3>
                <form onSubmit={this.addBooking}>
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
                        <option value={this.state.appartement}>Tweepersoons</option>
                        <option value={this.state.appartement}>Vierpersoons</option>
                    </select>
                    <div className="datepicker-container">
                        <div className="datepicker-fixed">
                            <label>Begin vakantie</label>
                            <DatePicker
                                selected={this.state.fulldateStart}
                                onChange={date => this.onChangeStartDate(date)}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Kies uw"
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
                                placeholderText="Maak opnieuw uw keuze!"
                                filterDate={this.isBezet}
                                withPortal
                                strictParsing
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Bevestig" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
export default Boeking