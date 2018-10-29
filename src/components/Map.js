import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

// Getting map on the screen
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{lat: 41.881832, lng: -87.623177}}
    center={{lat: 41.881832, lng: -87.623177}}
  >
  {/* Getting the markers to show up on the map */}
    {props.markers && props.markers.filter(marker => marker.isVisible)
    .map((marker, index, array) => {
        const details = props.venues.find(venue => venue.id === marker.id);
        return(
            <Marker 
                key={index}
                aria-label='marker'
                tabIndex='0'
                onClick={() => props.openWindow(marker)}
                alt={marker.name}
                position={marker.location}
                animation={array.length !== 7 ? window.google.maps.Animation.BOUNCE : window.google.maps.Animation.DROP }
            >
        {/* Checking to see if the info window is open and if so display our photo and description */}
            {marker.isOpen && 
            details.bestPhoto && 
            (
                <InfoWindow aria-label="Venue info window" onClick={props.openWindow}>
                    <>
                        <img src={`${details.bestPhoto.prefix}200x175${details.bestPhoto.suffix}`} alt={`${details.name}`} />
                        <p>{details.name}</p>
                        <p>{details.location.address}</p>
                    </>
                </InfoWindow>
            )};
        </Marker>
        );  
    })};     
  </GoogleMap>
))

export default class Map extends Component{
    
    render() {

        return(
            <MyMapComponent className="map-header"
            // Catch error handler for map not loading!!
                {...this.props}
                isMarkerShown
                role='application'
                aria-label='map'
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBBi_PjE3B6SmXv9A4nkh9-YlyJJePG6oM"
                loadingElement={<div style={{ height: `100%` }} alt={'google map'} />}
                containerElement={<div style={{width: `100%`, height: `100vh` }} alt={'google map'}/>}
                mapElement={<div style={{ height: `100vh` }} alt={'google map'}/>}
            />
        )
        
    }
}

 

