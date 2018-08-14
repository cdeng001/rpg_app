import React, { Component } from 'react';
import './CharacterClassSelect.css';

class CharacterClassSelect extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectedClass: null,
            open: false,
        }

        this.getListElements = this.getListElements.bind(this);
        this.openSelect = this.openSelect.bind(this);
        this.closeSelect = this.closeSelect.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this.selectClass = this.selectClass.bind(this);
    }

    getListElements(){
        let cList = this.props.classes;
        let elements = [];
        for( let c in cList){
            let cSubs = cList[c];
            let nestedList = [];

            for( let s in cSubs ){
                let n = cSubs[s];
                nestedList.push(
                    <li>
                        <a onClick={()=>{this.selectClass(n)}}>
                            <span>{n}</span>
                        </a>
                    </li>
                );
            }

            elements.push(
                <li>
                    <a><span>{c}</span></a>
                    <ul>
                        {nestedList}
                    </ul>
                </li>
            );
        }
        return elements;
    }

    openSelect(){
        this.setState({
            open: true,
        })
    }

    closeSelect(){
        this.setState({
            open: false,
        })
    }

    getSelected(){
        return this.state.selectedClass ? this.state.selectedClass : 'Select Class';
    }

    selectClass(value){
        this.setState({
            selectedClass: value,
        }, this.closeSelect)
    }

    render(){
        return (
            <div 
                className={"ccs-wrapper"}>
                <button 
                    className={"ccs-button" + (this.state.open ? ' left-btn' : ' center-btn')}
                    onClick={()=>{this.openSelect()}}>
                    {this.getSelected()}
                </button>
                <div className={"ccs-ul-wrapper" + (this.state.open ? ' opened-nav' : ' closed-nav')}>
                    <ul>
                        {this.getListElements()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default CharacterClassSelect;