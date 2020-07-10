const inquirer = require("inquirer");

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
    this.goBackMessage = "Go Back.";
    this.head = new Node();
    this.head.next = null;
  }

  async addFront() {
    inquirer
      .prompt({
        type: "input",
        name: "data",
        message: "Enter data to add at the front the node.",
      })
      .then(async (answer) => {
        addFront(this.head, answer.data);

        await this.execute();
      });
  }

  async removeFront() {
    if (this.head.next === null) {
      console.log("No element!");
      return;
    }

    removeFront(this.head);

    await this.execute();
  }

  async showAll() {
    showAll(this.head);

    await this.execute();
  }

  async execute() {
    return new Promise((resolve) => {
      inquirer
        .prompt({
          type: "rawlist",
          name: "function",
          message: "[NodeLinkedList] Choose function.",
          choices: ["addFront", "removeFront", "showAll", this.goBackMessage],
        })
        .then(async (answers) => {
          if (answers.function === this.goBackMessage) {
            this.head.next = null;
            resolve();
            return;
          }

          this[answers.function]();
        });
    });
  }
}

module.exports = LinkedListFunction;
