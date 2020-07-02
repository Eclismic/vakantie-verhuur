import React, {Component} from 'react';
import axios from 'axios';
import './Boeking.css'

 class Boeking extends Component{
     constructor(props){
         super(props);
         
         this.onChangeKlantnaam = this.onChangeKlantnaam.bind(this);
         this.addBooking = this.addBooking.bind(this);

         this.state ={
            klantnaam: 'Test',
        }
     }

     
     onChangeKlantnaam(e){
         this.setState({
             klantnaam: e.target.value
         })
     }

     addBooking(e){
         e.preventDefault();

         const boeking = {
             customername: this.state.klantnaam
         }

         console.log(boeking);

         axios.post('/bookings/add', boeking)
         .then(res => console.log(res.data));
     };

        render(){
            return(
                <div>
                    <h3>Create new booking</h3>
                    <form onSubmit={this.addBooking}>
                        <div className="form-group">
                            <label>Naam</label>
                            <input type="text" required className="form-control" value={this.state.klantnaam} onChange={this.onChangeKlantnaam}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            );
        }
    }
export default Boeking