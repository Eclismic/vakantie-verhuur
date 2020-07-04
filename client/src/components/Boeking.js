import React, {Component} from 'react';
import axios from 'axios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './Boeking.css'

 class Boeking extends Component{
     constructor(props){
         super(props);
         
         this.onChangeVoornaam = this.onChangeVoornaam.bind(this);
         this.onChangeAchternaam = this.onChangeAchternaam.bind(this);
         this.onChangePlaats = this.onChangePlaats.bind(this);
         this.addBooking = this.addBooking.bind(this);
         this.showBoekingen = this.showBoekingen.bind(this);
         this.isBezet = this.isBezet.bind(this);

         this.state ={
            voornaam: '...',
            achternaam: '...',
            plaats: '...',
            land: '...',
            fulldateStart: new Date(),
            startdateDay: new Date().getDay(),
            startdateMonth: new Date().getMonth(),
            fulldateEnd: new Date(),
            enddateDay: new Date().getDay(),
            enddateMonth: new Date().getMonth(),
            month: new Date().getMonth(),
            period: 0,
            bestaandeBoekingen: []
        }
     }

     componentDidMount(){
        this.fetchBoekingen();
     }

     //ophalen boekingen
     fetchBoekingen(){
        axios.get('/bookings/')
        .then(res => (res.data.map((info) => this.setState({bestaandeBoekingen:[...this.state.bestaandeBoekingen, {Maand: info.startdateMonth, Dag: info.startdateDay, Period: info.period}]}))))
     }

     showBoekingen(){
         this.state.bestaandeBoekingen.map(boeking => console.log(boeking))
         //this.isBezet(this.state.fulldate)
         console.log('state.period: ',this.state.period);
     }

     onChangeVoornaam(e){
         this.setState({
             voornaam: e.target.value
         })
     }

     onChangeAchternaam(e){
        this.setState({
            achternaam: e.target.value
        })
    }

    onChangePlaats(e){
        this.setState({
            plaats: e.target.value
        })
    }

    onChangeLand(e){
        this.setState({
            land: e.target.value
        })
    }

    onChangeStartDate(date){
        if(date){
            this.setState({
                fulldateStart: date,
                startdateMonth: date.getMonth(),
                startdateDay: date.getDate()
            })
        }
    }

    onChangeEndDate(date){
        if(date){
            this.setState({
                fulldateEnd: date,
                enddateMonth: date.getMonth(),
                enddateDay: date.getDate()
            })
        }
    }
    

    async addBooking(e){
         e.preventDefault();

         const oneDay = 24 * 60 * 60 * 1000;
         const beginVacation = new Date(2020, this.state.startdateMonth, this.state.startdateDay);
         const endVacation = new Date(2020, this.state.enddateMonth, this.state.enddateDay);
         const diffDays = Math.round(Math.abs((beginVacation - endVacation) / oneDay));
        
        await this.setState({
             period: diffDays
         })

         console.log('state.period AWAIT: ',this.state.period);

         const boeking = {
             customername: this.state.voornaam,
             startdateMonth: this.state.startdateMonth,
             startdateDay: this.state.startdateDay,
             enddateMonth: this.state.enddateMonth,
             enddateDay: this.state.enddateDay,
             period: this.state.period
         }

         console.log(boeking);

         axios.post('/bookings/add', boeking)
         .then(res => console.log(res.data));
     };

     isBezet(date){
         //getDate()
        const day = date.getDate();
        const month = date.getMonth();

        let bookedDaysMonth = this.state.bestaandeBoekingen.filter(boek => boek.Maand === month).map(x => x.Dag)
        
        return !bookedDaysMonth.includes(day)

        //return day !== 0 && day !==1 && day !== 2

     }

        render(){
            return(
                
                <div className="container-boekingsformulier">
                    <button onClick={this.showBoekingen}>Show Boekingen</button>
                    <h3>Boek hier uw verblijf</h3>
                    <form onSubmit={this.addBooking}>
                        <div className="form-group">
                            <label>Voornaam</label>
                            <input type="text" required className="form-control" value={this.state.voornaam} onFocus={(e) => e.target.value === '...'? e.target.value = '': e.target.value} onChange={this.onChangeVoornaam}/>
                        </div>
                        <div className="form-group">
                            <label>Achternaam</label>
                            <input type="text" required className="form-control" value={this.state.achternaam} onFocus={(e) => e.target.value === '...'? e.target.value = '': e.target.value} onChange={this.onChangeAchternaam}/>
                        </div>
                        <div className="form-group">
                            <label>Plaats</label>
                            <input type="text" required className="form-control" value={this.state.plaats} onFocus={(e) => e.target.value === '...'? e.target.value = '': e.target.value} onChange={this.onChangePlaats}/>
                        </div>
                        <div className="form-group">
                            <label>Land</label>
                            <input type="text" required className="form-control" value={this.state.land} onFocus={(e) => e.target.value === '...'? e.target.value = '': e.target.value} onChange={this.onChangeLand}/>
                        </div>
                        <div className="datepicker">
                            <label>Begin vakantie</label>
                            <DatePicker 
                            selected = {this.state.fulldateStart}
                            onChange={date => this.onChangeStartDate(date)}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Maak opnieuw uw keuze!"
                            filterDate={this.isBezet}
                            withPortal
                            strictParsing
                            />
                        </div>
                        <div className="datepicker">
                            <label>Einde vakantie</label>
                            <DatePicker 
                            selected = {this.state.fulldateEnd}
                            onChange={date => this.onChangeEndDate(date)}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Maak opnieuw uw keuze!"
                            filterDate={this.isBezet}
                            withPortal
                            strictParsing
                            />
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