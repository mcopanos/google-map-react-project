import React, { Component } from 'react'
import Map from './components/Map'
import './App.css';

class App extends Component {
  

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
