import React, { Component } from 'react';
import './WorldMap.css';
import WorldMapTile from '../WorldMapTile/WorldMapTile';
import {flatten2D, pushSet} from '../utils';

class WorldMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            gridData: [],
            rawMapData: null,
            region: null,
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
        this.triggerSonar = this.triggerSonar.bind(this);
        this.tileClick = this.tileClick.bind(this);
        this.setRegion = this.setRegion.bind(this);
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

        let grid = Array.from({ 
            length: this._mapWidth * this._mapHeight 
        }, () => new Object({
            name:'empty',
            value:0
        }));
        

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
                        trigger={() => {this.tileClick(tileRef)}}
                        selectedRegion={this.state.region}
                        hex={this._pallette[tile.value]}
                        name={tile.name}
                        ref={tileRef}
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

    tileClick(ref){
        this.triggerSonar(...ref.current.getCoords());
        this.setRegion(ref.current.getRegion());
    }

    triggerSonar(x, y){
        let iterations = 8;

        for(let t=0; t<iterations; t++){
            
            setTimeout(()=>{
                let nodes = [];
                let depth = t;
                for(let i=0; i<=depth/2; i++){
                    let low = i;
                    let high = depth - i;

                    nodes = pushSet(nodes, x, y, low, high, this._mapWidth, this._mapHeight);
                }

                let tiles = this._gridTiles;
                nodes.forEach(node => {
                    if(node < tiles.length){
                        tiles[node].current.lightUp();
                    }
                });

                //timeout for removing the lights
                setTimeout(()=>{
                    let ns = nodes;
                    ns.forEach(n => {
                        tiles[n].current.lightDown();
                    });
                }, 50);

            }, t*60);
        }
    }

    setRegion(newRegion){
        this.setState({region:newRegion});
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