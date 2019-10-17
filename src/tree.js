import update from 'react-addons-update';


export function Node(data = {value: 0, color: "white", VerticalSpan: 1}) {
    ({value:this.value, color: this.color, VerticalSpan: this.VerticalSpan} = data);
    this.children = [];
}

export function Tree(json, data = {value: 0, color: "white", VerticalSpan: 1} ) {
    if (json) {
        this._root = JSON.parse(json)._root;
    } else {
        let node = new Node(data);
        this._root = node;
    }

}

Tree.prototype.traverse = function (callback) {
    (function recurse(currentNode) {
        for (let i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
        }
        callback(currentNode);
    })(this._root);
};

/**
 * Добавляет новый столбец позицию - слева от выбранной ячейки
 *
 * @param {number} value ячейки, слева от которой будем добавлять столбец
 * @return {tree}  новая таблица с добавленным столбцом
 */
Tree.prototype.addColumn = function(targetValue) {

    let maxValue = this.getMaxValue();
    let currentCell = this.findNode(targetValue);
    const indexesParents = this.getParentsIndex(currentCell);


    for (let i = indexesParents.length - 1; i > -1; i--) {
        if (indexesParents[i] != 0) break;
        currentCell = this.getParent(currentCell);
    }
    const cellForInsert = currentCell;

    let node = new Node({value: ++maxValue, color: "Green", VerticalSpan: 1});
    let currentNode = node;
    for (let i = this.getDepth(cellForInsert ); i < this.getMaxDepth(); i++) {
        currentNode.children.push(new Node({value: ++maxValue, color: "Green", VerticalSpan: 1}));
        currentNode = currentNode.children[0];
    }

    return this.addCellWithShiftRight(node, cellForInsert);
}


/**
 * Добавляет ячейку со сдвигом вправо
 *
 * @param {node} ячейка, слева от которой добавим столбец
 * @param {node} ячейка, которуб будем добавлять
 * @return {tree}  новая таблица с добавленной ячейкой
 */
Tree.prototype.addCellWithShiftRight = function(cell, target) {

    const path = {_root: {children: {}}};
    let currentPath = path._root.children;

    const indexesParents = this.getParentsIndex(target);

    for (let i = 0; i < indexesParents.length - 1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath = currentPath[indexesParents[i]].children;
    }

    currentPath['$splice'] = [[indexesParents[indexesParents.length - 1], 0, cell]];

    return update(this, path);
}

/**
 * Добавляет ячейку со сдвигом вниз
 *
 * @param {node} ячейка, слева от которой добавим столбец
 * @param {node} ячейка, которую будем добавлять
 * @return {tree}  новая таблица с добавленной ячейкой
 */

Tree.prototype.addCellWithShiftDown = function(cell, target) {

    const path = {_root: {children: {}}};
    let currentPath = path._root.children;

    const indexesParents = this.getParentsIndex(target);

    for (let i = 0; i < indexesParents.length - 1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath = currentPath[indexesParents[i]].children;
    }

    currentPath['$splice'] = [[indexesParents.pop(), 1, cell]];

    return update(this, path);
}

/**
 * Увеличивает на единицу VerticalSpan ячейки
 *
 * @param {node} ячейка, спан которой будет увеличен
 * @return {tree}  новая таблица с добавленной ячейкой
 */
Tree.prototype.incrementVerticalSpan = function(target) {
    const path = {_root: {children: {}}};
    let currentPath = path._root.children;

    const indexesParents = this.getParentsIndex(target);

    for (let i = 0; i < indexesParents.length - 1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath = currentPath[indexesParents[i]].children;
    }
    currentPath[indexesParents.pop()] = {
        VerticalSpan: {
            $apply: function (x) {
                return Number(x + 1);
            }
        }
    };
    return update(this, path);
}


/**
 * Добавляет новую строку выше указанной ячейки
 *
 * @param {number} value ячейки, выше которой будем добавлять строку
 * @return {tree}  новая таблица с добавленной ячейкой
 */
Tree.prototype.addRow = function(targetValue) {
    let newTree = update(this,{});
    let maxValue = this.getMaxValue();

    const targetRow = this.getDepth(this.findNode(targetValue)) - 1;
    let cellsToChange = [];
    this.traverse((node) => {
        if (this.hasRow(targetRow, node)) {
            cellsToChange.push(node);
        }
    });

    for (let i = 0; i < cellsToChange.length; i++) {

        if (cellsToChange[i].children.length == 0 || this.hasRow(targetRow + 1, cellsToChange[i])) {

            newTree = newTree.incrementVerticalSpan(cellsToChange[i]);

        } else {

            for (let k = 0; k < cellsToChange[i].children.length; k++) {
                let newCell = new Node({VerticalSpan: 1, color: "Yellow", value: ++maxValue});
                newCell.children = [cellsToChange[i].children[k]];

                newTree = newTree.addCellWithShiftDown(newCell, cellsToChange[i].children[k]);
            }
        }
    }
    return newTree;


}


Tree.prototype.getParent = function(node)  {
    let parent;
    this.traverse((currentNode) => {
        const isParent = currentNode.children.find((item) => {
            return item == node;
        });
        if (isParent != undefined) parent = currentNode;
    });
    return parent;
}

Tree.prototype.getDepth = function(node) {
    let depth = 0;
    let currentNode = node;

    while (currentNode != undefined) {
        currentNode = this.getParent(currentNode);
        if (currentNode) depth += currentNode.VerticalSpan;
    }

    return depth;
}

Tree.prototype.sortOfDepth = function()  {
    let arrayOfDepth = [];
    this.traverse((node) => {
        const depth = this.getDepth(node);
        if (!arrayOfDepth[depth]) arrayOfDepth[depth] = [];
        arrayOfDepth[depth].push(node);

    });
    return arrayOfDepth;
}

Tree.prototype.getMaxDepth = function()  {
    let maxDepth = 0;
    this.traverse((node) => {
        if (this.getDepth(node) > maxDepth) {
            maxDepth = this.getDepth(node);
        }
    });
    return maxDepth;
};

Tree.prototype.getMaxValue = function() {
    let maxValue = 0;
    this.traverse((node) => {
        if (node.value > maxValue) {
            maxValue = node.value;
        }
    });
    return maxValue;
};


Tree.prototype.getParentsIndex = function (node) {
    let arrIndex = [];
    let currentValue = node.value;
    let currentNode = this.getParent(node);

    while (currentNode != undefined) {
        arrIndex.unshift(currentNode.children.findIndex((element) => element.value == currentValue));
        currentValue = currentNode.value;
        currentNode = this.getParent(currentNode);

    }
    return arrIndex;
};

Tree.prototype.findNode = function(value) {
    let foundNode = null;
    this.traverse((node) => {
        if (node.value === value) {
            foundNode = node;
        }
    });
    return (foundNode === null) ? -1 : foundNode;
};

Tree.prototype.getNumbersRow = function (node) {
    let arrRows = [];
    arrRows[0] = this.getDepth(node);
    for (let i = 1; i < node.VerticalSpan; i++) {
        arrRows.push(i + arrRows[0]);
    }
    return arrRows;
}

Tree.prototype.hasRow = function (row, node) {
    let arrRows = this.getNumbersRow(node);

    return (arrRows.findIndex((current) => current == row)) != -1;
}

Tree.prototype.getLowerCells = function () {

    let current = this._root.children[0];
    while (current.children.length != 0) {
        current = current.children[0];
    }
    let Rows = this.getNumbersRow(current);
    let lowerRow = Rows[Rows.length - 1];//нашли самый нижний уровень

    let lowerCells = [];

    this.traverse((node) => {
        if (this.hasRow(lowerRow, node)) lowerCells.push(node);
    })
    return lowerCells;

}


Tree.prototype.isParentOfChild = function (parent, child) {
    let currentNode = child;
    while (this.getParent(currentNode ) != undefined) {
        if (this.getParent(currentNode) == parent) return true;
        currentNode = this.getParent(currentNode );
    }
    return false;
}

Tree.prototype.getColSpan = function (node, arrayOfDepth) {
    let countDepthChildren = 0;
    const lowerCells = this.getLowerCells();

    for (let i = 0; i < lowerCells.length; i++) {
        if (this.isParentOfChild(node, lowerCells[i])) {
            countDepthChildren++;
        }
    }
    return countDepthChildren;
}