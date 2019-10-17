import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {Tree} from "./tree";
import {jsonTree1, jsonTree2,jsonTree3} from "./examples-table";


export const tree1 = new Tree(jsonTree1);
export const tree2 = new Tree(jsonTree2);
export const tree3 = new Tree(jsonTree3);

const history = {currentIndex: 0, data: [{text: "Создана таблица №3", tree: tree3}]};
ReactDOM.render(<App history={history}/>, document.getElementById('root'));


