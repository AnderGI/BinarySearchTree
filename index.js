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
    this.levelOrderArray = [];
    this.inorderArray = [];
    this.preorderArray = [];
    this.postorderArray = [];
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

  /**
   * new node and root; probably should onle receive a node
   */
  insert(value, node) {
    if (node.data === value.data) {
      //if value is the same do nothing
      return;
    } else {
      //compare values
      if (value.data > node.data) {
        //if value is bigger see if right node is null => create one Node
        //and add it as its right child
        //if not continue looking on the right branch
        if (node.right === null) {
          node.right = value;
        } else {
          this.insert(value, node.right);
        }
      } else {
        //if value is smaller see if left node is null => create one Node
        //and add it as its left child
        //if not continue looking on the left branch
        if (node.left === null) {
          node.left = value;
        } else {
          this.insert(value, node.left);
        }
      }
    }
  }

  delete(value, node) {
    if (node === null) return node;

    //change either reight or left branch and update those values
    //into the original tree
    if (value > node.data) node.right = this.delete(value, node.right);
    else if (value < node.data) node.left = this.delete(value, node.left);
    else {
      //CASE 1 : NO CHILDREN
      if (node.right === null && node.left === null) {
        node = null;
        return node;
      }

      //CASE 2 : ONE CHILD
      if (node.right === null && node.left !== null) {
        //copy the pointer of node left to its root node
        //delete node left and return the root node
        //with the upgraded values
        node = node.left;
        node.left = null;
        return node;
      } else if (node.left === null && node.right !== null) {
        node = node.right;
        node.left = null;
        return node;
      }

      //CASE 3: TWO CHILDREN
      if (node.right !== null && node.left !== null) {
        let firstRight = node.right;
        let pointer = node;
        let minimumValue = false;
        while (!minimumValue) {
          //go left until there is only null
          //firstRight point at the most left node
          //pointer point to ist parent node
          if (firstRight.left !== null) {
            pointer = firstRight;
            firstRight = firstRight.left;
          } else {
            node.data = firstRight.data;
            pointer.left = null;
            minimumValue = true;
          }
        }
      }
    }

    return node;
  }

  find(value, node) {
    //if recursively found that node is null (doesn't exist)
    //return null
    //else evaluate the value to each node value
    //get that value and start returning it recursively
    if (node === null) return null;
    else if (value > node.data) node = this.find(value, node.right);
    else if (value < node.data) node = this.find(value, node.left);
    return node;
  }

  levelOrder(node) {
    let queu = [];
    if (node === null) return null;
    else {
      queu.push(node);
      while (queu.length !== 0) {
        let firtsInQueu = queu[0];
        this.levelOrderArray.push(firtsInQueu.data);
        if (firtsInQueu.left !== null) {
          let left = firtsInQueu.left;
          queu.push(left);
        }
        if (firtsInQueu.right !== null) {
          let right = firtsInQueu.right;
          queu.push(right);
        }
        queu.shift();
      }

      return this.levelOrderArray;
    }
  }

  inorderTraversal(node) {
    //LDR
    if (node === null) return;
    this.inorderTraversal(node.left);
    this.inorderArray.push(node.data);
    this.inorderTraversal(node.right);
  }

  preorderTraversal(node) {
    //DLR
    if (node === null) return;
    this.preorderArray.push(node.data);
    this.preorderTraversal(node.left);
    this.preorderTraversal(node.right);
  }

  postorderTraversal(node) {
    //LRD
    if (node === null) return;
    this.postorderTraversal(node.left);
    this.postorderTraversal(node.right);
    this.postorderArray.push(node.data);
  }

  height(node) {
    if (node === null) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, root = t.root) {
    if (node === root) return 0;
    else if (node.data < root.data) {
      return 1 + this.depth(node, root.left);
    } else if (node.data > root.data) {
      return 1 + this.depth(node, root.right);
    }
  }

  isBalanced(root) {
    let leftSubtree = root.left;
    let rightSubtree = root.right;
    let leftHeight = this.height(leftSubtree);
    let rightHeight = this.height(rightSubtree);

    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  rebalance(r){
    let levelOrderArray = this.levelOrder(r);
    t.root = this.buildTree(levelOrderArray);
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

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "???   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "????????? " : "????????? "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "???   "}`, true);
  }
};

let array = [7, 9, 6, 5, 3, 45, 6, 1, 23, 45, 67, 6, 5, 8, 2, 12, 30];
let t = new Tree(array);
console.log(t.find(6, t.root));

console.log("The tree : ")
prettyPrint(t.root)
console.log("Is balanced : " + t.isBalanced(t.root))
console.log("In level order array : " + t.levelOrder(t.root));
t.preorderTraversal(t.root);
console.log("In preorder array : " + t.preorderArray);
t.postorderTraversal(t.root);
console.log("In postorder array : " + t.postorderArray);
t.inorderTraversal(t.root);
console.log("In inorder array : " + t.inorderArray);

let node200 = new Node(200);
t.insert(node200, t.root);
let node150 = new Node(150);
t.insert(node150, t.root);
let node2000 = new Node(2000);
t.insert(node2000, t.root);
let node666 = new Node(666);
t.insert(node666, t.root);

console.log("New tree : ");
prettyPrint(t.root);

console.log("Is balanced? " + t.isBalanced(t.root));
t.rebalance(t.root);
console.log("Rebalance");
prettyPrint(t.root);
console.log("Is balanced? " + t.isBalanced(t.root));
console.log("In level order array : " + t.levelOrder(t.root));
t.preorderTraversal(t.root);
console.log("In preorder array : " + t.preorderArray);
t.postorderTraversal(t.root);
console.log("In postorder array : " + t.postorderArray);
t.inorderTraversal(t.root);
console.log("In inorder array : " + t.inorderArray);