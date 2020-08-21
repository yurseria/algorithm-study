const inquirer = require("inquirer");
const message = require("../../config/message");

class Node {
  constructor() {
    this.arr = [];
    this.size = 0;
    this.top = -1;
  }
}

class ArrayStack {
  constructor() {
    this.stack = new Node();
  }

  set size(size) {
    this.stack.size = size;
  }

  push(data) {
    if (this.stack.top >= this.stack.size - 1) {
      console.log("Stack overflow!");
      return;
    }
    this.stack[++this.stack.top] = data;
  }

  pop() {
    if (this.stack.top === -1) {
      console.log("Stack underflow!");
      return Infinity;
    }
    return this.stack[this.stack.top--];
  }

  show() {
    console.log("--- Top of stack ---");
    for (let i = this.stack.top; i >= 0; i--) {
      console.log(this.stack[i]);
    }
    console.log("--- Bottom of stack ---");
  }
}

class StackFunction {
  constructor() {
    this.stack = new ArrayStack();
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
          this.stack.push(answer.data);
          resolve();
        });
    });
  }

  pop() {
    this.stack.pop();
  }

  show() {
    this.stack.show();
  }

  async execute(isRecursive) {
    return new Promise(async (resolve) => {
      if (!isRecursive) {
        const stackSize = await inquirer.prompt({
          type: "input",
          name: "number",
          message: "Set size of stack. (default: 10)",
          default: 10,
        });

        this.stack.size = stackSize.number;
      }

      const functionName = await inquirer.prompt({
        type: "rawlist",
        name: "function",
        message: `[ArrayStack] ${message.chooseFunction}`,
        choices: ["push", "pop", "show", message.goBackMessage],
      });

      if (functionName.function === message.goBackMessage) {
        resolve();
        return;
      }

      await this[functionName.function]();
      await this.execute(true);
      resolve();
    });
  }
}

module.exports = StackFunction;
