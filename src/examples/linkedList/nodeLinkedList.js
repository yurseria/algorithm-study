const path = require("path");
const inquirer = require("inquirer");
const message = require("../../config/message");

class Node {
  constructor() {
    this.data = null;
    this.next = null;
  }
}

function addFront(root, data) {
  const node = new Node();

  node.data = data;
  node.next = root.next;
  root.next = node;
}

function removeFront(root) {
  const front = root.next;

  root.next = front.next;
}

function showAll(root) {
  let cur = root.next;

  process.stdout.write("head");

  while (cur !== null) {
    process.stdout.write(" -> ");
    process.stdout.write(`${cur.data}`);
    cur = cur.next;
  }

  process.stdout.write("\n");
}

class LinkedListFunction {
  constructor() {
    this.head = new Node();
    this.head.next = null;
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
          addFront(this.head, answer.data);
          resolve();
        });
    });
  }

  removeFront() {
    if (this.head.next === null) {
      console.log("No element!");
      return;
    }

    removeFront(this.head);
  }

  showAll() {
    showAll(this.head);
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
