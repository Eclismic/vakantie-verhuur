import React from 'react';
import './App.css';
import Header from './components/lay-out/Header/Header'
import ContentBlockOne from './components/lay-out/ContentBlockOne/ContentBlockOne';
import ContentBlockTwo from './components/lay-out/ContentBlockTwo/ContentBlockTwo';
import Footer from './components/lay-out/Footer/Footer';
import Locatie from './components/lay-out/Locatie/Locatie'
import Boeking   from './components/lay-out/Boeking/Boeking'
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
                <Route exact path="/Boeking" component={Boeking}/>
            <div className="main-footer">
                <Footer/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
