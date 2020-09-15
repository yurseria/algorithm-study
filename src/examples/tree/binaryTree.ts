import _ from "lodash";
import inquirer from "inquirer";
import printTree from "print-tree";
import message from "../../config/message.json";
import { AlgorithmLauncher } from "../../utils/algorithmLauncher";

class Node {
  data: string;
  leftChild: Node | null;
  rightChild: Node | null;
  parents: Node | null;
  [key: string]: ThisType<Node> | null;

  constructor(data: string) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
    this.parents = null;
  }
}

class BinaryTree {
  root: Node | null;

  constructor() {
    this.root = null;
  }

  initNode(data: string): Node {
    return new Node(data);
  }

  preOrder(node: Node | null): void {
    if (node) {
      console.log(node.data);
      this.preOrder(node.leftChild);
      this.preOrder(node.rightChild);
    }
  }

  inOrder(node: Node | null): void {
    if (node) {
      this.inOrder(node.leftChild);
      console.log(node.data);
      this.inOrder(node.rightChild);
    }
  }

  postOrder(node: Node | null): void {
    if (node) {
      this.postOrder(node.leftChild);
      this.postOrder(node.rightChild);
      console.log(node.data);
    }
  }
}

class BinaryTreeLauncher extends AlgorithmLauncher {
  tree: any;

  constructor() {
    super();
    this.dataStructure = new BinaryTree();
    this.tree = {};
    this.goBackFunction = Function;
  }

  printNodeTree(tree: { name: string }, position: number[] | null) {
    let clonedTree = _.cloneDeep(tree);
    let target: string[], targetValue: String;

    if (position) {
      target = this.convertPosition(position);

      target.push("name");
      targetValue = _.get(clonedTree, target);

      _.set(clonedTree, target, `[${targetValue}]`);
    }

    printTree(
      clonedTree,
      (node: { name: string }) => node.name,
      (node: { children: string }) => node.children
    );
  }

  async initTree() {
    this.printNodeTree(
      {
        name: "[ ]",
      },
      null
    );
    this.addNode(null, [], "");
  }

  getIndex(level: string): number {
    switch (level) {
      case "left":
        return 0;
      case "right":
        return 1;
      case "parents":
        return -1;
    }

    return 0;
  }

  async addNode(
    currentNode: Node | null,
    position: number[],
    level: string
  ): Promise<void> {
    const answer: { data: string } = await inquirer.prompt([
      {
        type: "input",
        name: "data",
        message: "Input data to add node.",
      },
    ]);

    // If node is root
    if (currentNode === null) {
      this.tree.name = answer.data;
      this.dataStructure.root = this.dataStructure.initNode(answer.data);
      this.chooseFunction(this.dataStructure.root, position);
      return;
    }

    const target: string[] = this.convertPosition(position);
    const isNodeExist = (index: number): boolean =>
      !!_.get(this.tree, target.concat("children", `${index}`, "name"));

    if (isNodeExist(this.getIndex(level))) {
      console.error(`${level} child already exists!`);
      this.chooseFunction(currentNode, position);
      return;
    } else {
      // When right is added without left, left is set to empty.
      if (!isNodeExist(0) && level === "right") {
        _.set(this.tree, target.concat(["children", "0", "name"]), "");
      }
    }

    _.set(
      this.tree,
      target.concat(["children", `${this.getIndex(level)}`, "name"]),
      answer.data
    );

    const child: Node = this.dataStructure.initNode(answer.data);
    currentNode[`${level}Child`] = child;
    child.parents = currentNode;

    this.chooseFunction(currentNode, position);
  }

  async chooseFunction(currentNode: Node, position: number[]): Promise<void> {
    this.printNodeTree(this.tree, position);

    const answer: { function: string } = await inquirer.prompt({
      type: "rawlist",
      name: "function",
      message: "Select function.",
      choices: [
        {
          name: "Add left child.",
          value: "add:left",
        },
        {
          name: "Add right child.",
          value: "add:right",
        },
        {
          name: "Select left child.",
          value: "select:left",
        },
        {
          name: "Select right child",
          value: "select:right",
        },
        {
          name: "Go to parents.",
          value: "select:parents",
        },
        {
          name: "Pre-order traversal",
          value: "traversal:pre-order",
        },
        {
          name: "In-order traversal",
          value: "traversal:in-order",
        },
        {
          name: "Post-order traversal",
          value: "traversal:post-order",
        },
        {
          name: message.goBackMessage,
          value: "back",
        },
      ],
    });

    const [functionName, functionTarget]: string[] = answer.function.split(":");

    switch (functionName) {
      case "add":
        await this.addNode(currentNode, position, functionTarget);
        break;
      case "select":
        const [newNode, newPosition] = this.selectNode(
          currentNode,
          position,
          functionTarget
        );
        await this.chooseFunction(<Node>newNode, <number[]>newPosition);
        break;
      case "traversal":
        this.traversalTree(functionTarget);
        await this.chooseFunction(<Node>newNode, <number[]>newPosition);
        break;
      case "back":
        (this.goBackFunction as Function)();
        return;
    }
  }

  selectNode(
    currentNode: Node,
    position: number[],
    level: string
  ): (Node | number[])[] {
    if (position.length === 0 && level === "parents") {
      console.error("There are no parents!");
      return [currentNode, position];
    }

    switch (level) {
      case "left":
        position.push(this.getIndex(level));
        currentNode = <Node>currentNode[`${level}Child`];
        break;
      case "parents":
        position.pop();
        currentNode = <Node>currentNode.parents;
        break;
    }

    if (_.get(this.tree, this.convertPosition(position))?.name === "") {
      console.error("Node not exist!");
      position.pop();
      return [currentNode, position];
    }

    return [currentNode, position];
  }

  convertPosition(position: number[]): string[] {
    const childrenArray: string[] = new Array(position.length).fill("children");
    const target: string[] = _(childrenArray)
      .zip(position)
      .flatten()
      .value() as string[];

    return target;
  }

  traversalTree(traversalType: string): void {
    switch (traversalType) {
      case "pre-order":
        this.dataStructure.preOrder(this.dataStructure.root);
        break;
      case "in-order":
        this.dataStructure.inOrder(this.dataStructure.root);
        break;
      case "post-order":
        this.dataStructure.postOrder(this.dataStructure.root);
        break;
    }
  }

  execute(): Promise<void> {
    return new Promise((resolve) => {
      this.goBackFunction = resolve;
      this.initTree();
    });
  }
}

export { BinaryTreeLauncher as AlgorithmLauncher };
