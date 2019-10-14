import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Tree} from "./tree";
import {addСolumn,addRow} from "./immutable-tree"


export var tree = new Tree({value:0, color:"White", VerticalSpan: 1});
let testTree = () =>{
    tree.add({value: 1, color: "Orange", VerticalSpan: 1}, 0, tree.traverse);
    tree.add({value: 2, color: "Orange", VerticalSpan: 1}, 0, tree.traverse);
    tree.add({value: 3, color: "Orange", VerticalSpan: 2}, 0, tree.traverse);
    tree.add({value: 4, color: "Green", VerticalSpan: 1}, 1, tree.traverse);
    tree.add({value: 5, color: "Green", VerticalSpan: 1}, 1, tree.traverse);
    tree.add({value: 6, color: "Green", VerticalSpan: 2}, 2, tree.traverse);
    tree.add({value: 7, color: "Purple", VerticalSpan: 1}, 4, tree.traverse);
    tree.add({value: 8, color: "Purple", VerticalSpan: 1}, 5, tree.traverse);
    tree.add({value: 9, color: "Purple", VerticalSpan: 1}, 3, tree.traverse);
    tree.add({value: 10, color: "Purple", VerticalSpan: 1}, 3, tree.traverse);
};
export var complexTree = new Tree({value:0, color:"White", VerticalSpan: 1});
let testComplexTree = () =>{
    complexTree.add({value: 1, color: "Coral", VerticalSpan: 2}, 0, complexTree.traverse);
    complexTree.add({value: 2, color: "Coral", VerticalSpan: 1}, 0, complexTree.traverse);
    complexTree.add({value: 3, color: "Coral", VerticalSpan: 1}, 0, complexTree.traverse);
    complexTree.add({value: 4, color: "Coral", VerticalSpan: 3}, 0, complexTree.traverse);
    complexTree.add({value: 5, color: "LightGreen", VerticalSpan: 1}, 2, complexTree.traverse);
    complexTree.add({value: 6, color: "LightGreen", VerticalSpan: 1}, 2, complexTree.traverse);
    complexTree.add({value: 7, color: "LightGreen", VerticalSpan: 2}, 3, complexTree.traverse);
    complexTree.add({value: 8, color: "MediumPurple", VerticalSpan: 1}, 1, complexTree.traverse);
    complexTree.add({value: 9, color: "MediumPurple", VerticalSpan: 1}, 5, complexTree.traverse);
    complexTree.add({value: 10, color: "MediumPurple", VerticalSpan: 1}, 5, complexTree.traverse);
    complexTree.add({value: 11, color: "MediumPurple", VerticalSpan: 2}, 6, complexTree.traverse);
    complexTree.add({value: 12, color: "CornflowerBlue", VerticalSpan: 1}, 8, complexTree.traverse);
    complexTree.add({value: 13, color: "CornflowerBlue", VerticalSpan: 1}, 9, complexTree.traverse);
    complexTree.add({value: 14, color: "CornflowerBlue", VerticalSpan: 1}, 10, complexTree.traverse);
    complexTree.add({value: 15, color: "CornflowerBlue", VerticalSpan: 1}, 7, complexTree.traverse);
    complexTree.add({value: 16, color: "CornflowerBlue", VerticalSpan: 1}, 7, complexTree.traverse);
    complexTree.add({value: 17, color: "CornflowerBlue", VerticalSpan: 1}, 4, complexTree.traverse);
};
testComplexTree();
export var easyTree = new Tree({value:0, color:"White", VerticalSpan: 1});
let testEasyTree = () =>{
    easyTree.add({value: 1, color: "Coral", VerticalSpan: 1}, 0, easyTree.traverse);
    easyTree.add({value: 2, color: "Coral", VerticalSpan: 1}, 0, easyTree.traverse);
    easyTree.add({value: 3, color: "Coral", VerticalSpan: 1}, 0, easyTree.traverse);
    easyTree.add({value: 4, color: "Coral", VerticalSpan: 1}, 0, easyTree.traverse);
    easyTree.add({value: 5, color: "LightGreen", VerticalSpan: 1}, 1, easyTree.traverse);
    easyTree.add({value: 6, color: "LightGreen", VerticalSpan: 1}, 2, easyTree.traverse);
    easyTree.add({value: 7, color: "LightGreen", VerticalSpan: 1}, 3, easyTree.traverse);
    easyTree.add({value: 8, color: "LightGreen", VerticalSpan: 1}, 4, easyTree.traverse);
    easyTree.add({value: 9, color: "MediumPurple", VerticalSpan: 1}, 5, easyTree.traverse);
    easyTree.add({value: 10, color: "MediumPurple", VerticalSpan: 1}, 6, easyTree.traverse);
    easyTree.add({value: 11, color: "MediumPurple", VerticalSpan: 1}, 7, easyTree.traverse);
    easyTree.add({value: 12, color: "MediumPurple", VerticalSpan: 1}, 8, easyTree.traverse);
    easyTree.add({value: 13, color: "CornflowerBlue", VerticalSpan: 1}, 9, easyTree.traverse);
    easyTree.add({value: 14, color: "CornflowerBlue", VerticalSpan: 1}, 10, easyTree.traverse);
    easyTree.add({value: 15, color: "CornflowerBlue", VerticalSpan: 1}, 11, easyTree.traverse);
    easyTree.add({value: 16, color: "CornflowerBlue", VerticalSpan: 1}, 12, easyTree.traverse);

};
testTree();
testEasyTree();
console.log(complexTree);


ReactDOM.render(<App tree={complexTree} />, document.getElementById('root'));


