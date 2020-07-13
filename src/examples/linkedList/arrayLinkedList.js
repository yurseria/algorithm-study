const path = require("path");
const inquirer = require("inquirer");
const message = require("../../config/message");

let arr = [];

class ArrayLinkedList {
  constructor() {
    this.count = 0;
  }

  show() {
    for (let i = 0; i < this.count; i++) {
      console.log(`${i}: ${arr[i]}`);
    }
  }

  addBack(data) {
    arr[this.count] = data;
    this.count++;
  }

  addFirst(data) {
    for (let i = this.count; i >= 1; i--) {
      arr[i] = arr[i - 1];
    }
    arr[0] = data;
    this.count++;
  }

  removeAt(index) {
    for (let i = Number(index); i < this.count - 1; i++) {
      arr[i] = arr[i + 1];
    }
    this.count--;
  }
}
class ArrayLinkedListFunction {
  constructor() {
    this.linkedList = new ArrayLinkedList();
  }

  async show() {
    this.linkedList.show();

    await this.execute();
  }

  addBack() {
    inquirer
      .prompt({
        type: "input",
        name: "data",
        message: "Enter data to add after the array.",
      })
      .then(async (answer) => {
        this.linkedList.addBack(answer.data);

        await this.execute();
      });
  }

  addFirst() {
    inquirer
      .prompt({
        type: "input",
        name: "data",
        message: "Enter data to add before the array.",
      })
      .then(async (answer) => {
        this.linkedList.addFirst(answer.data);

        await this.execute();
      });
  }

  async removeAt() {
    if (this.linkedList.count <= 0) {
      console.error("No element!");
      await this.execute();
      return;
    }

    inquirer
      .prompt({
        type: "input",
        name: "index",
        message: "Enter the index to delete from the array.",
      })
      .then(async (answer) => {
        if (arr[answer.index] === null || arr[answer.index] === undefined) {
          console.error("Wrong index!");
          await this.execute();
          return;
        }

        this.linkedList.removeAt(answer.index);

        await this.execute();
      });
  }

  async execute() {
    return new Promise((resolve) => {
      inquirer
        .prompt({
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
        })
        .then(async (answers) => {
          if (answers.function === message.goBackMessage) {
            arr = [];
            resolve();
            return;
          }

          this[answers.function]();
        });
    });
  }
}

module.exports = ArrayLinkedListFunction;
