import {
    Node,
    getMaxDepth,
    getMaxValue,
    findNode,
    getParent,
    getDepth,
} from "./tree";
import update from 'react-addons-update';


/**
 * Добавляет новый столбец в ячейку c  номером target
 *
 * @param {value} value - ячейка, в которую будем добавлять столбец
 * @param {tree} tree дерево, куда будем добавлять
 * @return {tree} newTree, новая таблица с добавленным столбцом
 */
;

export function addСolumn(targetValue, tree) {

    let maxValue = getMaxValue(tree);
    let target = findNode(targetValue, tree);
    let indexesParents = tree.getParentsIndex(target);
    let currentCell = target;

    for (let i = indexesParents.length - 1; i > -1; i--) {
        if (indexesParents[i] != 0) break;
        currentCell = getParent(currentCell, tree);
    }
    let cellForInsert = currentCell;

    let node = new Node({value: ++maxValue, color: "Green", VerticalSpan: 1});
    let currentNode = node;
    for (let i = getDepth(cellForInsert, tree); i < getMaxDepth(tree); i++) {
        currentNode.children.push(new Node({value: ++maxValue, color: "Green", VerticalSpan: 1}));
        currentNode = currentNode.children[0];
    }

    let newTree = addCellWithShiftRight(node, cellForInsert, tree);
    return newTree;
}


/**
 * Добавляет ячейку cell в ячейку target
 *
 * @param {cell}
 * @param {target}
 * @return {tree}  новая таблица с добавленной ячейкой
 */
export function addCellWithShiftRight(cell, target, tree) {

    let path = {_root: {children: {}}};
    let currentPath = path._root.children;

    let indexesParents = tree.getParentsIndex(target);

    for (let i = 0; i < indexesParents.length - 1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath = currentPath[indexesParents[i]].children;
    }

    currentPath['$splice'] = [[indexesParents[indexesParents.length - 1], 0, cell]];

    return update(tree, path);
}

export function addCellWithShiftDown(cell, target, tree) {

    let path = {_root: {children: {}}};
    let currentPath = path._root.children;

    let indexesParents = tree.getParentsIndex(target);

    for (let i = 0; i < indexesParents.length - 1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath = currentPath[indexesParents[i]].children;
    }

    currentPath['$splice'] = [[indexesParents.pop(), 1, cell]];

    return update(tree, path);
}

/**
 * Увеличивает на 1 VerticalSpan ячейки target
 *
 * @param {target}
 * @return {tree}  новая таблица с добавленной ячейкой
 */
export function incrementVerticalSpan(target, tree) {
    let path = {_root: {children: {}}};
    let currentPath = path._root.children;

    let indexesParents = tree.getParentsIndex(target);

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
    return update(tree, path);
}

/**
 * Добавляет новую строку в ячейку target
 *
 * @param {target}
 * @return {tree}  новая таблица с добавленной ячейкой
 */
export function addRow(targetValue, tree) {
    let newTree = update(tree, {});
    let maxValue = getMaxValue(tree);
    let targetRow = getDepth(findNode(targetValue, tree), tree) - 1;
    let cellsToChange = [];
    tree.traverse((node) => {
        if (tree.hasRow(targetRow, node)) {
            cellsToChange.push(node);
        }
    });

    for (let i = 0; i < cellsToChange.length; i++) {

        if (cellsToChange[i].children.length == 0 || tree.hasRow(targetRow + 1, cellsToChange[i])) {

            newTree = incrementVerticalSpan(cellsToChange[i], newTree);

        } else {


            for (let k = 0; k < cellsToChange[i].children.length; k++) {
                let newCell = new Node({VerticalSpan: 1, color: "Yellow", value: ++maxValue});
                newCell.children = [cellsToChange[i].children[k]];

                newTree = addCellWithShiftDown(newCell, cellsToChange[i].children[k], newTree);

            }
        }
    }

    return newTree;


}