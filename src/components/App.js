import React, {Component} from 'react';
import MyTable from "./Table";
import History from "./History";
import MyNavbar from "./Navbar";
import {tree1, tree2, tree3} from "../index";
import 'bootstrap/dist/css/bootstrap.css'
import "../css/style.css"


class App extends Component {
    constructor(props) {
        super(props)
        this.onChoiceTable = this.onChoiceTable.bind(this);
        this.onClickUnDo = this.onClickUnDo.bind(this);
        this.onClickReDo = this.onClickReDo.bind(this);
        this.onClickCellInsertRow = this.onClickCellInsertRow.bind(this);
        this.onClickCellInsertCol = this.onClickCellInsertCol.bind(this);

        this.state = {
            tree: this.props.history.data[0].tree,
            history: this.props.history,
            enableUnDo: false,
            enableReDo: false,
            isCheckedRow: true,
            isCheckedCol: false,
            indexCheckedTable: 1,

        }
    }
    isValidate = (value) => {

        if (!Number.isInteger(value)) {
            alert("Введите целое число - номер ячейки в таблице!");
            return false;
        }

        if (value > this.state.tree.getMaxValue()) {
            alert("Элемент с таким номером не найден!");
            return false;
        }
        return true;
    }

    insertRow = (value) => {
        const newTree = this.state.tree.addRow(value);
        let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice(0, this.state.history.currentIndex+1)};
        newHistory.data.push({text: `Вставлена строка в ячейку № ${value}`, tree: newTree});

        this.setState({tree: newTree, isCheckedRow: true, isCheckedCol: false, history: newHistory});
    }

    insertCol = (value) => {
        const newTree = this.state.tree.addColumn(value);
        let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice(0, this.state.history.currentIndex+1)};
        newHistory.data.push({text: `Вставлен столбец в ячейку № ${value}`, tree: newTree});

        this.setState({tree: newTree, isCheckedRow: false, isCheckedCol: true, history: newHistory});
    }

    onClickCellInsertRow(event) {
        const value = Number(event.target.id);
        this.insertRow(value);
    }

    onClickCellInsertCol(event) {
        const value = Number(event.target.id);
        this.insertCol(value);
    }

    onChoiceTable(value) {

        if (value == 1) {
            const newTree = tree1;
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice(0, this.state.history.currentIndex+1)};
            newHistory.data.push({text: `Создана таблица №1`, tree: newTree});

            this.setState({tree: newTree, history: newHistory, indexCheckedTable: 0});

        }
        if (value == 2) {
            const newTree = tree2;
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice(0, this.state.history.currentIndex+1)};
            newHistory.data.push({text: `Создана таблица №2`, tree: newTree});

            this.setState({history: newHistory, tree: newTree, indexCheckedTable: 1});
        }
        if (value == 3) {
            const newTree = tree3;
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice(0, this.state.history.currentIndex+1)};
            newHistory.data.push({text: `Создана таблица №3`, tree: newTree});

            this.setState({history: newHistory, tree: newTree, indexCheckedTable: 1});
        }
    }

    onClickUnDo() {

        const newHistory = {currentIndex: this.state.history.currentIndex - 1, data: this.state.history.data.slice()};
        this.setState({tree: newHistory.data[this.state.history.currentIndex - 1].tree, history: newHistory});
        console.log("height", this.state.height);
    }

    onClickReDo() {
        if (this.state.history.currentIndex + 1 >= this.state.history.data.length) return;
        const newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};
        this.setState({tree: newHistory.data[this.state.history.currentIndex + 1].tree, history: newHistory});

    }



    render() {

        return (
            <div className="App">
                <MyNavbar onChoiceTable={this.onChoiceTable}
                          indexCheckedTable={this.state.indexCheckedTable}/>
                <div className="container">

                    <MyTable tree={this.state.history.data[this.state.history.currentIndex].tree}
                             key={this.state.history.currentIndex}
                             onClickCellInsertRow={this.onClickCellInsertRow} onClickCellInsertCol={this.onClickCellInsertCol}

                    />
                    <div className="">
                        <div className="d-block ">


                        </div>
                        <History history={this.state.history}
                                 key={this.state.history.currentIndex}
                                 enableUnDo={this.state.history.currentIndex > 0}
                                 enableReDo={(this.state.history.currentIndex + 1) < this.state.history.data.length}
                                 onClickUnDo={this.onClickUnDo}
                                 onClickReDo={this.onClickReDo}
                        />
                    </div>
                </div>
            </div>
                );
                }
                }

                export default App;
