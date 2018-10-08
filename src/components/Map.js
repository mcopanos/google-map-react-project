import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{lat: 41.881832, lng: -87.623177}}
  >
    {props.isMarkerShown && <Marker position={{lat: 41.881832, lng: -87.623177}} />}
  </GoogleMap>
))

export default class Map extends Component{
    render() {
        return(
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBBi_PjE3B6SmXv9A4nkh9-YlyJJePG6oM"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
        
    }
}

 

