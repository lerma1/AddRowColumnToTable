import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import {addСolumn} from "./immutable-tree";
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'


class ChoiceTable extends Component {
    render() {
        return (
        <div className="container  card p-0">


                    <h5 className="card-header">Выбор таблицы для тестов</h5>
            <div className="card-body">
                    <div className="form-check m-1 ml-3 ">
                        <input className="form-check-input " type="radio" name="choice-table" id="exampleRadios1"  value="option1" checked ></input>
                        <label className="form-check-label" htmlFor="exampleRadios1">Простая</label>
                    </div>

                    <div className="form-check m-1 ml-3 mb-3">
                        <input className="form-check-input " type="radio" name="choice-table" id="exampleRadios2" value="option2"  ></input>
                        <label className="form-check-label" htmlFor="exampleRadios2">Сложная</label>
                    </div>

                    <Button variant="success" className="btn btn-success" onClick = {this.props.onChoiseTable}>Выбрать</Button>
            </div>
            </div>
        );
    }
}

export default ChoiceTable