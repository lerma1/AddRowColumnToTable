import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";




export default class MyNavbar extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (val) {
        (val===1)? this.props.setViewNoteList(false):this.props.setViewNoteList(true);

    };



    render() {


        return (

            <Navbar collapseOnSelect expand="lg" bg="info" variant="dark" className ="" >
                <Navbar.Brand >Вставка столбцов/строк</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className ="">
                        <ToggleButtonGroup className="" type="radio" name="options" defaultValue={1}   onChange={this.handleChange} >
                            <ToggleButton variant="outline-light" value={1}>Таблица 1</ToggleButton>
                            <ToggleButton variant="outline-light" value={2}>Таблица 1</ToggleButton>
                            <ToggleButton variant="outline-light" value={3}>Таблица 3</ToggleButton>
                        </ToggleButtonGroup>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
            ;
    }
}