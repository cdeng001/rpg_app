import React, { Component } from 'react';
import * as enums from '../consts.js';
import './CharacterCreation.css';

import CharacterClassSelect from '../CharacterClassSelect/CharacterClassSelect';

class CharacterCreation extends Component{
    constructor(props){
        super(props);

        this._base = Object.freeze({
            'normal' : 5,
            'hardcore' : 2,
        });

        this.state = {
            name: '',
            class: null,
            gameMode: enums.gameMode.NORMAL,
            statPool: 9,
            strength: this._base.normal,
            intellect: this._base.normal,
            dexterity: this._base.normal,
            health: this._base.normal * 10,
            mana: 0,
            stamina: this._base.normal * 3,
        }
    }

    render(){
        return (
            <div>
                <CharacterClassSelect
                    classes={enums.characterClass}
                >
                </CharacterClassSelect>
            </div>
        )
    }
}

export default CharacterCreation;