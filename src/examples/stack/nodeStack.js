const inquirer = require("inquirer");
const message = require("../../config/message");

class Node {
  constructor() {
    this.data = null;
    this.next = null;
  }
}

class NodeStack {
  constructor() {
    this.top = null;
  }

  push(stack, data) {
    this.node = new Node();
    this.node.data = data;
    this.node.next = stack.top;
    stack.top = this.node;
  }

  pop(stack) {
    if (!stack.top) {
      console.error("Stack underflow!");
      return -Infinity;
    }
    let node = new Node();

    node = stack.top;
    const data = node.data;
    stack.top = node.next;
    node = null;

    return data;
  }

  show(stack) {
    let cur = stack.top;
    console.log("--- Top of stack ---");
    while (cur !== null) {
      console.log(cur.data);
      cur = cur.next;
    }
    console.log("--- Bottom of stack ---");
  }
}

class StackFunction {
  constructor() {
    this.stack = new NodeStack();
  }

  async push() {
    return new Promise((resolve) => {
      inquirer
        .prompt({
          type: "input",
          name: "data",
          message: "Enter data to push at the stack.",
        })
        .then((answer) => {
          this.stack.push(this.stack, answer.data);
          resolve();
        });
    });
  }

  pop() {
    console.log(`Popped: ${this.stack.pop(this.stack)}`);
  }

  show() {
    this.stack.show(this.stack);
  }

  async execute() {
    return new Promise(async (resolve) => {
      const functionName = await inquirer.prompt({
        type: "rawlist",
        name: "function",
        message: `[NodeStack] ${message.chooseFunction}`,
        choices: ["push", "pop", "show", message.goBackMessage],
      });

      if (functionName.function === message.goBackMessage) {
        resolve();
        return;
      }

      await this[functionName.function]();
      await this.execute();
      resolve();
    });
  }
}

module.exports = StackFunction;
