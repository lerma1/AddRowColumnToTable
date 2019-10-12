
export function Node(data={value:0, color:"white",VerticalSpan:1}) {
    this.value = data.value;
    this.color = data.color;
    this.VerticalSpan = data.VerticalSpan;
    this.parent = null;
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
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};


Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
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


export const getDepth = (node) => {
    let depth = 0;
    let currentNode = node;

    while(currentNode.parent != null) {
        currentNode = currentNode.parent;
        depth+=currentNode.VerticalSpan;

    }

    return depth;
}

export const sortOfDepth = (tree) => {
    let arreyOfDepth = [];
    tree.traverse((node) => {
        let depth = getDepth(node);
        if (!arreyOfDepth[depth]) arreyOfDepth[depth] = [];
        arreyOfDepth[depth].push(node);

    });
    return arreyOfDepth;
}






