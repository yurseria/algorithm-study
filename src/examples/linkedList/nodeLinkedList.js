const inquirer = require("inquirer");
const message = require("../../config/message");

class Node {
  constructor() {
    this.data = null;
    this.next = null;
  }
}

class NodeLinkedList {
  addFront(root, data) {
    const node = new Node();

    node.data = data;
    node.next = root.next;
    root.next = node;
  }

  removeFront(root) {
    const front = root.next;

    root.next = front.next;
  }

  showAll(root) {
    let cur = root.next;

    process.stdout.write("head");

    while (cur !== null) {
      process.stdout.write(" -> ");
      process.stdout.write(`${cur.data}`);
      cur = cur.next;
    }

    process.stdout.write("\n");
  }
}

class LinkedListFunction {
  constructor() {
    this.head = new Node();
    this.head.next = null;
    this.linkedList = new NodeLinkedList();
  }

  async addFront() {
    return new Promise((resolve) => {
      inquirer
        .prompt({
          type: "input",
          name: "data",
          message: "Enter data to add at the front the node.",
        })
        .then(async (answer) => {
          this.linkedList.addFront(this.head, answer.data);
          resolve();
        });
    });
  }

  removeFront() {
    if (this.head.next === null) {
      console.log("No element!");
      return;
    }

    this.linkedList.removeFront(this.head);
  }

  showAll() {
    this.linkedList.showAll(this.head);
  }

  async execute() {
    return new Promise((resolve) => {
      inquirer
        .prompt({
          type: "rawlist",
          name: "function",
          message: `[NodeLinkedList] ${message.chooseFunction}`,
          choices: [
            "addFront",
            "removeFront",
            "showAll",
            message.goBackMessage,
          ],
        })
        .then(async (answers) => {
          if (answers.function === message.goBackMessage) {
            this.head.next = null;
            resolve();
            return;
          }

          await this[answers.function]();
          await this.execute();
          resolve();
        });
    });
  }
}

module.exports = LinkedListFunction;
