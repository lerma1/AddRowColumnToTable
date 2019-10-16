import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.css'


class ChoiceTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            indexCheckedTable: this.props.indexCheckedTable,
        }
        this.onClickChoiceTable = this.onClickChoiceTable.bind(this);
    }

    onClickChoiceTable(event) {
        const radioChecked = event.target.value;
        if (radioChecked == "option1") {
            this.setState({indexCheckedTable: 0});

        } else {
            this.setState({indexCheckedTable: 1});
        }
    }

    render() {


        return (
            <div className="container  card p-0">


                <h5 className="card-header">Выбор таблицы для тестов</h5>
                <div className="card-body">
                    <div className="form-check m-1 ml-3 ">
                        <input className="form-check-input " type="radio" name="choice-table" id="exampleRadios1"
                               value="option1" checked={this.state.indexCheckedTable == 0}
                               onClick={this.onClickChoiceTable}></input>
                        <label className="form-check-label" htmlFor="exampleRadios1">Таблица №1</label>
                    </div>

                    <div className="form-check m-1 ml-3 mb-3">
                        <input className="form-check-input " type="radio" name="choice-table" id="exampleRadios2"
                               value="option2" checked={this.state.indexCheckedTable == 1}
                               onClick={this.onClickChoiceTable}></input>
                        <label className="form-check-label" htmlFor="exampleRadios2">Таблица №2</label>
                    </div>

                    <Button variant="success" className="btn btn-success"
                            onClick={this.props.onChoiceTable}>Выбрать</Button>
                </div>
            </div>
        );
    }
}

export default ChoiceTable