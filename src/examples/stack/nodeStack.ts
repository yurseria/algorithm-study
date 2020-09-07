import inquirer from "inquirer";
import message from "../../config/message.json";
import AlgorithmLauncher from "../../utils/algorithmLauncher";

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

  getTop() {
    return this.top?.data;
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

class NodeStackLauncher extends AlgorithmLauncher {
  constructor() {
    super();
    this.dataStructure = new NodeStack();
  }

  async push() {
    await super.prompt(
      "input",
      "data",
      "Enter data to push at the stack.",
      (answer: { data: string }) => {
        this.dataStructure.push(answer.data);
      }
    );
  }

  pop() {
    console.log(`Popped: ${this.dataStructure.pop()}`);
  }

  getTop() {
    console.log(`Top : ${this.dataStructure.getTop()}`);
  }

  show() {
    this.dataStructure.show();
  }
}

export default NodeStackLauncher;
