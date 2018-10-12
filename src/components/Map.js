import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{lat: 41.881832, lng: -87.623177}}
    center={{lat: 41.881832, lng: -87.623177}}
  >
    {props.markers && props.markers.filter(marker => marker.isVisible)
    .map((marker, index) => {
        const details = props.venues.find(venue => venue.id === marker.id);
        return(
            <Marker 
            key={index}
            onClick={() => props.openWindow(marker)}
            position={marker.location}
            animation={window.google.maps.Animation.DROP}
        >
            {marker.isOpen && 
            details.bestPhoto && 
            (
                <InfoWindow onClick={props.openWindow}>
                    <>
                        <img src={`${details.bestPhoto.prefix}175x150${details.bestPhoto.suffix}`} alt={"Park"}/>
                        <p>{details.name}</p>
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
                {...this.props}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBBi_PjE3B6SmXv9A4nkh9-YlyJJePG6oM"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{width: `100%`, height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
        
    }
}

 

