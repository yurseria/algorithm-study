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

class NodeQueue {
  front: Node | null;
  rear: Node | null;
  count: number;

  constructor() {
    this.front = null;
    this.rear = null;
    this.count = 0;
  }

  push(data: string): void {
    const node = new Node();
    node.data = data;
    node.next = null;

    if (this.count === 0) {
      this.front = node;
    } else {
      (this.rear as Node).next = node;
    }

    this.rear = node;
    this.count++;
  }

  pop(): string {
    const node = this.front as Node;

    if (node === null) {
      console.error("Queue underflow!");
      return String(-Infinity);
    }

    this.front = node.next;
    this.count--;

    return node.data;
  }

  show(): void {
    let cur = this.front;

    console.log("--- Front of queue ---");
    while (cur !== null) {
      console.log(cur.data);
      cur = cur.next;
    }
    console.log("--- Rear of queue ---");
  }
}

class NodeQueueLauncher extends AlgorithmLauncher {
  constructor() {
    super();
    this.dataStructure = new NodeQueue();
  }

  async push(): Promise<void> {
    await super.prompt(
      "input",
      "data",
      "Enter data to push at the queue.",
      (answer: { data: string }) => {
        this.dataStructure.push(answer.data);
      }
    );
  }

  pop(): void {
    console.log(`Popped: ${this.dataStructure.pop()}`);
  }

  show(): void {
    this.dataStructure.show();
  }
}

export { NodeQueueLauncher as AlgorithmLauncher };
