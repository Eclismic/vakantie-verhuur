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

         this.state ={
            voornaam: '...',
            achternaam: '...',
            plaats: '...',
            land: '...',
            startdate: new Date(),
            enddate: new Date(),
            bestaandeBoekingen: []
        }
     }

     componentDidMount(){
        this.fetchBoekingen();
     }

     //ophalen boekingen
     fetchBoekingen(){
        axios.get('/bookings/')
        .then(res => (res.data.map((info) => this.setState({bestaandeBoekingen:[...this.state.bestaandeBoekingen, info.startdate]}))))
     }

     showBoekingen(){
         this.state.bestaandeBoekingen.map(boeking => console.log(boeking))
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
        this.setState({
            startdate: date
        }
        )
    }

     addBooking(e){
         e.preventDefault();

         const boeking = {
             customername: this.state.voornaam,
             startdate: this.state.startdate,
         }

         console.log(boeking);
         console.log("hiep hoi");

         axios.post('/bookings/add', boeking)
         .then(res => console.log(res.data));
     };

     

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
                            <DatePicker 
                            selected = {this.state.startdate}
                            onChange={date => this.onChangeStartDate(date)}
                            dateFormat="dd-MM-yyyy"
                            isClearable
                            placeholderText="Maak opnieuw uw keuze!"
                            withPortal
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