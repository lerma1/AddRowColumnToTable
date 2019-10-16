import React, {Component} from 'react';
import MyTable from "./table";
import MyForm from "./Form"
import History from "./History";
import ChoiceTable from "./ChoiceTable";
import {addСolumn, addRow} from "./immutable-tree";
import {getMaxValue} from "./tree";
import {tree1, tree2} from "./index";


class App extends Component {
    constructor(props) {
        super(props)
        this.onClickInsert = this.onClickInsert.bind(this);
        this.onChoiceTable = this.onChoiceTable.bind(this);
        this.onClickUnDo = this.onClickUnDo.bind(this);
        this.onClickReDo = this.onClickReDo.bind(this);

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

    onClickInsert() {
        let value = Number(document.getElementById("input").value);
        if (value > getMaxValue(this.state.tree)) {
            alert("Элемент с таким номером не найден!");
            return;
        }

        let radio = document.getElementsByName("exampleRadios");

        if (radio[0].checked) {
            let newTree = addRow(value, this.state.tree);
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};

            if (newHistory.currentIndex != newHistory.data.length - 1) newHistory.data.slice(0, newHistory.currentIndex);
            newHistory.data.push({text: `Вставлена строка в ячейку № ${value}`, tree: newTree});

            this.setState({tree: newTree, isCheckedRow: true, isCheckedCol: false, history: newHistory});

        } else {
            let newTree = addСolumn(value, this.state.tree);
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};

            if (newHistory.currentIndex != newHistory.data.length - 1) newHistory.data.slice(0, newHistory.currentIndex);
            newHistory.data.push({text: `Вставлен столбец в ячейку № ${value}`, tree: newTree});

            this.setState({tree: newTree, isCheckedRow: false, isCheckedCol: true, history: newHistory});

        }
    }

    onChoiceTable() {
        let radio = document.getElementsByName("choice-table");

        if (radio[0].checked) {
            let newTree = tree1;
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};
            newHistory.data.push({text: `Создана Таблица №1`, tree: newTree});

            this.setState({tree: newTree, history: newHistory, indexCheckedTable: 0});

        } else {
            let newTree = tree2;
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};
            newHistory.data.push({text: `Создана таблица №2`, tree: newTree});

            this.setState({history: newHistory, tree: newTree, indexCheckedTable: 1});
        }
    }

    onClickUnDo() {

        let newHistory = {currentIndex: this.state.history.currentIndex - 1, data: this.state.history.data.slice()};
        this.setState({tree: newHistory.data[this.state.history.currentIndex - 1], history: newHistory});
        console.log("onClickUnDo", newHistory.currentIndex);
    }

    onClickReDo() {
        if (this.state.history.currentIndex + 1 >= this.state.history.data.length) return;
        let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};
        this.setState({tree: newHistory.data[this.state.history.currentIndex + 1], history: newHistory});

    }


    render() {
        return (
            <div className="container">
                <div className="App">
                    <h1>Вставка столбцов/строк</h1>

                    <p><span className="h6">Задание:   </span>Дана таблица, структура которой представима в виде
                        «дерева». Необходимо реализовать вставку строк и колонок в таблицу в указанной позиции.</p>
                </div>
                <div className="card-deck">
                    <div className="card border-0">
                        <ChoiceTable style={{"width": "100px"}} onChoiceTable={this.onChoiceTable}
                                     indexCheckedTable={this.state.indexCheckedTable}/>
                        <MyForm onClickInsert={this.onClickInsert} isCheckedRow={this.state.isCheckedRow}
                                isCheckedCol={this.state.isCheckedCol}/>
                    </div>
                    <History history={this.state.history}
                             key={this.state.history.currentIndex}
                             enableUnDo={this.state.history.currentIndex > 0}
                             enableReDo={(this.state.history.currentIndex + 1) < this.state.history.data.length}
                             onClickUnDo={this.onClickUnDo}
                             onClickReDo={this.onClickReDo}

                    />
                </div>
                <MyTable tree={this.state.history.data[this.state.history.currentIndex].tree}
                         key={this.state.history.currentIndex}/>

            </div>
        );
    }
}

export default App;
