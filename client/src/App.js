import React, {Component} from 'react';
import Header from './components/Header'
import ContentBlockOne from './components/Tweepersoons';
import ContentBlockTwo from './components/Vierpersoons';
import Footer from './components/Footer';
import Locatie from './components/Locatie'
import Boeking   from './components/Boeking'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
 
  render() {
    return (
      <Router>
        <div className="App"> 
          <div className="page-container">
            <Header/>
            <div className="content">
                <Route exact path="/Tweepersoons" component={ContentBlockOne}/>
                <Route exact path="/Vierpersoons" component={ContentBlockTwo}/>
            </div>
            <div className="map">
                <Route exact path="/Locatie" component={Locatie}/>
            </div>
              <div className= "boeking">
                <Route exact path="/Boeking" component={Boeking}/>
              </div>
          </div>
          <div className="main-footer">
                <Footer/>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
