import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Tree} from "./tree";
import {addNode} from "./immutable-tree"


var tree = new Tree({value:0, color:"White", VerticalSpan: 1});
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
var treeEasy = new Tree({value:0, color:"White", VerticalSpan: 1});
let testEasyTree = () =>{
    treeEasy.add({value: 1, color: "Orange", VerticalSpan: 1}, 0, tree.traverse);
    treeEasy.add({value: 2, color: "Orange", VerticalSpan: 1}, 0, tree.traverse);
    treeEasy.add({value: 3, color: "Orange", VerticalSpan: 1}, 0, tree.traverse);
    treeEasy.add({value: 4, color: "Green", VerticalSpan: 1}, 1, tree.traverse);
    treeEasy.add({value: 5, color: "Green", VerticalSpan: 1}, 2, tree.traverse);
    treeEasy.add({value: 6, color: "Green", VerticalSpan: 1}, 3, tree.traverse);
    treeEasy.add({value: 7, color: "Purple", VerticalSpan: 1}, 4, tree.traverse);
    treeEasy.add({value: 8, color: "Purple", VerticalSpan: 1}, 5, tree.traverse);
    treeEasy.add({value: 9, color: "Purple", VerticalSpan: 1}, 6, tree.traverse);

};
testTree();
testEasyTree();
console.log(tree);
/*let json = JSON.stringify(tree, function replacer(key, value) {
    return (key == 'parent') ? undefined : value;
});

console.log(json);*/

let newTree = addNode ({value: 12, color: "Red", VerticalSpan: 1}, 8, tree);
 newTree = addNode ({value: 12, color: "Red", VerticalSpan: 1}, 7, newTree);



ReactDOM.render(<App tree={newTree} />, document.getElementById('root'));


