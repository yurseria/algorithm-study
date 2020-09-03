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

class NodeLinkedList {
  head: Node;

  constructor() {
    this.head = new Node();
    this.head.next = null;
  }

  addFront(data: string) {
    const node = new Node();

    node.data = data;
    node.next = this.head.next;
    this.head.next = node;
  }

  removeFront() {
    const front = this.head.next as Node;

    this.head.next = front.next;
  }

  showAll() {
    let cur = this.head.next;

    process.stdout.write("head");

    while (cur !== null) {
      process.stdout.write(" -> ");
      process.stdout.write(`${cur.data}`);
      cur = cur.next;
    }

    process.stdout.write("\n");
  }
}

class LinkedListFunction extends DataStructure {
  constructor() {
    super();
    this.dataStructure = new NodeLinkedList();
  }

  async addFront() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt({
        type: "input",
        name: "data",
        message: "Enter data to add at the front the list.",
      });

      this.dataStructure.addFront(answer.data);
      resolve();
    });
  }

  removeFront() {
    if (this.dataStructure.head.next === null) {
      console.log("No element!");
      return;
    }

    this.dataStructure.removeFront();
  }

  showAll() {
    this.dataStructure.showAll();
  }
}

module.exports = LinkedListFunction;
