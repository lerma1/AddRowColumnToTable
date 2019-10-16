import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import {addСolumn} from "./immutable-tree";
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'


class MyForm extends Component {
   constructor(props){
        super(props)
       this.state = {

       }

    }




    render() {

        const onKeyUpHandler = () => {
            let input = document.getElementById("input");
            console.log(input.value);
            input.value = input.value.replace('[^0-9]', "");
            //тут должна быть какая-то другая проверка

        }

        let isCheckedRow = (this.props.isCheckedRow)? <input className="form-check-input" type="radio" name="exampleRadios"  value="option1" checked></input> :
            <input className="form-check-input" type="radio" name="exampleRadios"  value="option1"></input>;
        let isCheckedCol = (this.props.isCheckedCol)? <input className="form-check-input" type="radio" name="exampleRadios"  value="option2" checked></input> :
            <input className="form-check-input" type="radio" name="exampleRadios"  value="option2"></input>;


        return (



            <div className="container card p-0">


                <h5 className="card-header">Вставка столбцов/строк</h5>
                <div className="card-body pt-0">

                    <div className="form-group d-inline-block">
                        <label htmlFor="input">Номер ячейки</label>
                        <input type="text"  className="form-control input-number"  id="input" placeholder="7" defaultValue="7" onKeyUp={onKeyUpHandler}></input>
                    </div>

                    <div className="d-inline-block m-4">
                    <div className="form-check">
                       {isCheckedRow}
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Строку
                            </label>
                    </div>
                    <div className="form-check  mb-3">
                        {isCheckedCol}
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                Столбец
                            </label>
                    </div>

                    <Button variant="success" className="" onClick = {this.props.onClickInsert}>Вставить</Button>
                </div>
                </div>


                </div>




        );
    }
}

export default MyForm