import React, { Component } from 'react';
import './App.css';

import Navbar from './Navbar/Navbar';
import WorldMap from './WorldMap/WorldMap';

class App extends Component {
  constructor(props){
    super(props);

    this._viewModes = Object.freeze({
      EXPLORE: 'Explore',
      MAP: 'Map',
      SKILLS: 'Skills',
      INVENTORY: 'Inventory',
      QUESTS: 'Quests',
      INDEX: 'Index'
    });

    this.state = {
      viewMode : this._viewModes.EXPLORE,
      showingNav : true,
    }

    this.setViewMode = this.setViewMode.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  setViewMode(viewMode){
    this.setState({
      viewMode: viewMode
    });
  }

  openNav(){
    this.setState({
      showingNav: true,
    });
  }

  closeNav(){
    this.setState({
      showingNav: false,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Navbar
          viewModes={this._viewModes}
          setViewMode={this.setViewMode}
          showing={this.state.showingNav}
          closeNav={()=>{this.closeNav()}}>
        </Navbar>
        <div className="main-screen" style={{marginLeft: this.state.showingNav ? '250px':'0'}}>
          <p onClick={()=>{this.openNav()}}>{this.state.viewMode}<span>&nbsp;&nbsp;&#9658;</span></p>
          <WorldMap></WorldMap>
        </div>
      </div>
    );
  }
}

export default App;
