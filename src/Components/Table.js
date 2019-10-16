import React, {Component} from 'react';
import {sortOfDepth} from "../tree";
import Popover from "react-bootstrap/Popover";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
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

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Вставить строку</Popover.Title>
                <Popover.Title as="h3">Вставить столбец</Popover.Title>
            </Popover>
        );

        const arrayOfDepth = this.state.tree.sortOfDepth();


        let widthElement = WIDTH/arrayOfDepth[arrayOfDepth.length-1].length;//еще тут нужно на нужное количество делить
        let heightElement = HEIGHT/ this.props.tree.getMaxDepth();

        for (let i = 1; i < arrayOfDepth.length; i++) {

            let tr = <tr key={'tr' + i + new Date()}>
                {arrayOfDepth[i].map((currentNode) =>
                    <OverlayTrigger trigger="click" placement="right" overlay={
                        <Tooltip id={`tooltip-right`}>
                            <button id={currentNode.value} onClick={this.props.onClickCellInsertRow} className="btn btn-outline-light border-0 d-block">Вставить строку</button>
                            <button id={currentNode.value} onClick={this.props.onClickCellInsertCol} className="btn btn-outline-light border-0 d-block">Вставить столбец</button>
                        </Tooltip>
                    } key={currentNode.value}><td key={currentNode.value}
                                                          rowSpan={currentNode.VerticalSpan}
                                                          colSpan={this.state.tree.getColSpan(currentNode)}
                                                          style={{
                                                              "background-color": currentNode.color,
                                                              "width": ((currentNode.children.length || 1) * widthElement) + "px",
                                                              "height": (currentNode.VerticalSpan * heightElement) + "px"
                                                          }}
                >
                    {currentNode.value}
                </td></OverlayTrigger>)}
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