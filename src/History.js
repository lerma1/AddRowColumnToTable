import React, {Component} from 'react';
import {tree,easyTree} from "./index";
import Button from "react-bootstrap/Button";
import './style.css'


class History extends Component {
    constructor(props){
        super(props)



        this.state = {
            history: this.props.history,
        }
    }




    render() {

        const historyList = this.state.history.map((item, index) =>
            <li key = {index} className= ""> {item.text} </li>
        );

        return (
            <div className="container card p-0">
                <h5 className="card-header">История редактирования таблицы</h5>
                 <div className="border history-list m-3">
                    <ul id = "history-list">
                        {historyList}

                    </ul>

                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="success" className="m-2 d-inline-flex " onClick = {this.props.onClickUnDo}>Отменить</Button>
                    <Button variant="success" className="m-2 d-inline-flex " onClick = {this.props.onClickReDo}>Вставить</Button>
                </div>
            </div>
        );
    }
}

export default History;
