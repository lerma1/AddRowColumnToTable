import React, {Component} from 'react';
import MyTable from "./table";
import MyForm from "./form"



class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
         <div className="container">
             <div className="App">
            <h1>Вставка столбцов/строк</h1>

            <p><span className="h6" >Задание:   </span>Дана таблица, структура которой представима в виде «дерева». Необходимо реализовать вставку строк и колонок в таблицу в указанной позиции.</p>
             </div>
             <MyForm/>
             <MyTable tree={this.props.tree}/>

        </div>
    );
  }
}

export default App;
