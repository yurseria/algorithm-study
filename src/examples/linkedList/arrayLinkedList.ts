import inquirer from "inquirer";
import message from "../../config/message.json";
import AlgorithmLauncher from "../../utils/algorithmLauncher";

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

class ArrayLinkedListLauncher extends AlgorithmLauncher {
  constructor() {
    super();
    this.dataStructure = new ArrayLinkedList();
  }

  show() {
    this.dataStructure.show();
  }

  async addBack() {
    await super.prompt(
      "input",
      "data",
      "Enter data to add after the list.",
      (answer: { data: string }) => {
        this.dataStructure.addBack(answer.data);
      }
    );
  }

  async addFirst() {
    await super.prompt(
      "input",
      "data",
      "Enter data to add before the list.",
      (answer: { data: string }) => {
        this.dataStructure.addFirst(answer.data);
      }
    );
  }

  async removeAt() {
    if (this.dataStructure.count <= 0) {
      console.error("No element!");
      return;
    }

    await super.prompt(
      "input",
      "index",
      "Enter the index to delete from the list.",
      (answer: { index: number }) => {
        if (
          this.dataStructure.arr[answer.index] === null ||
          this.dataStructure.arr[answer.index] === undefined
        ) {
          console.error("Wrong index!");
          return;
        }

        this.dataStructure.removeAt(Number(answer.index));
      }
    );
  }
}

module.exports = ArrayLinkedListLauncher;
