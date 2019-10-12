import {Node} from "./tree";
import update from 'react-addons-update';
import {getDepth} from "./tree";


/**
 * Добавляет node как дочерний узел parentNode
 *
 * @param {object} data данные элемента, который будем добавлять в дерево
 * @param {number} valueParentNode родительский узел, куда будем добавлять
 * @param {tree} tree дерево, куда будем добавлять
 * @return {tree} newTree, новая таблица с добавленным узлом
 */
export  function addNode(data, valueParentNode, tree) {
    let node = new Node(data);
   let parent;
    let maxValue = 0;

    const findParent = (node) => { if (node.value === valueParentNode) {parent = node;} };
    const findMaxValue = (node) => { if (node.value > maxValue) {maxValue = node.value ;} };
    const getParentsIndex = (node) => {
                    let arrIndex = [];
                    let currentNode = node;

                    while(currentNode.parent != null) {
                        let currentValue = currentNode.value;
                        currentNode = currentNode.parent;
                        arrIndex.unshift(currentNode.children.findIndex((element, index, array) => element.value == currentValue ));
                    }
                    return arrIndex;
                }

    tree.traverse(findParent); // теперь в parent храниться родитель

    tree.traverse(findMaxValue) ;

    node.value = 1 +  maxValue;
    node.parent = parent;

      let arrayIndexs = getParentsIndex(parent);
      let processedData = {_root: {children:{}}};
      let currentPrData = processedData._root.children; //указывает на пустой массив

     for(let i = 0; i < arrayIndexs.length; i++){
        currentPrData[arrayIndexs[i]] = {children: {}}; //
        currentPrData =  currentPrData[arrayIndexs[i]].children;
    }
     currentPrData['$push']= [node];
    console.log(processedData);
    //let newTree = update(tree, {_root: {children:{0:{children:{1:{children:{0:{children:{$push:[node]} } } } } } } } });
    let newTree = update(tree, processedData);

     return newTree;
}