import React, {Component} from 'react';
import {sortOfDepth,getDepth,traverse,getMaxDepth,hasRow} from "./tree";
import './style.css'



class MyTable extends Component {
    constructor(props){
        super(props)


    }



    render() {
        const WIDTH = 100;
        const HEIGHT = 100;
        const tdElements = [];


        /*Tree.prototype.traverse = function(callback) {
    (function recurse(currentNode) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {  recurse(currentNode.children[i]); }
        callback(currentNode);
    })(this._root);

};*/
        const getColSpan = (node, tree) => {
            let maxDepth = getMaxDepth(tree);
            let countDepthChildren = 0;
            console.log("node", node.value);
            traverse(node, (currentNode) => {if(hasRow(maxDepth,currentNode,tree) ) { countDepthChildren++; console.log("maxDepth",maxDepth,"node",node.value, "currentNode",currentNode.value,"hasRow",hasRow(maxDepth,currentNode,tree));}});

            return countDepthChildren;
        }

        const arrayOfDepth = sortOfDepth(this.props.tree);

        for ( let i=1; i < arrayOfDepth.length; i++ ) {

            let tr = <tr key = {'tr'+i}>
                {arrayOfDepth[i].map( (currentNode,index) =>  <td key = {currentNode.value}
                                                                  className=" "
                                                                  rowSpan = {currentNode.VerticalSpan}
                                                                  colSpan={getColSpan(currentNode,this.props.tree)}
                                                                  style={{"background-color": currentNode.color,
                                                                      "width": ((currentNode.children.length||1)*WIDTH) + "px",
                                                                      "height":(currentNode.VerticalSpan*HEIGHT)+ "px"}}
                                                                >
                                                                    {currentNode.value} Depth:
                                                                    {getDepth(currentNode,this.props.tree)}
                                                                </td> )}
                         </tr>;

            tdElements.push(tr);

             }

        return (
            <div className= "container"  >
                <table className= "table-tree">

                    {tdElements}

                </table>
            </div>

        );
    }
}

export default MyTable