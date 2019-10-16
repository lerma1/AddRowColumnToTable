import {
    Node,
    getMaxDepth,
    getMaxValue,
    findNode,
    getParent,
    getSiblings,
    getDepth,
    Tree
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
export  function addСolumn(targetValue, tree) {

    let maxValue = getMaxValue(tree);
    let target = findNode(targetValue,tree);

    let indexesParents = tree.getParentsIndex(target);

    console.log("addСolumn:indexesParents",indexesParents);

    let currentCell =  target;

    let targetNumber = 0; //тут плохое название для него это номер по порядку от родлителя той ячейки, куда будем вставлять
    for( let i = indexesParents.length-1; i > -1 ; i--){ if(indexesParents[i] != 0) { targetNumber =  i; break; }}
    let upperParent = tree._root.children[indexesParents[0]];
    let newNode;
    console.log("targetNumber ",targetNumber);
    if(targetNumber>0) { //если таргет не в верхнем ряду. а если в верхнем?
        newNode = new Node({value: upperParent.value, color: "Green", VerticalSpan: upperParent.VerticalSpan});
        newNode.children = upperParent.children;
    }
    let cellForInsert = upperParent;
    //мы должны пойти по детям этого узла, пока не дойдем до targetIndex
    for( let i = 1; i <= targetNumber ; i++){
        cellForInsert = cellForInsert.children[indexesParents[i]];
    }

  //  console.log("targetIndex ",targetIndex, " indexesParents ", indexesParents);// нашли того, куда будем вставлять новый столбец

console.log("cellForInsert ",cellForInsert, " upperParent ", upperParent);// нашли того, куда будем вставлять новый столбец


//гененрируем новые узлы для вставки
        let node = new Node({value: ++maxValue, color: "Green", VerticalSpan: 1});
        let currentNode = node;
        for(let i = getDepth(cellForInsert,tree); i < getMaxDepth(tree); i++){
            currentNode.children.push(new Node({value: ++maxValue, color: "Green", VerticalSpan: 1}));
            currentNode =  currentNode.children[0];
        }

     cellForInsert.children.splice(indexesParents[targetNumber],0,node);

            console.log("addСolumn, cellForInsert, tree ", node.value, " ",cellForInsert.value, " ",tree);
            let newTree = addCellWithShiftRight(newNode, upperParent, tree ); // что я сюда передаю? я передаю узел, который надо вставить правее чем current. либо узел, который надо заменить текущий

            console.log("addСolumn, newTree: ", newTree);

            return newTree;
            //можно было сделать так: вставить все как вчера было, а потом скопировать верзний узел и обновить его по другой функции.

}


/**
 * Добавляет ячейку cell в ячейку target
 *
 * @param {cell}
 * @param {target}
 * @return {tree}  новая таблица с добавленной ячейкой
 */
export  function addCellWithShiftRight(cell, target, tree) {
    console.log("addCellWithShiftRight,target",target.value);
    let path =  {_root: {children:{}}};
    let currentPath = path._root.children;

    let indexesParents = tree.getParentsIndex(target);

    for(let i = 0; i < indexesParents.length-1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath =  currentPath[indexesParents[i]].children;
    }
    console.log("indexesParents",indexesParents);
    currentPath['$splice'] = [[indexesParents[indexesParents.length-1], 0, cell]];
console.log("addCellWithShiftRight",path);
    return update(tree, path);
}
/*рабочая
export  function addCellWithShiftRight(cell, target, tree) {
    console.log("addCellWithShiftRight,target",target.value);
    let path =  {_root: {children:{}}};
    let currentPath = path._root.children;

    let indexesParents = tree.getParentsIndex(target);

    for(let i = 0; i < indexesParents.length-1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath =  currentPath[indexesParents[i]].children;
    }
    console.log("indexesParents",indexesParents);
    currentPath['$splice'] = [[indexesParents[indexesParents.length-1], 0, cell]];
    console.log("addCellWithShiftRight",path);
    return update(tree, path);
}
*/
export  function addCellWithShiftDown(cell, target, tree) {

    let path =  {_root: {children:{}}};
    let currentPath = path._root.children;

    let indexesParents = tree.getParentsIndex(target);

    for(let i = 0; i < indexesParents.length-1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath =  currentPath[indexesParents[i]].children;
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
export  function incrementVerticalSpan(target, tree) {
    let path =  {_root: {children:{}}};
    let currentPath = path._root.children;

    let indexesParents = tree.getParentsIndex(target);

    for(let i = 0; i < indexesParents.length-1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath =  currentPath[indexesParents[i]].children;
    }
     currentPath[indexesParents.pop()] = {VerticalSpan:{$apply: function(x) {return Number(x + 1);}}};
     return update(tree, path);
}
/**
 * Добавляет новую строку в ячейку target
 *
 * @param {target}
 * @return {tree}  новая таблица с добавленной ячейкой
 */
export  function addRow(targetValue, tree) {
    let newTree = update(tree,{});
    let maxValue = getMaxValue(tree);
    let targetRow = getDepth(findNode(targetValue,tree), tree) - 1;
    let cellsToChange = [];
    tree.traverse((node) => {if (tree.hasRow(targetRow, node) ) {cellsToChange.push(node);}});

    for(let i = 0; i < cellsToChange.length; i++) {

        if (cellsToChange[i].children.length == 0 || tree.hasRow(targetRow + 1, cellsToChange[i])) {

            newTree = incrementVerticalSpan(cellsToChange[i], newTree);

        } else {


           for( let k = 0; k < cellsToChange[i].children.length; k++){
               let newCell = new Node ({VerticalSpan: 1, color: "Yellow",value: ++maxValue });
               newCell.children = [cellsToChange[i].children[k]];

              newTree = addCellWithShiftDown(newCell, cellsToChange[i].children[k], newTree);

            }



        }
    }

    return newTree;


}