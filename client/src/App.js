import React, { Component } from 'react';
import './App.css';

import WorldMap from './WorldMap/WorldMap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorldMap></WorldMap>
      </div>
    );
  }
}

export default App;
