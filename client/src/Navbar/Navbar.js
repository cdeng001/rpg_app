import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component{
    constructor(props){
        super(props);
    }

    render(){

        let viewModes = this.props.viewModes;
        let navLinks = [];
        for (let vm in viewModes){
            let viewMode = viewModes[vm];
            navLinks.push(
                <a key={vm} onClick={()=>{this.props.setViewMode(viewMode)}} >{viewMode}</a>
            );
        }
        return (
            <nav className="sidenav" style={{width: this.props.showing ? '250px':'0'}}>
                <a className="closebtn" onClick={this.props.closeNav}>&times;</a>
                {navLinks}
            </nav>
        );
    }
}

export default Navbar;