import {Node,getMaxDepth,getMaxValue,getParentsIndex,findNode,getParent} from "./tree";
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

      let arrayIndexs = getParentsIndex(getParent(node,tree));
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
 * Удоляет node
 *
 * @param {value} value - ячейка, которую будем удалять
 * @param {tree} tree дерево, куда будем добавлять
 * @return {tree} newTree, новая таблица с добавленным узлом
 */
export  function deleteNode(value, tree) {

    let parent;

    const findParent = (node) => { if (node.value === value) {parent = node;} };
    const getParentsIndex = (node) => {
        let arrIndex = [];
        let currentNode = node;

       /* while(currentNode.parent != null) {
            let currentValue = currentNode.value;
            currentNode = currentNode.parent;
            arrIndex.unshift(currentNode.children.findIndex((element, index, array) => element.value === currentValue ));
        }*/
        return arrIndex;
    }

    tree.traverse(findParent); // теперь в parent храниться родитель

    let arrayIndexs = getParentsIndex(parent);
    let processedData = {_root: {children:{}}};
    let currentPrData = processedData._root.children; //указывает на пустой массив

    for(let i = 0; i < arrayIndexs.length-1; i++){
        currentPrData[arrayIndexs[i]] = {children: {}}; //
        currentPrData =  currentPrData[arrayIndexs[i]].children;
    }
    currentPrData['$splice']= [[arrayIndexs[arrayIndexs.length-1],1]];
    console.log(processedData);
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
    let node = new Node({value: ++maxValue, color: "Gold", VerticalSpan: 1, parent: findNode(0, tree)});

    let currentNode = node;
    for(let i = 1; i < getMaxDepth(tree); i++){

        currentNode.children.push(new Node({value: ++maxValue, color: "Gold", VerticalSpan: 1}));

        //currentNode.children[0].parent = currentNode;
        currentNode =  currentNode.children[0];
    }
    //в узле 0 нет ссылки на новый узел? надо поменять парента у всех старых узлов?

    let arrayIndexs = getParentsIndex(value,tree);

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
 */
export  function addRow(value, tree) {
    let newTree;
// собрать всех соседей того же уровня что и родители (можно использовать старую функцию)
    //строку добавляем выше!
//для каждого соседа родителя и для родителя:
    //берем детей
    //для каждого ребенка
            // //создаем новый узел с тем же rowspan - иначе получится таблица, не представимая в виде дерева
            //добавляем в дети этому узлу ребенка
            //добавляем в дети родителя новый узел вместо ребенка (splice?)




    return newTree;


}