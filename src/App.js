import React, {Component} from 'react';
import MyTable from "./table";
import MyForm from "./form"
import {addСolumn,addRow} from "./immutable-tree";
import {getMaxValue} from "./tree";
import {tree,easyTree} from "./index";


class App extends Component {
  constructor(props){
    super(props)
      this.onClickHandler = this.onClickHandler.bind(this);
      this.onChoiseTable = this.onChoiseTable.bind(this);

      this.state = {
          tree: this.props.tree
      }
  }

    onClickHandler(){
        let value = Number(document.getElementById("input").value);
        if(value > getMaxValue(this.props.tree)) {alert("Элемент с таким номером не найден!"); return;}

        let  radio = document.getElementsByName("exampleRadios");
        if(radio[0].checked){
            this.setState({tree: addRow(value, this.state.tree)});
        } else    this.setState({tree: addСolumn(value, this.state.tree)});
    }

    onChoiseTable(){
        let radio = document.getElementsByName("choice-table");
        if(radio[0].checked){
            this.setState({tree: easyTree});
        } else    this.setState({tree: tree});
    }


  render() {
    return (
         <div className="container">
             <div className="App">
            <h1>Вставка столбцов/строк</h1>

            <p><span className="h6" >Задание:   </span>Дана таблица, структура которой представима в виде «дерева». Необходимо реализовать вставку строк и колонок в таблицу в указанной позиции.</p>
             </div>
             <MyForm onClickHandler={this.onClickHandler} onChoiseTable={this.onChoiseTable}/>
             <MyTable tree={this.state.tree}/>

        </div>
    );
  }
}

export default App;
