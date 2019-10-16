import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.css'


class MyForm extends Component {


    render() {

        return (


            <div className="container card p-0">


                <h5 className="card-header">Вставка столбцов/строк</h5>
                <div className="card-body pt-0 d-flex justify-content-between">
                    <div className ="m-auto">
                    <label htmlFor="input" className="mr-4 h6">Номер ячейки: </label>
                    <div className="input-number m-auto">
                        <input type="text" className="form-control  d-inline-block" id="input" placeholder="7"
                               defaultValue="7" ></input>
                    </div>
                    </div>
                        <Button variant="success" className="btn m-3" onClick={this.props.onClickInsertRow}>Вставить строку</Button>
                        <Button variant="success" className="btn m-3" onClick={this.props.onClickInsertCol}>Вставить столбец</Button>
                    </div>


            </div>


        );
    }
}

export default MyForm