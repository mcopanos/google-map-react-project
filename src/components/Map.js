import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{lat: 41.881832, lng: -87.623177}}
  >
    {props.markers && props.markers.filter(marker => marker.isVisible)
    .map((marker, index) => (
        <Marker 
            key={index}
            onClick={() => props.openWindow(marker)}
            position={marker.location}
            animation={window.google.maps.Animation.DROP}
        >
            {marker.isOpen && <InfoWindow onClick={props.openWindow}>
                <p>hello</p>
            </InfoWindow>}
        </Marker>
    ))}
        
  </GoogleMap>
))

export default class Map extends Component{
    render() {
        return(
            <MyMapComponent
                {...this.props}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBBi_PjE3B6SmXv9A4nkh9-YlyJJePG6oM"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
        
    }
}

 

