import React, { Component } from 'react';
import './WorldMap.css';
import WorldMapTile from '../WorldMapTile/WorldMapTile';

class WorldMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            gridData: [],
            rawMapData: null,
        }

        this._pallette = Object.freeze({
            5: '#ff0000',
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
                    let index = this.flatten2D(j,i);
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
        let rows = [];
        for(let i=0; i<this._mapHeight; i++){
            let cols = [];
            for(let j=0; j<this._mapWidth; j++){
                let tile = this.state.gridData[ this.flatten2D(j, i) ];
                cols.push(
                    <WorldMapTile name={tile.name} hex={this._pallette[tile.value]}/>
                )
            }
            rows.push(
                <tr>{cols}</tr>
            )
        }
        return rows;
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

    render(){
        return (
            <div>
                <table>
                    {this.drawGrid()}
                </table>
            </div>
        );
    }
}

export default WorldMap;