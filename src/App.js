import React, {Component} from 'react';
import MyTable from "./table";
import MyForm from "./form"
import {addСolumn} from "./immutable-tree";



class App extends Component {
  constructor(props){
    super(props)
      this.onClickHandler = this.onClickHandler.bind(this);

      this.state = {
          tree: this.props.tree
      }
  }

    onClickHandler(){
        let value = Number(document.getElementById("input").value);
        console.log("before update",this.state.tree);

        this.setState({tree: addСolumn(value, this.state.tree)});
        console.log("after update",this.state.tree);

    }
  render() {
    return (
         <div className="container">
             <div className="App">
            <h1>Вставка столбцов/строк</h1>

            <p><span className="h6" >Задание:   </span>Дана таблица, структура которой представима в виде «дерева». Необходимо реализовать вставку строк и колонок в таблицу в указанной позиции.</p>
             </div>
             <MyForm onClickHandler={this.onClickHandler}/>
             <MyTable tree={this.state.tree}/>

        </div>
    );
  }
}

export default App;
