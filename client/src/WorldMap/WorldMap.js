import React, { Component } from 'react';
import * as PIXI from 'pixi.js'
import 'pixi-tilemap';
import './WorldMap.css';

class WorldMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            gridData: [],
            rawMapData: null,
        }

        this._canvasWidth = 801;
        this._canvasHeight = 601;

        this.pullMapData = this.pullMapData.bind(this);
        this.setMap = this.setMap.bind(this);
        this.drawMap = this.drawMap.bind(this);
        this.setTextures = this.setTextures.bind(this);
        this.canvasClick = this.canvasClick.bind(this);
    }

    componentDidMount() {
        this._app = new PIXI.Application({
            width: this._canvasWidth,
            height: this._canvasHeight,
            view: this._canvas,
            backgroundColor : 0x1099bb,
        });

        this._canvas.addEventListener("click", this.canvasClick, false);

        this.setTextures();

        let _this = this;
        this.pullMapData()
            .then((json) => {

                //set state
                _this.setState({
                    rawMapData: json,
                    loading: false
                },
                () => {
                    _this.setMap();
                });
            })
    }

    componentDidUpdate(){
        //if we update, redraw map
        this.drawMap();
    }

    setTextures(){
        this._textures = [];
        var sprite_width = 1;
        var sprite_height = 1;
        var mySpriteSheetImage  = PIXI.BaseTexture.fromImage("images/world_colors.png");

        // forloops use magic numbers
        for(let i=0; i<3; i++){
            for(let j=0; j<16; j++){
                this._textures.push(
                    new PIXI.Texture(
                        mySpriteSheetImage,
                        new PIXI.Rectangle(j, i, sprite_width, sprite_height)
                    )
                );
            }
        }
    }

    setMap(){

        //set map variables
        let mapData = this.state.rawMapData;
        this._mapWidth = mapData.width;
        this._mapHeight = mapData.height;

        //draw map, set sprites on canvas
        this.drawMap();
    }

    drawMap(){
        let mapData = this.state.rawMapData;
        let layers = mapData.layers;
        layers.forEach(layer => {
            let name = layer.name;
            let data = layer.data;
            let layer_h = layer.height;
            let layer_w = layer.width;
            let off_x = layer.x;
            let off_y = layer.y;
            let scale = 8;

            for(let i=0; i<layer_h; i++){
                for(let j=0; j<layer_w; j++){
                    let tid = data[ i*layer_w + j ] - 1;

                    if(tid > -1){
                        let sprite = new PIXI.Sprite(this._textures[tid]);
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

    pullMapData(){
        return fetch('/maps/world.json')
            .then(function(response){
                return response.json();
            })
    }

    flatten2D(x, y){
        return y * this._mapWidth + x;
    }

    canvasClick(event){
        console.log(event);
    }

    render(){
        return (
            <div>
                <canvas
                    ref={ref => (this._canvas = ref)}>    
                </canvas>
            </div>
        );
    }
}

export default WorldMap;