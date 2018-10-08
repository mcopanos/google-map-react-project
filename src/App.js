import React, { Component } from 'react'
import Map from './components/Map'
import FourSquareAPI from './FourSquareAPI'
import './App.css';


class App extends Component {
  state= {
    venues: [],
    markers: [],
  }
  
  closeWindow = () => {
    const markers = this.state.markers;
    markers.map(marker => {
      marker.isOpen=false;
      return marker;
    })
  }

  openWindow = (marker) => {
    this.closeWindow();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker)})
    console.log('click');
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
        <Map id="map"
          {...this.state}
          openWindow={this.openWindow}
        />
      </div>
    );
  }
}

export default App;
