import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import './WorldMapTile.css';

class WorldMapTile extends Component{
    constructor(props){
        super(props);

        this.state = {
            lite: false,
        }

        this._triggers = 0;

        this.getBG = this.getBG.bind(this);
        this.lightUp = this.lightUp.bind(this);
        this.lightDown = this.lightDown.bind(this);
        this.getCoords = this.getCoords.bind(this);
        this.getRegion = this.getRegion.bind(this);
    }

    lightDown(){
        if(this.state.lite){

            this._triggers--;

            if(this._triggers < 1){
                this.setState({
                    lite: false,
                });
            }
        }
    }
    
    lightUp(){
        let _this = this;
        
        this.setState({
            lite: true,
        },
        () => {
            _this._trigger++;
        });
        
    }

    getCoords(){
        return [this.props.x, this.props.y];
    }

    getBG(){
        let lite = this.state.lite;
        if(lite){
            return tinycolor(this.props.hex).lighten(25).toString();
        }
        else if(this.props.name === this.props.selectedRegion){
            return tinycolor(this.props.hex).lighten(10).toString();
        }

        return this.props.hex;
    }

    getRegion(){
        return this.props.name;
    }

    render(){
        return (
            <td style={{background: this.getBG()}} onClick={this.props.trigger}></td>
        );
    }
}

export default WorldMapTile;