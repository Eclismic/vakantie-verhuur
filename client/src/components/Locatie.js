import React, { Component } from 'react'
import './Locatie.css'
import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

  const style = {
    width: '100%',
    height: '100%',
};

  export class Locatie extends Component {
    
      render() {
        return (
            <div className="google-maps">
                <Map google={this.props.google}
                                style={style}
                                initialCenter={{
                                lat: 53.0962203,
                                lng: 4.7618406
                                }}
                                zoom={15}
                                onClick={this.onMapClicked}>
                                </Map>
            </div>
        );
      }
  }
  
  export default GoogleApiWrapper({
    apiKey: ('AIzaSyCNDC-J33vQBHFRkk--Kpk2ll1RBgWBGP0')
  })(Locatie)