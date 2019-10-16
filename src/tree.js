
export function Node(data={value:0, color:"white",VerticalSpan:1}) {
    this.value = data.value;
    this.color = data.color;
    this.VerticalSpan = data.VerticalSpan;
    this.children = [];
}

export function Tree(data) {
    var node = new Node(data);
    this._root = node;
}

Tree.prototype.traverse = function(callback) {
    (function recurse(currentNode) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {  recurse(currentNode.children[i]); }
        callback(currentNode);
    })(this._root);

};

 export const traverse = function(node2, callback) {
     if(!node2){alert("1");return 0;}

    (function recurse(currentNode) {
        for (let i = 0, length = currentNode.children.length; i < length; i++) {  recurse(currentNode.children[i]); }
        callback(currentNode);
    })(node2);

};


Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.value === toData) {
                parent = node;
            }
        };

    this.contains(callback, traversal);

    if (parent) {
        parent.children.push(child);

    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};


Tree.prototype.remove = function(data, fromData, traversal) {
    var
        parent = null,
        childToRemove = null,
        index;

    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };

    this.contains(callback, traversal);

    if (parent) {
        index = findIndex(parent.children, data);

        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }

    return childToRemove;
};

function findIndex(arr, data) {
    var index;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }

    return index;
}

export const getParent = (node, tree) => {
    let parent = undefined;
    if(!node){alert ("!");return 0;}
    tree.traverse((currentNode) => {
            let isParent = currentNode.children.find((item) => {return item == node;});
            if(isParent != undefined) parent = currentNode;
        });
    return parent;
}

export const getDepth = (node, tree) => {
    let depth = 0;
    let currentNode = node;
    if(!node){alert ("!");return 0;}

    while(currentNode!= undefined) {
        currentNode = getParent(currentNode, tree);
        if(currentNode)depth += currentNode.VerticalSpan;
    }

     return depth;
}

export const sortOfDepth = (tree) => {
    let arreyOfDepth = [];
    tree.traverse((node) => {
        let depth = getDepth(node,tree);
        if (!arreyOfDepth[depth]) arreyOfDepth[depth] = [];
        arreyOfDepth[depth].push(node);

    });
    return arreyOfDepth;
}

export const getMaxDepth = (tree) => {
    let maxDepth = 0;
    tree.traverse((node) => { if (getDepth(node,tree) > maxDepth) {maxDepth = getDepth(node,tree);}});
    return maxDepth;
};

export const getMaxValue = (tree) => {
        let maxValue = 0 ;
    tree.traverse((node) => { if (node.value > maxValue) {maxValue = node.value ;} });
    return  maxValue;
    };

/*Tree.prototype.formPathToParent = function (target) {
    let path =  {_root: {}};
    let currentPath = path._root;
    let indexesParents = this.getParentsIndex(target);

    for(let i = 0; i < indexesParents.length-1; i++) {
        console.log(indexesParents);
        currentPath.children = [];
        currentPath[indexesParents[i]] = {};
        currentPath =  currentPath[indexesParents[i]];
    }
    return path;
}*/

Tree.prototype.getParentsIndex  = function (node)  {
    let arrIndex = [];
    let currentValue = node.value;

    let currentNode = getParent(node, this);

    while(currentNode!= undefined) {
        arrIndex.unshift(currentNode.children.findIndex((element) => element.value == currentValue ));
        currentValue = currentNode.value;
        currentNode = getParent(currentNode, this);

    }
    return arrIndex;
};

export const findNode = (value, currentTree) => {
    let foundNode = null;
    currentTree.traverse((node) => {if (node.value === value) {foundNode = node;}});

    return (foundNode === null) ? -1 : foundNode;
};

export const getSiblings = (value, tree) => {
    let arrSiblings = [];
    let node = findNode(value, tree);
    let arrRows = tree.getNumbersRow(node);//искать по Row
    let depth = arrRows[arrRows.length-1];
    tree.traverse((node) => {if (tree.hasRow(depth,node) ) {arrSiblings.push(node);}});

    return arrSiblings;
};

Tree.prototype.getNumbersRow =  function(node)  {
    let arrRows = [];
    arrRows[0] = getDepth(node,this);
    for(let i = 1; i < node.VerticalSpan ; i ++) {
        arrRows.push(i+arrRows[0]);
    }
    return arrRows;
}

Tree.prototype.hasRow =  function(row, node)  {
    let arrRows = this.getNumbersRow(node);

    return (arrRows.findIndex((current)=>current == row)) != -1;
}

Tree.prototype.getLowerCells = function() {
   // дойти до нижнего узла любого, получить его arrRows и взять последний
    let current = this._root.children[0];
    while(current.children.length != 0) {current = current.children[0];}
    let Rows = this.getNumbersRow(current);
    let lowerRow = Rows[Rows.length-1];//нашли самый нижний уровень

    let lowerCells = [];

    this.traverse((node)=>{ if (this.hasRow(lowerRow,node))lowerCells.push(node);})
     return lowerCells;

}
/*
export const getColSpan = (node, tree) => { //НЕ РАБОТАЕТ!!!!
    let countDepthChildren = 1;


    traverse(node, (currentNode) => {
        if (currentNode.children.length > 1) {
            countDepthChildren++;
        }
    });

    return countDepthChildren;
}*/

Tree.prototype.isParentOfChild =  function (parent, child) {
    let currentNode = child;
    while (getParent(currentNode, this) != undefined) {
        if (getParent(currentNode, this) == parent) return true;
        currentNode = getParent(currentNode, this);
    }
    return false;
}

Tree.prototype.getColSpan =  function (node, arrayOfDepth)  {
    let countDepthChildren = 0;
    console.log("getColSpan, node", node.value);
    let lowerCells =  this.getLowerCells();


   for(let i = 0; i < lowerCells.length; i++) {
       console.log("getColSpan, node", node.value, "lowerCells[i]",lowerCells[i].value,"isParentOfChild", this.isParentOfChild(node, lowerCells[i]) );
    if(this.isParentOfChild(node, lowerCells[i])){ countDepthChildren++;}
}

    console.log("getColSpan, countDepthChildren", countDepthChildren);

//найти все узлы, которые являються ее потомками и имеют нужную глубину
   return countDepthChildren;
}