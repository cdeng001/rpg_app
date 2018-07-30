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
            //adding one to the view to check border
            mapWidth: 401,
            mapHeight: 301,
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
        var sprite_width = 1;
        var sprite_height = 1;
        var mySpriteSheetImage  = PIXI.BaseTexture.fromImage("images/world_colors.png");
        
        var textures = [];

        for(let i=0; i<3; i++){
            for(let j=0; j<16; j++){
                textures.push(
                    new PIXI.Texture(
                        mySpriteSheetImage,
                        new PIXI.Rectangle(j, i, sprite_width, sprite_height)
                    )
                );
            }
        }

        var layers = mapData.layers;
        layers.forEach(layer => {
            let data = layer.data;
            let layer_h = layer.height;
            let layer_w = layer.width;
            let off_x = layer.x;
            let off_y = layer.y;
            let scale = 4;

            for(let i=0; i<layer_h; i++){
                for(let j=0; j<layer_w; j++){
                    let tid = data[ i*layer_w + j ] - 1;

                    if(tid > -1){
                        let sprite = new PIXI.Sprite(textures[tid]);
                        sprite.scale.x = scale;
                        sprite.scale.y = scale;
                        sprite.x = off_x + j*scale;
                        sprite.y = off_y + i*scale;
                        this._app.stage.addChild(sprite);
                    }
                }
            }
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