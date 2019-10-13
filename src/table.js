import React, {Component} from 'react';
import {sortOfDepth,getDepth} from "./tree";
import './style.css'



class MyTable extends Component {
    constructor(props){
        super(props)


    }

    render() {
        const WIDTH = 100;
        const HEIGHT = 100;
        const tdElements = [];



        const arrayOfDepth = sortOfDepth(this.props.tree);

        for ( let i=1; i < arrayOfDepth.length; i++ ) {

            let tr = <tr key = {'tr'+i}>
                {arrayOfDepth[i].map( (currentNode,index) =>  <td key = {currentNode.value}
                                                                  className=" "
                                                                  rowSpan = {currentNode.VerticalSpan}
                                                                  colSpan={currentNode.children.length||1}
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