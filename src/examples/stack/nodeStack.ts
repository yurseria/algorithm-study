import inquirer from "inquirer";
import message from "../../config/message.json";
import DataStructure from "../../interfaces/IdataStructure";

class Node {
  data: string;
  next: Node | null;

  constructor() {
    this.data = "";
    this.next = null;
  }
}

class NodeStack {
  top: Node | null;

  constructor() {
    this.top = null;
  }

  push(data: string) {
    let node = new Node();
    node.data = data;
    node.next = this.top;
    this.top = node;
  }

  pop() {
    if (!this.top) {
      console.error("Stack underflow!");
      return -Infinity;
    }
    let node = new Node();

    node = this.top;
    const data = node.data;
    this.top = node.next;

    return data;
  }

  show() {
    let cur = this.top;
    console.log("--- Top of stack ---");
    while (cur !== null) {
      console.log(cur.data);
      cur = cur.next;
    }
    console.log("--- Bottom of stack ---");
  }
}

class StackFunction extends DataStructure {
  constructor() {
    super();
    this.dataStructure = new NodeStack();
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
}

module.exports = StackFunction;
