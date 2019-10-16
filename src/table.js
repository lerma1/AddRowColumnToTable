import React, {Component} from 'react';
import {sortOfDepth, getDepth, traverse, getMaxDepth, hasRow, getParent,getColSpan} from "./tree";
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


        const arrayOfDepth = sortOfDepth(this.state.tree);

        for ( let i=1; i < arrayOfDepth.length; i++ ) {

            let tr = <tr key = {'tr'+i + new Date()}>
                            {arrayOfDepth[i].map( (currentNode) =>  <td key = {currentNode.value}
                              rowSpan = {currentNode.VerticalSpan}
                              colSpan={this.state.tree.getColSpan(currentNode)}
                              style={{"background-color": currentNode.color,
                                  "width": ((currentNode.children.length||1)*WIDTH) + "px",
                                  "height":(currentNode.VerticalSpan*HEIGHT)+ "px"}}
                            >
                                {currentNode.value}
                            </td> )}
                         </tr>;

            tdElements.push(tr);

             }

        return (
            <div className= "container"  >
                <table className= "table-tree h4">

                    {tdElements}

                </table>
            </div>

        );
    }
}

export default MyTable