import React, {Component} from 'react';
import {sortOfDepth} from "../tree";
import '../css/style.css'


class MyTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tree: this.props.tree,
        }
    }


    render() {
        const tdElements = [];
        const WIDTH = 900;
        const HEIGHT = 400;
        const arrayOfDepth = this.state.tree.sortOfDepth();

        let widthElement = WIDTH/arrayOfDepth[arrayOfDepth.length-1].length;//еще тут нужно на нужное количество делить
        let heightElement = HEIGHT/ this.props.tree.getMaxDepth();

        for (let i = 1; i < arrayOfDepth.length; i++) {

            let tr = <tr key={'tr' + i + new Date()}>
                {arrayOfDepth[i].map((currentNode) => <td key={currentNode.value}
                                                          rowSpan={currentNode.VerticalSpan}
                                                          colSpan={this.state.tree.getColSpan(currentNode)}
                                                          style={{
                                                              "background-color": currentNode.color,
                                                              "width": ((currentNode.children.length || 1) * widthElement) + "px",
                                                              "height": (currentNode.VerticalSpan * heightElement) + "px"
                                                          }}
                >
                    {currentNode.value}
                </td>)}
            </tr>;

            tdElements.push(tr);
        }

        return (
            <div className="container " id = "table">
                <table className="table-tree h4">
                    {tdElements}
                </table>
            </div>

        );
    }
}

export default MyTable