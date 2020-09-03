import inquirer from "inquirer";
import message from "../../config/message.json";
import DataStructure from "../../interfaces/IdataStructure";

class ArrayLinkedList {
  arr: Array<string | null>;
  count: number;

  constructor() {
    this.arr = [];
    this.count = 0;
  }

  show() {
    for (let i = 0; i < this.count; i++) {
      console.log(`${i}: ${this.arr[i]}`);
    }
  }

  addBack(data: string) {
    this.arr[this.count] = data;
    this.count++;
  }

  addFirst(data: string) {
    for (let i = this.count; i >= 1; i--) {
      this.arr[i] = this.arr[i - 1];
    }
    this.arr[0] = data;
    this.count++;
  }

  removeAt(index: number) {
    for (let i = index; i < this.count - 1; i++) {
      this.arr[i] = this.arr[i + 1];
    }
    this.arr[this.arr.length - 1] = null;
    this.count--;
  }
}

class ArrayLinkedListFunction extends DataStructure {
  constructor() {
    super();
    this.dataStructure = new ArrayLinkedList();
  }

  show() {
    this.dataStructure.show();
  }

  addBack() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "input",
        name: "data",
        message: "Enter data to add after the list.",
      });
      this.dataStructure.addBack(answer.data);
      resolve();
    });
  }

  addFirst() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "input",
        name: "data",
        message: "Enter data to add before the list.",
      });

      this.dataStructure.addFirst(answer.data);
      resolve();
    });
  }

  removeAt() {
    if (this.dataStructure.count <= 0) {
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
        this.dataStructure.arr[answer.index] === null ||
        this.dataStructure.arr[answer.index] === undefined
      ) {
        console.error("Wrong index!");
        resolve();
        return;
      }

      this.dataStructure.removeAt(Number(answer.index));
      resolve();
    });
  }
}

module.exports = ArrayLinkedListFunction;
