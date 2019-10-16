import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import '../css/style.css'


class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: this.props.history,
            currentIndex: this.props.history.currentIndex,
        }
    }



    render() {

        const unDoButtonEnabled = <Button className="m-2 d-inline-flex btn-success"
                                        onClick={this.props.onClickUnDo}>Отменить</Button>;
        const unDoButtonDisabled = <Button className="m-2 d-inline-flex btn-secondary" disabled>Отменить</Button>;
        const reDoButtonEnabled = <Button className="m-2 d-inline-flex btn-success"
                                        onClick={this.props.onClickReDo}>Вернуть</Button>;
        const reDoButtonDisabled = <Button className="m-2 d-inline-flex btn-secondary" disabled>Вставить</Button>;


        const historyList = this.state.history.data.map((item, index) =>
            (this.state.history.currentIndex == index) ?
                <li key={index} className="font-weight-bold"> {item.text} </li> :
                <li key={index} className=""> {item.text} </li>
        );

        return (
            <div className="container card p-0">
                <h5 className="card-header">История редактирования таблицы</h5>
                <div className="border history-list m-3">
                    <ul id="history-list" scrollTop = "9999">
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
