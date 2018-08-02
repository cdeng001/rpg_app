import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import './WorldMapTile.css';

class WorldMapTile extends Component{
    constructor(props){
        super(props);

        this.state = {
            lite: false,
        }

        this.getBG = this.getBG.bind(this);
        this.lightUp = this.lightUp.bind(this);
    }
    
    lightUp(){
        let _this = this;
        if(!this.state.lite){
            this.setState({lite: true}, ()=>{
                setTimeout(() => {
                    console.log("called")
                    _this.setState({lite: false});
                }, 500);
            });
        }
        
    }

    getBG(){
        let lite = this.state.lite;
        if(lite){
            return tinycolor(this.props.hex).lighten(25).toString();
        }

        return this.props.hex;
    }

    render(){
        return (
            <td style={{background: this.getBG()}} onClick={this.props.trigger}></td>
        );
    }
}

export default WorldMapTile;