class Node{
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class tree {
    constructor() {
        this.root = null;
    }
    insert(key){
        if(this.root==null){
            this.root = new Node(key);
        }else{
            this.insertNode(this.root,key)
        }

    }
    insertNode(node,key){
        if(key < node.key){
            if(node.left ==null){
                node.left = new Node(key);
            }else{
                this.insertNode(node.left,key);
            }
        }else{
            if(node.right==null){
                node.right = new Node(key);
            }else{
                this.insertNode(node.right,key);
            }
        }
    }
    inOrderTraverse(callback){
        this.inOrderTraverseNode(this.root,callback);
    }
    inOrderTraverseNode(node,callback){
        if(node !=null){
            this.inOrderTraverseNode(node.left,callback);
            callback(node.key);
            this.
            inOrderTraverseNode(node.right,callback);
        }
    }
    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root,callback);
    }
    preOrderTraverseNode(node,callback){
        if(node != null){
            callback(node.key);
            this.preOrderTraverseNode(node.left,callback);
            this.preOrderTraverseNode(node.right,callback);
        }
    }
    postOrderTraverse(callback){
        this.postOrderTraverseNode(this.root,callback);
    }
    postOrderTraverseNode(node,callback){

        this.preOrderTraverseNode(node.left,callback);
        this.preOrderTraverseNode(node.right,callback);
        callback(node.key);
    }
}

const treenode = new tree();
treenode.insert(11)
treenode.insert(8)
console.log(treenode)
const printNode = (value)=>{
    console.log(value)
}
treenode.inOrderTraverse(printNode)