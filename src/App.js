import React, { Component } from 'react'
import Map from './components/Map'
import SideBar from './components/SideBar'
import FourSquareAPI from './FourSquareAPI'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state= {
      venues: [],
      markers: [],
      updateMarkers: marker => {this.setState(marker);},
      // getAnimation: google.maps.Animation.BOUNCE,
    };
  }
  
  // Close info window
  closeWindow = () => {
    const markers = this.state.markers;
    markers.map(marker => {
      marker.isOpen=false;
      return marker;
    })
  }

  // Open info window
  openWindow = (marker) => {
    this.closeWindow();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    
    // this.toggleBounce(marker);
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    console.log('clicked');

    FourSquareAPI.getVenuesDetails(marker.id)
    .then(results => {
      const details = Object.assign(venue, results.response.venue);
      this.setState({venues: Object.assign(this.state.venues, details)})
      console.log(details);
    }).catch(err => console.log(err));  
  }

  // Open window of clicked list item
  listItemEvent = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.openWindow(marker);
  }

  listItemKeyPress = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.openWindow(marker);
  }

  // Set state of venues and markers
  componentDidMount(){
    FourSquareAPI.search({
      ll:	'44.3,37.2',
      near: 'Chicago, IL',
      query: 'park',
      limit: 7
    }).then(results => {
      const venues = results.response.venues;
      const markers = venues.map(venue => {
        return{
          id: venue.id,
          name: venue.name,
          location: {
            lat: venue.location.lat,
            lng: venue.location.lng
          },
          isOpen: false,
          isVisible: true
        }
      });
      this.setState({markers, venues});
      console.log(venues);
    })
  }

  render() {
    return (
      <div className="App">
      <div className="container">
        <SideBar 
          {...this.state}
          isVisibe={this.isVisible}
          listItemEvent={this.listItemEvent}
          udateQuery={this.udateQuery}
          listItemKeyPress={this.listItemKeyPress}
        />
      </div>
        <Map id="map"
          {...this.state}
          openWindow={this.openWindow}
          udateQuery={this.udateQuery}
        />
      </div>
    );
  }
}

export default App;
