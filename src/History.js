import React, {Component} from 'react';
import {tree,easyTree} from "./index";
import Button from "react-bootstrap/Button";
import './style.css'


class History extends Component {
    constructor(props){
        super(props)
        this.state = {
            history: this.props.history,
            currentIndex:  this.props.history.currentIndex,
        }
    }




    render() {

        let unDoButtonEnabled = <Button  className="m-2 d-inline-flex btn-success" onClick = {this.props.onClickUnDo}>Отменить</Button>;

        let unDoButtonDisabled = <Button  className="m-2 d-inline-flex btn-secondary" disabled >Отменить</Button>;

        let reDoButtonEnabled = <Button  className="m-2 d-inline-flex btn-success" onClick = {this.props.onClickReDo}>Вставить</Button>;

        let reDoButtonDisabled = <Button  className="m-2 d-inline-flex btn-secondary" disabled>Вставить</Button>;


        const historyList = this.state.history.data.map((item, index) =>
            (this.state.history.currentIndex ==index)?  <li key = {index} className= "font-weight-bold"> {item.text} </li> :
                <li key = {index} className= ""> {item.text} </li>

        );
console.log("History",this.state.history);
        return (
            <div className="container card p-0">
                <h5 className="card-header">История редактирования таблицы</h5>
                 <div className="border history-list m-3">
                    <ul id = "history-list">
                        {historyList}

                    </ul>

                </div>
                <div className="d-flex justify-content-center">
                    {(this.props.enableUnDo) ? unDoButtonEnabled : unDoButtonDisabled}
                    {(this.props.enableReDo) ? reDoButtonEnabled : reDoButtonDisabled}
                </div>
            </div>
        );
    }
}

export default History;
