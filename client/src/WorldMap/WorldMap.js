import React, { Component } from 'react';
import * as PIXI from 'pixi.js'
import 'pixi-tilemap';
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

        this.pullMapData()
            .then((json) => {
                this.setMap(json);
            });
        
    }

    setMap(mapData){
        console.log(mapData);
        PIXI.loader
            .add([
                "images/world_colors.png"
            ])
            .load((loader, resources) => {
                var worldTiles = new PIXI.tilemap.CompositeRectTileLayer(0, PIXI.utils.TextureCache['images/world_colors.png']);
                this._app.stage.addChild(worldTiles);

                console.log(worldTiles);
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
        return fetch('/maps/world.json')
            .then(function(response){
                return response.json();
            })
    }

    render(){
        const display = this.state.loading ? this.getLoadingDisplay() : this.getWorldMapDisplay();
        return (
            <div>
                {display}
            </div>
        );
    }
}

export default WorldMap;