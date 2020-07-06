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
         this.isBezet = this.isBezet.bind(this);
         this.showBoekingen = this.showBoekingen.bind(this);

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
            period: [],
            bestaandeBoekingen: [],
            geboekteDagen: []
        }
     }

     componentDidMount(){
        this.fetchBoekingen();
     }

     //ophalen boekingen
     async fetchBoekingen(){
       await axios.get('/bookings/')
       .then(res => res.data.map((dataRow) => this.setState({bestaandeBoekingen: [...this.state.bestaandeBoekingen, dataRow.allVacationDays]}) ))

      this.setState({bestaandeBoekingen: this.state.bestaandeBoekingen.concat.apply([], this.state.bestaandeBoekingen)})
        //.then(res => (res.data.map((info) => this.setState({bestaandeBoekingen:[...this.state.bestaandeBoekingen, {Maand: info.startdateMonth, Dag: info.startdateDay, geboekteDagen:}]}))))
     }

     showBoekingen(){
        console.log(this.state.bestaandeBoekingen);
        this.isBezet(new Date())
         //this.isBezet(this.state.fulldate)
        // console.log('state.period: ',this.state.period);
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
         const diffDays = Math.round(Math.abs((this.state.fulldateStart - this.state.fulldateEnd) / oneDay));
         const allVacationDays = [];

         Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
         
        allVacationDays.push(this.state.fulldateStart.toISOString().substring(0,10));
         let counter = 1;
         while(counter <= diffDays){
            let vakantieDag = this.state.fulldateStart.addDays(counter).toISOString().substring(0,10);
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
             allVacationDays: this.state.geboekteDagen
         }

         console.log(boeking);

         axios.post('/bookings/add', boeking)
         .then(res => console.log(res.data));
     };

       isBezet(dateparam){

         let teFilterenDag = dateparam.toISOString().substring(0,10);
         console.log('valideren', teFilterenDag);

         console.log(this.state.bestaandeBoekingen.includes(teFilterenDag));

         return !this.state.bestaandeBoekingen.includes(teFilterenDag);
            
        /*
        const day = date.getDate();
        const month = date.getMonth();

        let bookingsSelectedMonth = this.state.bestaandeBoekingen.filter(boek => boek.Maand === month)
        bookingsSelectedMonth.map(x => console.log(x))

        let bookedDaysMonth = bookingsSelectedMonth.map(booking => this.getVacationDays(booking))
        console.log(bookedDaysMonth);

        //let bookedDaysMonth = this.state.bestaandeBoekingen.filter(boek => boek.Maand === month).map(x => x.Dag)
        
       // return !bookedDaysMonth.includes(day)

        //return day !== 0 && day !==1 && day !== 2
*/
        
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
                            placeholderText="Kies uw"
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