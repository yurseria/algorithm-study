import inquirer from "inquirer";
import message from "../../config/message.json";
import { AlgorithmLauncher } from "../../utils/algorithmLauncher";
import { threadId } from "worker_threads";

class ArrayQueue {
  queue: string[];
  size: number;
  front: number;
  rear: number;

  constructor() {
    this.queue = [];
    this.size = 0;
    this.front = 0;
    this.rear = 0;
  }

  push(data: string): void {
    if (this.rear >= this.size) {
      console.error("Queue overflow!");
      return;
    }
    this.queue[this.rear++] = data;
  }

  pop(): string {
    if (this.front === this.rear) {
      console.error("Queue underflow!");
      return String(-Infinity);
    }
    return this.queue[this.front++];
  }

  show(): void {
    console.log("--- Front of queue ---");
    for (let i = this.front; i < this.rear; i++) {
      console.log(this.queue[i]);
    }
    console.log("--- Rear of queue ---");
  }
}

class ArrayQueueLauncher extends AlgorithmLauncher {
  constructor() {
    super();
    this.dataStructure = new ArrayQueue();
  }

  async push(): Promise<void> {
    await super.prompt(
      "input",
      "data",
      "Enter the data to push at the queue.",
      (answer: { data: string }) => {
        this.dataStructure.push(Number(answer.data));
      }
    );
  }

  pop(): void {
    console.log(`Popped: ${this.dataStructure.pop()}`);
  }

  show() {
    this.dataStructure.show();
  }

  async execute(isRecursive: boolean) {
    if (!isRecursive) {
      const queueSize = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Set size of queue. (default: 10)",
        default: 10,
      });

      this.dataStructure.size = queueSize.number;
    }

    await super.execute(true);
  }
}

export { ArrayQueueLauncher as AlgorithmLauncher };
