import inquirer from "inquirer";
import message from "../../config/message.json";
import DataStructure from "../../interfaces/IdataStructure";

class Node {
  arr: Array<string>;
  size: number;
  top: number;

  constructor() {
    this.arr = [];
    this.size = 0;
    this.top = -1;
  }
}

class ArrayStack {
  stack: Node;

  constructor() {
    this.stack = new Node();
  }

  push(data: string) {
    if (this.stack.top >= this.stack.size - 1) {
      console.error("Stack overflow!");
      return Infinity;
    }
    this.stack.arr[++this.stack.top] = data;
  }

  pop() {
    if (this.stack.top === -1) {
      console.error("Stack underflow!");
      return -Infinity;
    }
    return this.stack.arr[this.stack.top--];
  }

  show() {
    console.log("--- Top of stack ---");
    for (let i = this.stack.top; i >= 0; i--) {
      console.log(this.stack.arr[i]);
    }
    console.log("--- Bottom of stack ---");
  }
}

class StackFunction extends DataStructure {
  constructor() {
    super();
    this.dataStructure = new ArrayStack();
  }

  async push() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "input",
        name: "data",
        message: "Enter data to push at the stack.",
      });

      this.dataStructure.push(answer.data);
      resolve();
    });
  }

  pop() {
    console.log(`Popped: ${this.dataStructure.pop()}`);
  }

  show() {
    this.dataStructure.show();
  }

  async execute(isRecursive: boolean) {
    if (!isRecursive) {
      const stackSize = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Set size of stack. (default: 10)",
        default: 10,
      });

      this.dataStructure.stack.size = stackSize.number;
    }

    await super.execute(true);
  }
}

module.exports = StackFunction;
