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
            <div className=" card history  p-0 m-auto ">
                <div className="card-header d-flex justify-content-between ">
                    <div className="d-inline-block h5 mt-auto mb-auto">История</div>
                    <div className="">
                        {(this.props.enableUnDo) ? unDoButtonEnabled : unDoButtonDisabled}
                        {(this.props.enableReDo) ? reDoButtonEnabled : reDoButtonDisabled}
                    </div>
                </div>

                <div className="border history-list m-3">
                    <ul id="history-list">
                        {historyList}
                    </ul>

                </div>

            </div>
        );
    }
}

export default History;
