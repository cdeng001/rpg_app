import React, { Component } from 'react';
import './App.css';
import WorldMap from './WorldMap/WorldMap';

class App extends Component {
  constructor(props){
    super(props);

    this._viewModes = Object.freeze({
      WORLD: 'world',
      REGION: 'region',
      NODE: 'node',
    });
  }

  render() {
    return (
      <div className="App">
        <WorldMap view=""></WorldMap>
      </div>
    );
  }
}

export default App;
