import React, {Component} from 'react';
import MyTable from "./Table";
import MyForm from "./Insert-form"
import History from "./History";
import MyNavbar from "./Navbar";
import ChoiceTable from "./ChoiceTable";
import {tree1, tree2} from "../index";
import "../css/style.css"


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
            widthWindow: 100,
            heightWindow: 100,
        }
    }


    onClickInsert() {
        const value = Number(document.getElementById("input").value);
        if (!Number.isInteger(value)) {
            alert("Введите целое число - номер ячейки в таблице!");
            return;
        }

        if (value > this.state.tree.getMaxValue()) {
            alert("Элемент с таким номером не найден!");
            return;
        }

        const radio = document.getElementsByName("exampleRadios");


        if (radio[0].checked) {
            const newTree = this.state.tree.addRow(value);
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};

            if (newHistory.currentIndex != newHistory.data.length - 1) newHistory.data.slice(0, newHistory.currentIndex);
            newHistory.data.push({text: `Вставлена строка в ячейку № ${value}`, tree: newTree});

            this.setState({tree: newTree, isCheckedRow: true, isCheckedCol: false, history: newHistory});

        } else {
            const newTree = this.state.tree.addColumn(value);
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};

            if (newHistory.currentIndex != newHistory.data.length - 1) newHistory.data.slice(0, newHistory.currentIndex);
            newHistory.data.push({text: `Вставлен столбец в ячейку № ${value}`, tree: newTree});

            this.setState({tree: newTree, isCheckedRow: false, isCheckedCol: true, history: newHistory});

        }
    }

    onChoiceTable() {
        const radio = document.getElementsByName("choice-table");

        if (radio[0].checked) {
            const newTree = tree1;
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};
            newHistory.data.push({text: `Создана Таблица №1`, tree: newTree});

            this.setState({tree: newTree, history: newHistory, indexCheckedTable: 0});

        } else {
            const newTree = tree2;
            let newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};
            newHistory.data.push({text: `Создана таблица №2`, tree: newTree});

            this.setState({history: newHistory, tree: newTree, indexCheckedTable: 1});
        }
    }

    onClickUnDo() {

        const newHistory = {currentIndex: this.state.history.currentIndex - 1, data: this.state.history.data.slice()};
        this.setState({tree: newHistory.data[this.state.history.currentIndex - 1], history: newHistory});
        console.log("height", this.state.height);
    }

    onClickReDo() {
        if (this.state.history.currentIndex + 1 >= this.state.history.data.length) return;
        const newHistory = {currentIndex: this.state.history.currentIndex + 1, data: this.state.history.data.slice()};
        this.setState({tree: newHistory.data[this.state.history.currentIndex + 1], history: newHistory});

    }

    componentDidMount() {
        const table = document.getElementById("table");
        this.setState({widthWindow: window.innerWidth});
        this.setState({heightWindow: window.innerHeight});
    }

    render() {


        return (


            <div className="App">
                <MyNavbar/>
                <div className="container">

                    <MyTable tree={this.state.history.data[this.state.history.currentIndex].tree}
                             key={this.state.history.currentIndex}
                             widthWindow={this.state.widthWindow}
                             heightWindow={this.state.heightWindow}
                    />
                    <div className="card-deck">
                        <div className="card border-0">

                            <MyForm onClickInsert={this.onClickInsert} isCheckedRow={this.state.isCheckedRow}
                                    isCheckedCol={this.state.isCheckedCol}/>
                            <ChoiceTable style={{"width": "100px"}} onChoiceTable={this.onChoiceTable}
                                         indexCheckedTable={this.state.indexCheckedTable}/>

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
