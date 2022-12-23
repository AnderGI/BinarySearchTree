class Node {
  constructor(_data) {
    this.data = _data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(_array) {
    this.array = mergeSort(_array);
    this.root = this.buildTree();
  }

  buildTree(_array = this.array) {
    if (_array.length === 0) return null;

    let mid = Math.floor(_array.length / 2);
    let node = new Node(_array[mid]);

    let left = _array.slice(0, mid);
    let right = _array.slice(mid + 1);

    node.left = this.buildTree(left);
    node.right = this.buildTree(right);

    return node;
  }

  insert(value, node) {
    if(node.data === value){
      //if value is the same do nothing
      return;
    }else{
      //compare values
      if (value > node.data) {
        //if value is bigger see if right node is null => create one Node
        //and add it as its right child
        //if not continue looking on the right branch
        if (node.right === null) {
          let n = new Node(value);
          node.right = n;
        } else {
          this.insert(value, node.right);
        }
      } else {
        //if value is smaller see if left node is null => create one Node
        //and add it as its left child
        //if not continue looking on the left branch
        if (node.left === null) {
          let n = new Node(value);
          node.left = n;
        } else {
          this.insert(value, node.left);
        }
      }      
    }

  }

  delete(value, node) {
    if(node === null) return node;

    if(value > node.data) node.right = this.delete(value, node.right);
    else if(value < node.data) node.left = this.delete(value, node.left);
    else{
      //CASE 1 : NO CHILDREN
        if(node.right === null && node.left === null){
          node = null;
          return node;
        }
    }

    return node;
  }
}

function mergeSort(a) {
  if (a.length === 1) return a;
  let mid = a.length / 2;
  let left = a.splice(0, mid);
  let right = a;
  return order(mergeSort(left), mergeSort(right));
}

function order(l, r) {
  let orderedArray = [];
  while (l.length && r.length) {
    //if elements are the same take one away
    if (l[0] === r[0]) {
      r.shift();
    } else {
      //compare them
      if (l[0] < r[0]) {
        orderedArray.push(l.shift());
      } else {
        orderedArray.push(r.shift());
      }
    }
  }
  return [...orderedArray, ...l, ...r];
}

let array = [3, 3, 12, 14, 1, 1, 5, 16, 7, 7];
let t = new Tree(array);
console.log(t.array);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(t.root);
console.log(t.delete(1, t.root));
prettyPrint(t.root);