import React, { Component } from 'react';
import './WorldMapTile.css';

class WorldMapTile extends Component{
    constructor(props){
        super(props);
        
        this.getStyle = this.getStyle.bind(this);
    }

    getStyle(){
        return "background: " + this.props.hex;
    }

    render(){
        return (
            <td style={this.getStyle()}>&nbsp;</td>
        );
    }
}

export default WorldMapTile;