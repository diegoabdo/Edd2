import { TreeNode } from "./node";

class Tree23 {
    private root: TreeNode | null = null;

    constructor() {
        this.root = null;
    }

    public insert(data: number): void {
        if (this.root === null) {
            this.root = new TreeNode(data);
        } else {
            let splitResult = this.insertRecursive(this.root, data);
            if (splitResult !== null) {
                let newRoot = new TreeNode(splitResult.promotion);
                newRoot.setLeftChild(this.root);
                newRoot.setRightChild(splitResult.newChild);
                this.root = newRoot;
            }
        }
    }

    private insertRecursive(node: TreeNode, data: number): { promotion: number, newChild: TreeNode } | null {
        if (node.getLeftChild() === null && node.getRightChild() === null) {
            return this.insertInLeaf(node, data);
        }

        if (data < node.getKey1()!) {
            let splitResult = this.insertRecursive(node.getLeftChild()!, data);
            if (splitResult) {
                return this.SplitInsert(node, splitResult);
            }
        } else if (node.getKey2() === null || data < node.getKey2()!) {
            let splitResult = this.insertRecursive(node.getMiddleChild()!, data);
            if (splitResult) {
                return this.SplitInsert(node, splitResult);
            }
        } else {
            let splitResult = this.insertRecursive(node.getRightChild()!, data);
            if (splitResult) {
                return this.SplitInsert(node, splitResult);
            }
        }

        return null;
    }

    private insertInLeaf(node: TreeNode, data: number): { promotion: number, newChild: TreeNode } | null {
        if (!node.isFull()) {
            if (node.getKey1() === null || data < node.getKey1()!) {
                node.setKey2(node.getKey1()!);
                node.setKey1(data);
            } else {
                node.setKey2(data);
            }
            return null;
        } else {
            let newChild = new TreeNode(node.getKey2()!);
            node.setKey2(null);
            return { promotion: node.getKey1()!, newChild };
        }
    }

    private SplitInsert(node: TreeNode, splitResult: { promotion: number, newChild: TreeNode }): { promotion: number, newChild: TreeNode } | null {
        if (!node.isFull()) {
            if (splitResult.promotion < node.getKey1()!) {
                node.setKey2(node.getKey1()!);
                node.setKey1(splitResult.promotion);
                node.setRightChild(node.getMiddleChild());
                node.setMiddleChild(splitResult.newChild);
            } else {
                node.setKey2(splitResult.promotion);
                node.setRightChild(splitResult.newChild);
            }
            return null;
        } else {
            let newChild = new TreeNode(node.getKey2()!);
            if (splitResult.promotion < node.getKey1()!) {
                newChild.setLeftChild(node.getMiddleChild());
                newChild.setRightChild(node.getRightChild());
                node.setMiddleChild(splitResult.newChild);
                node.setRightChild(null);
                node.setKey2(null);
            } else {
                newChild.setLeftChild(splitResult.newChild);
                newChild.setRightChild(node.getRightChild());
                node.setRightChild(null);
                node.setKey2(null);
            }
            return { promotion: node.getKey1()!, newChild };
        }
    }
}