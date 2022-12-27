# BinarySearchTree
The aim of this project was to create a Binary Search Tree Data Structure with two classes:
- Node class that has data and a pointer to its right and left children. If it has no children it will have null pointers (a leaf node).
- Tree class which will be the responsible for:
1. buildTree(_array) : Create a BST from an ordered array (with the help of MergeSort).
2. insert(value, node) : Which will accept a value and a root node. It will insert a new node with the value passed.
3. delete(value, node): It will have a value and a node as a parameter. It will delete the node with that value comparing it with its root nodes. It will take into a account three situations: a node with no children (leaf node), a node with one child and a node with two children.
4. find(value, node) : It will find a node with a value 'x'. It will compare that value to the nodes root value. If it doesn't find any it will return null.
5. levelOrder(node) : It will pass the nodes in level order (taking into account the breath or levels of that tree) to an array that's part of the Tree class. It will use a queu as a middle storage for tha nodes and its children.
6. inorderTraversal(node),
7. preorderrTraversal(node),
8. postorderTraversal(node) : These functions will pass the nodes to arrays using the specified depth-first-search inorder(Left child - data - right child), preorder(data - left child - right child) and postorder (left child - right child - data). Thay will also use queues as an intermediate storage to kepp track of the nodes children (if thay have).
9. height(node) : It will evaluate the height (maximum number of edges between that node and a leaf node) of the node passed in. If node is leaf node it will have a height of 0 and null nodes of -1.
10. Depth(node, root) : It will evaluate the depth (maximum number of edges between that node and the root node) of the node passed in. If node is root node it will have a depth of 0; else the value of depth will be height - 1.
11. isBalanced(root) : It will compare the right and left branches of that root node. If difference of height, in absolute values, is less than or equal to one (0 or 1) it returns true, else will return false.
12. rebalance(root) : It will have a root of a not balanced tree passed as a parameter. First it will create an array taking into accoutn the levelOrder(array), which returns the array with the node passed in level order. Then it will create a new tree with the buildTree function and pass the root node to the root node of the Tree class. 
