import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";




export default class MyNavbar extends Component {

    render() {


        return (

            <Navbar collapseOnSelect expand="sm" bg="info" variant="dark" className ="d-flex justify-content-between" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className ="d-inline-block mr-auto ml-auto">
                        <ToggleButtonGroup className="" type="radio" name="options" defaultValue={3}   onChange={this.props.onChoiceTable} >
                            <ToggleButton variant="outline-light" value={1}>Таблица 1</ToggleButton>
                            <ToggleButton variant="outline-light" value={2}>Таблица 2</ToggleButton>
                            <ToggleButton variant="outline-light" value={3}>Таблица 3</ToggleButton>
                        </ToggleButtonGroup>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )

    }
}