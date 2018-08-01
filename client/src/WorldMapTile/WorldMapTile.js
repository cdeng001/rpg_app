import React, { Component } from 'react';
import './WorldMapTile.css';

class WorldMapTile extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return (
            <td style={{background: this.props.hex}}></td>
        );
    }
}

export default WorldMapTile;