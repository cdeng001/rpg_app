import React, { Component } from 'react';
import * as PIXI from 'pixi.js'
import 'pixi-tiledmap';
import './WorldMap.css';

class WorldMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            mapData: null,
            mapWidth: 400,
            mapHeight: 300,
        }

        this.getWorldMapDisplay = this.getWorldMapDisplay.bind(this);
        this.getLoadingDisplay = this.getLoadingDisplay.bind(this);
        this.pullMapData = this.pullMapData.bind(this);
        this.setMap = this.setMap.bind(this);
    }

    componentDidMount() {
        this._app = new PIXI.Application({
            width: this.state.mapWidth,
            height: this.state.mapHeight,
            view: this._canvas,
            backgroundColor : 0x1099bb,
        });
        this.setMap();
    }

    setMap(){
        PIXI.loader
            .add('maps/world.tmx')
            .load(() => {
                this._app.render(new PIXI.extras.TiledMap('maps/world.tmx'));
            });
    }

    getWorldMapDisplay(){
        return (
            <canvas 
                className="world-map-canvas"
                ref={ref => (this._canvas = ref)}>    
            </canvas>
        );
    }

    getLoadingDisplay(){
        return (
            <p>loading</p>
        );
    }

    pullMapData(){
        fetch('/maps/world.json')
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                console.log(json);
            });
    }

    render(){
        //this.pullMapData();
        const display = this.state.loading ? this.getLoadingDisplay() : this.getWorldMapDisplay();
        return (
            <div>
                {display}
            </div>
        );
    }
}

export default WorldMap;