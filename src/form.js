import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import {addСolumn} from "./immutable-tree";
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'


class MyForm extends Component {
  /*  constructor(props){
        super(props)


    }*/




    render() {
        return (
            <div className="container">
            <div className=" card ">
                <h5 className="card-header">Вставка столбцов/строк</h5>
                <div className="card-body">

                    <div className="form-group col-md-6">
                        <label htmlFor="input">Номер ячейки</label>
                        <input type="text" className="form-control" id="input" placeholder="7" defaultValue="7"></input>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                               value="option1" disabled></input>
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Строку
                            </label>
                    </div>
                    <div className="form-check ">
                        <input className="form-check-input " type="radio" name="exampleRadios" id="exampleRadios2"
                               value="option2" checked></input>
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                Столбец
                            </label>
                    </div  >
                    <Button variant="success" className="m-2" onClick = {this.props.onClickHandler}>Вставить</Button>
                </div>
            </div>
            </div>
        );
    }
}

export default MyForm