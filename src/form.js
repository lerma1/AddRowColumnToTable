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

        const onKeyUpHandler = () => {
            let input = document.getElementById("input");
            console.log(input.value);
            input.value = input.value.replace('[^0-9]', "");
            //тут должна быть какая-то другая проверка

        }

        return (



            <div className="container  ">

                <div className="form-choice-table card mb-3 mt-3">
                    <h5 className="card-header">Выбор таблицы для тестов</h5>
                    <div className="form-check m-1 ml-3 ">
                        <input className="form-check-input " type="radio" name="choice-table" id="exampleRadios1"
                               value="option1" checked ></input>
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            Простая
                        </label>
                    </div>
                    <div className="form-check m-1 ml-3 mb-3">
                        <input className="form-check-input " type="radio" name="choice-table" id="exampleRadios2"
                               value="option2"  ></input>
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Сложная
                        </label>
                    </div>
                    <Button variant="success" className="m-2 d-inline-block" onClick = {this.props.onChoiseTable}>Выбрать</Button>
                </div>

            <div className=" card ">
                <h5 className="card-header">Вставка столбцов/строк</h5>
                <div className="card-body ">
                    <div className="form-insert-col-row d-inline-block">
                    <div className="form-group col-md-6 input-number">
                        <label htmlFor="input">Номер ячейки</label>
                        <input type="text"  className="form-control input-number" style={{'width':'100px'}} id="input" placeholder="7" defaultValue="7" onKeyUp={onKeyUpHandler}></input>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                               value="option1" checked ></input>
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Строку
                            </label>
                    </div>
                    <div className="form-check ">
                        <input className="form-check-input " type="radio" name="exampleRadios" id="exampleRadios2"
                               value="option2"  ></input>
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                Столбец
                            </label>
                    </div>
                    <Button variant="success" className="m-2" onClick = {this.props.onClickHandler}>Вставить</Button>
                </div>


               
                </div>
            </div>


            </div>
        );
    }
}

export default MyForm