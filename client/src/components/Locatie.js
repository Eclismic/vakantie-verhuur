import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl';

  

  export class Locatie extends Component {
    
    state = {
      viewport: {
        width: '100vw',
        height: '85vh',
        latitude: 53.099893,
        longitude: 4.7618406,
        zoom: 12,
      }
    };
  
    render() {
      return (
        <div className='map-container'>
          <ReactMapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
          onViewportChange={(viewport) => this.setState({viewport})}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          
        >
        <Marker 
        latitude={53.099966} 
        longitude={4.774596}>
          <div>Hier zijn wij!</div>
          <svg className="marker" viewBox="0 0 24 24" width="20" height="20" stroke="#FFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </Marker>
        </ReactMapGL>
        </div>
        
      );
    }
  }
  
  export default Locatie