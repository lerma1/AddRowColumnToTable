import React, {Component} from 'react';
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import '../css/style.css'


class MyTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tree: this.props.tree,
            widthWindow: 900,
            heightWindow: 1080,
        }
    }

    componentDidMount() {
        this.setState({widthWindow: window.innerWidth});
        this.setState({heightWindow: window.innerHeight});
    }

    render() {
        const tdElements = [];

        const arrayOfDepth = this.state.tree.sortOfDepth();

        let widthElement = this.state.widthWindow*0.75/arrayOfDepth[arrayOfDepth.length-1].length;
        let heightElement = this.state.heightWindow*0.35/ this.props.tree.getMaxDepth();

        for (let i = 1; i < arrayOfDepth.length; i++) {

            let tr = <tr key={'tr' + i + new Date()}>
                {arrayOfDepth[i].map((currentNode) =>
                    <OverlayTrigger trigger="click" placement="right" overlay={
                        <Tooltip  id={`tooltip-right`}  >
                            <button id={currentNode.value} onClick={this.props.onClickCellInsertRow} className="btn btn-outline-light border-0 d-block ">Вставить строку</button>
                            <button id={currentNode.value} onClick={this.props.onClickCellInsertCol} className="btn btn-outline-light border-0 d-block">Вставить столбец</button>
                        </Tooltip>
                    } key={currentNode.value}>
                        <td key={currentNode.value}
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