import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {Tree} from "./tree";
import {jsonTree1, jsonTree2,jsonTree3} from "./examples-table";


export const tree1 = new Tree();
tree1._root = JSON.parse(jsonTree1)._root;
export const tree2 = new Tree();
tree2._root = JSON.parse(jsonTree2)._root;
export const tree3 = new Tree();
tree3._root = JSON.parse(jsonTree3)._root;


const history = {currentIndex: 0, data: [{text: "Создана таблица №3", tree: tree3}]};
ReactDOM.render(<App history={history}/>, document.getElementById('root'));


