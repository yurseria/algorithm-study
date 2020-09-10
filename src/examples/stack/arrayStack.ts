import inquirer from "inquirer";
import { AlgorithmLauncher } from "../../utils/algorithmLauncher";

class ArrayStack {
  arr: Array<string>;
  size: number;
  top: number;

  constructor() {
    this.arr = [];
    this.size = 0;
    this.top = -1;
  }

  push(data: string) {
    if (this.top >= this.size - 1) {
      console.error("Stack overflow!");
      return Infinity;
    }
    this.arr[++this.top] = data;
  }

  pop() {
    if (this.top === -1) {
      console.error("Stack underflow!");
      return -Infinity;
    }
    return this.arr[this.top--];
  }

  show() {
    console.log("--- Top of stack ---");
    for (let i = this.top; i >= 0; i--) {
      console.log(this.arr[i]);
    }
    console.log("--- Bottom of stack ---");
  }
}

class ArrayStackLauncher extends AlgorithmLauncher {
  constructor() {
    super();
    this.dataStructure = new ArrayStack();
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

  show() {
    this.dataStructure.show();
  }

  async execute(isRecursive: boolean) {
    if (!isRecursive) {
      const stackSize = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Set size of stack. (default: 10)",
        default: 10,
        validate: (value: string) => {
          var pass = value.match(/^(\d+)$/);
          if (pass) return true;

          return "Please enter a valid value.";
        },
      });

      this.dataStructure.size = stackSize.number;
    }

    await super.execute(true);
  }
}

export { ArrayStackLauncher as AlgorithmLauncher };
