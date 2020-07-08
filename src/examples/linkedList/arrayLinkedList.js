const inquirer = require("inquirer");

class ArrayLinkedList {
  constructor() {
    this.goBackMessage = "Go Back.";
    this.arr = [];
    this.count = 0;
  }

  async show() {
    for (let i = 0; i < this.count; i++) {
      console.log(`${i}: ${this.arr[i]}`);
    }

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
        this.arr[this.count] = answer.data;
        this.count++;

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
        for (let i = this.count; i >= 1; i--) {
          this.arr[i] = this.arr[i - 1];
        }
        this.arr[0] = answer.data;
        this.count++;

        await this.execute();
      });
  }

  async removeAt() {
    if (this.count <= 0) {
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
        if (
          this.arr[answer.index] === null ||
          this.arr[answer.index] === undefined
        ) {
          console.error("Wrong index!");
          await this.execute();
          return;
        }

        for (let i = Number(answer.index); i < this.count - 1; i++) {
          this.arr[i] = this.arr[i + 1];
        }
        this.count--;

        await this.execute();
      });
  }

  async execute() {
    return new Promise((resolve) => {
      inquirer
        .prompt({
          type: "rawlist",
          name: "function",
          message: "[ArrayLinkedList] Choose function.",
          choices: [
            "show",
            "addBack",
            "addFirst",
            "removeAt",
            this.goBackMessage,
          ],
        })
        .then(async (answers) => {
          if (answers.function === this.goBackMessage) {
            resolve();
            return;
          }

          this[answers.function]();
        });
    });
  }
}

module.exports = ArrayLinkedList;
