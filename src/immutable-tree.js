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
 * Добавляет node как дочерний узел parentNode
 *
 * @param {object} data данные для элемента, который будем добавлять в дерево
 * @param {number} valueParentNode номер родительского узла, куда будем добавлять
 * @param {tree} tree дерево, куда будем добавлять
 * @return {tree} newTree, новая таблица с добавленным узлом
 */
export  function addNode(data, valueParentNode, tree) {
    let node = new Node(data);
    node.value = 1 +  getMaxValue(tree);
    //node.parent = findNode(valueParentNode, tree);

      let arrayIndexs = tree.getParentsIndex(getParent(node));
      let processedData = {_root: {children:{}}};
      let currentPrData = processedData._root.children; //указывает на пустой массив

     for(let i = 0; i < arrayIndexs.length; i++){
        currentPrData[arrayIndexs[i]] = {children: {}}; //
        currentPrData =  currentPrData[arrayIndexs[i]].children;
    }
     currentPrData['$push']= [node];

    let newTree = update(tree, processedData);



     return newTree;
}


/**
 * Добавляет новый столбец в ячейку value
 *
 * @param {value} value - ячейка, в которую будем добавлять столбец
 * @param {tree} tree дерево, куда будем добавлять
 * @return {tree} newTree, новая таблица с добавленным столбцом
 */
export  function addСolumn(value, tree) {

    let maxValue = getMaxValue(tree);
    let node = new Node({value: ++maxValue, color: "Gold", VerticalSpan: 1});

    let currentNode = node;
    for(let i = 1; i < getMaxDepth(tree); i++){

        currentNode.children.push(new Node({value: ++maxValue, color: "Gold", VerticalSpan: 1}));

        currentNode =  currentNode.children[0];
    }

    let arrayIndexs = tree.getParentsIndex(value);
    let processedData = {_root: {children:{$splice: [[arrayIndexs[0],0, node]]}}};

    let newTree = update(tree, processedData);
    console.log("addСolumn, newTree: ", newTree);
    return newTree;

}

/**
 * Добавляет новую строку в ячейку value
 *
 * @param {value} value - ячейка, в которую будем добавлять строку
 * @param {tree} tree дерево, куда будем добавлять
 * @return {tree} newTree, новая таблица с добавленной строкой
 *//*
export  function addRow(value, tree) {
     let processedData =  {_root: {children:{}}};

   let maxValue = getMaxValue(tree);
    let siblings = getSiblings(value, tree);
    console.log("siblings", siblings );

    for(let i = 0; i < siblings.length; i++) {
        let arrayParentsIndex = tree.getParentsIndex(siblings[i].value);
        var currentData = processedData._root.children;
        console.log("arrayParentsIndex", siblings[i].value, arrayParentsIndex );
        let node = new Node ({VerticalSpan: siblings[i].VerticalSpan, color: "Aqua",value: ++maxValue });
        node.children = getParent(siblings[i],tree).children;
        console.log("node ", siblings[i].value, node );

        for(let j = 0; j < arrayParentsIndex.length-1; j++) {

            currentData[arrayParentsIndex[j]] = {children: {}};
            currentData =  currentData[arrayParentsIndex[j]].children;
        }
        currentData['$splice'] = [[arrayParentsIndex[arrayParentsIndex.length-1],1,node]];
    }

    console.log(processedData);
    let newTree = update(tree, processedData);
    return newTree;


}*/

/**
 * Добавляет новую строку в ячейку value ДЛЯ СЛОЖНОЙ ТАБЛИЦЫ*/
    export  function addRowComplex(value, tree) {
        let processedData =  {_root: {children:{}}};
    var currentData;
          let maxValue = getMaxValue(tree);


    let targetNode = findNode(value,tree);
    let targetDepth = getDepth(targetNode, tree);

        let siblingsParents = getSiblings(getParent(targetNode,tree).value,tree);
     console.log("siblings", siblingsParents );

     for(let i = 0; i < siblingsParents.length; i++){

         let parentDepth = getDepth(siblingsParents[i].children[0], tree);

         //увеличиваем VS кому нужно
         if(siblingsParents[i].children.length == 0 || targetDepth < parentDepth  ) {
             let arrayParentsIndex = tree.getParentsIndex(siblingsParents[i].value);
              currentData = processedData._root.children;

             for(let j = 0; j < arrayParentsIndex.length-1; j++) {

                 currentData[arrayParentsIndex[j]] = {children: {}};
                 currentData =  currentData[arrayParentsIndex[j]].children;
             }
             currentData[arrayParentsIndex[arrayParentsIndex.length-1]] = {VerticalSpan:{$apply: function(x) {return x + 1;}}};

         } else {
             //тут мы добавляем новые ячейки
             //новые ячейки мы куда добавляем? в siblingsParents[i]
             let arrayParentsIndex = tree.getParentsIndex(siblingsParents[i].value);
             currentData = processedData._root.children;

             let arrNewNode = [];
             for( let k = 0; k < siblingsParents[i].children.length; k++){
                 arrNewNode[k] = new Node ({VerticalSpan: 1, color: "Aqua",value: ++maxValue });
                 arrNewNode[k].children[0] = siblingsParents[i].children[k];
             }

//вот тут мы должны сгрупировать $splice нужно сформировать массив чего и куда вставлять
             for(let j = 0; j < arrayParentsIndex.length; j++) {

                 currentData[arrayParentsIndex[j]] = {children: {}};
                 currentData =  currentData[arrayParentsIndex[j]].children;
             }
             currentData['$splice'] = [[0,arrNewNode.length,...arrNewNode]];
             console.log(siblingsParents[i].value);
         }



         }

    console.log("processedData", processedData);
    let newTree = update(tree, processedData);
    return newTree;

     }
    /*
         for(let i = 0; i < siblings.length; i++) {
             let arrayParentsIndex = getParentsIndex(siblings[i].value, tree);
             var currentData = processedData._root.children;
             console.log("arrayParentsIndex", siblings[i].value, arrayParentsIndex );
             let node = new Node ({VerticalSpan: siblings[i].VerticalSpan, color: "Aqua",value: ++maxValue });
             node.children = getParent(siblings[i],tree).children;
             console.log("node ", siblings[i].value, node );

             for(let j = 0; j < arrayParentsIndex.length-1; j++) {

                 currentData[arrayParentsIndex[j]] = {children: {}};
                 currentData =  currentData[arrayParentsIndex[j]].children;
             }
             currentData['$splice'] = [[arrayParentsIndex[arrayParentsIndex.length-1],1,node]];
         }

         console.log(processedData);




    let newTree = update(tree, processedData);
    return newTree;


}*/




/**
 * Добавляет ячейку cell в ячейку target
 *
 * @param {cell}
 * @param {target}
 * @return {tree}  новая таблица с добавленной ячейкой
 */
export  function addCell(cell, target, tree) {

    let path =  {_root: {children:{}}};
    let currentPath = path._root.children;

    let indexesParents = tree.getParentsIndex(target);

    for(let i = 0; i < indexesParents.length-1; i++) {
        currentPath[indexesParents[i]] = {children: {}};
        currentPath =  currentPath[indexesParents[i]].children;
    }

    currentPath['$splice'] = [[indexesParents.pop(), 1, cell]];
    console.log("addCell, path ",target.value, "  ", path)
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
    console.log("incrementVerticalSpan, indexesParents.pop()",indexesParents.pop());
    console.log("incrementVerticalSpan, path",path);
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
            console.log("incrementVerticalSpan ",cellsToChange[i].value)
            newTree = incrementVerticalSpan(cellsToChange[i], newTree);
            console.log("incrementVerticalSpan,newTree ",newTree)
        } else {
            console.log("addCell ",cellsToChange[i].value)

           for( let k = 0; k < cellsToChange[i].children.length; k++){
               let newCell = new Node ({VerticalSpan: 1, color: "Yellow",value: ++maxValue });
               newCell.children = [cellsToChange[i].children[k]];

              newTree = addCell(newCell, cellsToChange[i].children[k], newTree);
               console.log("addCell,newTree ",newTree)
            }



        }
    }
console.log("addRow,newTree",newTree);
    return newTree;


}