import React, {Component} from 'react';
import axios from 'axios';
import './Boeking.css'

 class Boeking extends Component{
     constructor(props){
         super(props);
         
         this.onChangeVoornaam = this.onChangeVoornaam.bind(this);
         this.onChangeAchternaam = this.onChangeAchternaam.bind(this);

         this.addBooking = this.addBooking.bind(this);

         this.state ={
            voornaam: '...',
            achternaam: '...',
            plaats: '...'
        }
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

     addBooking(e){
         e.preventDefault();

         const boeking = {
             customername: this.state.voornaam
         }

         console.log(boeking);
         console.log("hiep hoi");

         axios.post('/bookings/add', boeking)
         .then(res => console.log(res.data));
     };

        render(){
            return(
                <div>
                    <h3>Boek hier uw verblijf</h3>
                    <form onSubmit={this.addBooking}>
                        <div className="form-group">
                            <label>Voornaam</label>
                            <input type="text" required className="form-control" value={this.state.voornaam} onChange={this.onChangeVoornaam}/>
                        </div>
                        <div className="form-group">
                            <label>Achternaam</label>
                            <input type="text" required className="form-control" value={this.state.achternaam} onChange={this.onChangeAchternaam}/>
                        </div>
                        <div className="form-group">
                            <label>Plaats</label>
                            <input type="text" required className="form-control" value={this.state.plaats} onChange={this.onChangePlaats}/>
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