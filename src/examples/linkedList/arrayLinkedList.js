const inquirer = require("inquirer");
const message = require("../../config/message");

class ArrayLinkedList {
  constructor() {
    this.arr = [];
    this.count = 0;
  }

  show() {
    for (let i = 0; i < this.count; i++) {
      console.log(`${i}: ${this.arr[i]}`);
    }
  }

  addBack(data) {
    this.arr[this.count] = data;
    this.count++;
  }

  addFirst(data) {
    for (let i = this.count; i >= 1; i--) {
      this.arr[i] = this.arr[i - 1];
    }
    this.arr[0] = data;
    this.count++;
  }

  removeAt(index) {
    for (let i = Number(index); i < this.count - 1; i++) {
      this.arr[i] = this.arr[i + 1];
    }
    this.arr[this.arr.length - 1] = null;
    this.count--;
  }
}
class ArrayLinkedListFunction {
  constructor() {
    this.linkedList = new ArrayLinkedList();
  }

  show() {
    this.linkedList.show();
  }

  async addBack() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "input",
        name: "data",
        message: "Enter data to add after the list.",
      });
      this.linkedList.addBack(answer.data);
      resolve();
    });
  }

  async addFirst() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "input",
        name: "data",
        message: "Enter data to add before the list.",
      });

      this.linkedList.addFirst(answer.data);
      resolve();
    });
  }

  async removeAt() {
    if (this.linkedList.count <= 0) {
      console.error("No element!");
      return;
    }

    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "input",
        name: "index",
        message: "Enter the index to delete from the list.",
      });

      if (
        this.linkedList.arr[answer.index] === null ||
        this.linkedList.arr[answer.index] === undefined
      ) {
        console.error("Wrong index!");
        resolve();
        return;
      }

      this.linkedList.removeAt(answer.index);
      resolve();
    });
  }

  async execute() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "rawlist",
        name: "function",
        message: `[ArrayLinkedList] ${message.chooseFunction}`,
        choices: [
          "show",
          "addBack",
          "addFirst",
          "removeAt",
          message.goBackMessage,
        ],
      });

      if (answer.function === message.goBackMessage) {
        resolve();
        return;
      }

      await this[answer.function]();
      await this.execute();
      resolve();
    });
  }
}

module.exports = ArrayLinkedListFunction;
