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

        const arrayOfDepth = this.state.tree.sortOfDepth();

        let widthElement = (this.props.widthWindow)/arrayOfDepth.length;
        widthElement= (widthElement>150)? 150 : widthElement;
        let heightElement = (this.props.heightWindow - 500)/arrayOfDepth.length;
        heightElement= (heightElement>150)? 150 : heightElement;

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