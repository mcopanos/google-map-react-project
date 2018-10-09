import React, { Component } from 'react'
import Map from './components/Map'
import SideBar from './components/SideBar'
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
    console.log(markers.id);
  }

  openWindow = (marker) => {
    this.closeWindow();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker)})
    FourSquareAPI.getVenuePhotos(marker.id)
  }
  componentDidMount(){
    FourSquareAPI.search({
      ll:	'44.3,37.2',
      near: 'Chicago, IL',
      query: 'park',
      limit: 10
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
      this.setState({markers, venues})
     console.log(venues);
    })
  }

  render() {
    return (
      <div className="App">
      <div className="container">
        <SideBar {...this.state}/>
      </div>
        
        <Map id="map"
          {...this.state}
          openWindow={this.openWindow}
        />
      </div>
    );
  }
}

export default App;
