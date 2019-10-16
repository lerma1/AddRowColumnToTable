import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {Tree} from "./tree";
import {jsonTree1, jsonTree2} from "./examples-table";


export const tree1 = new Tree();
tree1._root = JSON.parse(jsonTree1)._root;
export const tree2 = new Tree();
tree2._root = JSON.parse(jsonTree2)._root;


const history = {currentIndex: 0, data: [{text: "Создана таблица №2", tree: tree2}]};
ReactDOM.render(<App history={history}/>, document.getElementById('root'));


