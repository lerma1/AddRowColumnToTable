import React, {Component} from 'react';
import MyTable from "./table";
import MyForm from "./Form"
import History from "./History";
import ChoiceTable from "./ChoiceTable";
import {addСolumn,addRow,addRowComplex} from "./immutable-tree";
import {getMaxValue} from "./tree";
import {tree,easyTree} from "./index";


class App extends Component {
  constructor(props){
    super(props)
      this.onClickHandler = this.onClickHandler.bind(this);
      this.onChoiseTable = this.onChoiseTable.bind(this);
      this.onClickUnDo = this.onClickUnDo.bind(this);
      this.onClickReDo = this.onClickReDo.bind(this);

      this.state = {
          tree: this.props.tree,
          history: this.props.history,
      }
  }

    onClickHandler(){
        let value = Number(document.getElementById("input").value);
        if(value > getMaxValue(this.props.tree)) {alert("Элемент с таким номером не найден!"); return;}

        let history = document.getElementById("history-list");

        let  radio = document.getElementsByName("exampleRadios");
        if(radio[0].checked){
           let newHistory = this.state.history.concat().push({text:"Вставлена строка в ячейку № ${value}", tree: this.state.tree});
           this.setState({tree: addRowComplex(value, this.state.tree), history: newHistory});


        } else    {
            let newHistory = this.state.history.concat().push({text:"Вставлен столбец в ячейку № ${value}", tree: this.state.tree});
            this.setState({tree: addСolumn(value,  this.state.tree), history: newHistory});

        }
    }

    onChoiseTable(){
        let radio = document.getElementsByName("choice-table");
        if(radio[0].checked){
            this.setState({tree: easyTree});
        } else    this.setState({tree: tree});
    }

    onClickUnDo(){

    }

    onClickReDo(){

    }



  render() {
    return (
         <div className="container">
             <div className="App">
            <h1>Вставка столбцов/строк</h1>

            <p><span className="h6" >Задание:   </span>Дана таблица, структура которой представима в виде «дерева». Необходимо реализовать вставку строк и колонок в таблицу в указанной позиции.</p>
             </div>
             <div className="card-deck">
                 <div className="card border-0">
                     <ChoiceTable  style={{"width":"100px"}} onChoiseTable={this.onChoiseTable}/>
                     <MyForm onClickHandler={this.onClickHandler} />
                 </div>
             <History  history = {this.state.history}/>
             </div>
             <MyTable tree={this.state.tree}/>


        </div>
    );
  }
}

export default App;
