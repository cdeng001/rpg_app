import React, { Component } from 'react';
import './WorldMap.css';
import WorldMapTile from '../WorldMapTile/WorldMapTile';
import {flatten2D} from '../utils';

class WorldMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            gridData: [],
            rawMapData: null,
        }

        this._gridTiles = [];

        this._pallette = Object.freeze({
            1: '#493829',
            2: '#613318',
            3: '#8F3B1B',
            4: '#404F24',
            5: '#4E6172',
        });

        this.pullMapData = this.pullMapData.bind(this);
        this.initData = this.initData.bind(this);
        this.setGrid = this.setGrid.bind(this);
        this.drawGrid = this.drawGrid.bind(this);
    }

    componentDidMount() {

        let _this = this;
        this.pullMapData()
            .then((json) => {

                //set state
                _this.setState({
                    rawMapData: json,
                    loading: false
                },
                () => {
                    _this.initData();
                });
            })
    }

    initData(){
        //set map variables
        let mapData = this.state.rawMapData;
        this._mapWidth = mapData.width;
        this._mapHeight = mapData.height;

        //draw map, set sprites on canvas
        this.setGrid();
    }

    setGrid(){
        let mapData = this.state.rawMapData;
        let layers = mapData.layers;
        let grid = new Array(this._mapWidth * this._mapHeight);
        grid.fill({
            name: 'empty',
            value: 0,
        });

        layers.forEach(layer => {
            let name = layer.name;
            let data = layer.data;
            let layer_h = layer.height;
            let layer_w = layer.width;

            for(let i=0; i<layer_h; i++){
                for(let j=0; j<layer_w; j++){
                    let index = flatten2D(j, i, this._mapWidth);
                    let tid = data[ index ];

                    if(tid > 0){
                        grid[index].name = name;
                        grid[index].value = tid;
                    }
                }
            }
        });

        this.setState({gridData: grid});
    }

    drawGrid(){
        let tiles = [];
        let rows = [];
        for(let i=0; i<this._mapHeight; i++){
            let cols = [];
            for(let j=0; j<this._mapWidth; j++){
                let id = flatten2D(j, i, this._mapWidth);
                let tile = this.state.gridData[ id ];
                let tileRef = React.createRef();
                cols.push(
                    <WorldMapTile
                        trigger={() => {this.triggerSonar(j,i)}}
                        hex={this._pallette[tile.value]}
                        ref = {tileRef}
                        name={tile.name}
                        key={id}
                        x={j}
                        y={i}
                    />
                );
                tiles.push(tileRef);
            }
            rows.push(
                <tr key={i}>{cols}</tr>
            )
        }

        this._gridTiles = tiles;
        return rows;
    }

    pullMapData(){
        return fetch('/maps/world.json')
            .then(function(response){
                return response.json();
            })
    }

    triggerSonar(x, y){
        let depth = 6;
        let point = flatten2D(x, y, this._mapWidth);

        //get farthest edge
        let distances = [x, y, x - this._mapWidth, y - this._mapHeight];
        let iterations = Math.max(...distances);

        let nodes = [];
        nodes.push(
            flatten2D(x+depth, y, this._mapWidth),
            flatten2D(x-depth, y, this._mapWidth),
            flatten2D(x, y-depth, this._mapWidth),
            flatten2D(x, y+depth, this._mapWidth),
        )
        for(let i=1; i<=depth/2; i++){
            let low = i;
            let high = depth - i;

            nodes.push(
                flatten2D(x+low, y+high, this._mapWidth),
                flatten2D(x-low, y-high, this._mapWidth),
                flatten2D(x+low, y-high, this._mapWidth),
                flatten2D(x-low, y+high, this._mapWidth),
            )
            if(low !== high){
                //anot the same, so swap
                nodes.push(
                    flatten2D(x+high, y+low, this._mapWidth),
                    flatten2D(x-high, y-low, this._mapWidth),
                    flatten2D(x+high, y-low, this._mapWidth),
                    flatten2D(x-high, y+low, this._mapWidth),
                )
            }
        }

        let tiles = this._gridTiles;
        nodes.forEach(node => {
            if(node < tiles.length){
                tiles[node].current.lightUp();
            }
        });
    }

    render(){
        return (
            <div>
                <table>
                    <tbody>
                        {this.drawGrid()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default WorldMap;