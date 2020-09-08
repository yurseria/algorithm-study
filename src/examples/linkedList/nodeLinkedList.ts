import inquirer from "inquirer";
import message from "../../config/message.json";
import { AlgorithmLauncher } from "../../utils/algorithmLauncher";

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

class NodeLinkedListLauncher extends AlgorithmLauncher {
  constructor() {
    super();
    this.dataStructure = new NodeLinkedList();
  }

  async addFront() {
    await super.prompt(
      "input",
      "data",
      "Enter data to add at the front the list.",
      (answer: { data: string }) => {
        this.dataStructure.addFront(answer.data);
      }
    );
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

export { NodeLinkedListLauncher as AlgorithmLauncher };
