import React, {Component} from 'react';
import {sortOfDepth,getDepth,traverse,getMaxDepth,hasRow} from "./tree";
import './style.css'



class MyTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            tree: this.props.tree,
        }
    }



    render() {
        const WIDTH = 100;
        const HEIGHT = 100;
        const tdElements = [];


        const getColSpan = (node, tree) => {
            let countDepthChildren = 1;
            traverse(node, (currentNode) => {if(currentNode.children.length>1)  { countDepthChildren++;}});
            return countDepthChildren;
        }

        const arrayOfDepth = sortOfDepth(this.state.tree);

        for ( let i=1; i < arrayOfDepth.length; i++ ) {

            let tr = <tr key = {'tr'+i}>
                            {arrayOfDepth[i].map( (currentNode,index) =>
                            <td key = {currentNode.value}
                              rowSpan = {currentNode.VerticalSpan}
                              colSpan={getColSpan(currentNode,this.state.tree)}
                              style={{"background-color": currentNode.color,
                                  "width": ((currentNode.children.length||1)*WIDTH) + "px",
                                  "height":(currentNode.VerticalSpan*HEIGHT)+ "px"}}
                            >
                                {currentNode.value} Depth:
                                {getDepth(currentNode,this.state.tree)} NumbersRow:
                                {this.state.tree.getNumbersRow(currentNode)}
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