import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.css'


class MyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCheckedRow: this.props.isCheckedRow,
            isCheckedCol: this.props.isCheckedCol,
        }
        this.onClickRadio = this.onClickRadio.bind(this);

    }

    onClickRadio(event) {
        const radioChecked = event.target.value;
        if (radioChecked == "option1") {
            this.setState({isCheckedCol: false, isCheckedRow: true});

        } else {
            this.setState({isCheckedCol: true, isCheckedRow: false});
        }
    }

    render() {

        return (


            <div className="container card p-0">


                <h5 className="card-header">Вставка столбцов/строк</h5>
                <div className="card-body pt-0">

                    <div className="form-group d-inline-block">
                        <label htmlFor="input">Номер ячейки</label>
                        <input type="text" className="form-control input-number" id="input" placeholder="7"
                               defaultValue="7" ></input>
                    </div>

                    <div className="d-inline-block m-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" value="option1" checked={this.state.isCheckedRow} onClick={this.onClickRadio}></input>
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Строку
                            </label>
                        </div>
                        <div className="form-check  mb-3">
                            <input className="form-check-input" type="radio" name="exampleRadios" value="option2" checked={this.state.isCheckedCol} onClick={this.onClickRadio}></input>
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                Столбец
                            </label>
                        </div>

                        <Button variant="success" className="" onClick={this.props.onClickInsert}>Вставить</Button>
                    </div>
                </div>


            </div>


        );
    }
}

export default MyForm