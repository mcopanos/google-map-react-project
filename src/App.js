import React, { Component } from 'react'
import Map from './components/Map'
import FourSquareAPI from './FourSquareAPI'
import './App.css';


class App extends Component {
  state= {
    venues: [],
    markers: [],
  }
  
  componentDidMount(){
    FourSquareAPI.search({
      ll:	'44.3,37.2',
      near: 'Chicago, IL',
      query: 'park',
      limit: 6
    }).then(results => {
      const venues = results.response.venues;
      const markers = venues.map(venue => {
        return{
          id: venue.id,
          location: {
            lat: venue.location.lat,
            lng: venue.location.lng
          },
          isOpen: false,
          isVisible: true
        }
      });
      this.setState({ venues, markers })
     console.log(markers);
    })
  }

  render() {
    return (
      <div className="App">
        <Map 
          {...this.state}
          id="map"/>
      </div>
    );
  }
}

export default App;
