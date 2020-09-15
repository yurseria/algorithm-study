import inquirer from "inquirer";
import message from "../../config/message.json";
import { NodeStack } from "./nodeStack";

class StackCalculator {
  stack: NodeStack;

  constructor() {
    this.stack = new NodeStack();
  }

  getPriority(operand: string): number {
    switch (operand) {
      case "(":
        return 0;
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        return 3;
    }
  }

  transition(input: string[]): string[] {
    let result: string[] = [];

    for (let i = 0; i < input.length; i++) {
      switch (input[i]) {
        case "+":
        case "-":
        case "*":
        case "/":
          while (
            this.stack.top !== null &&
            this.getPriority(this.stack.getTop()) >= this.getPriority(input[i])
          ) {
            result.push(this.stack.pop() as string);
          }
          this.stack.push(input[i]);
          break;
        case "(":
          this.stack.push(input[i]);
          break;
        case ")":
          while (this.stack.getTop() !== "(") {
            result.push(this.stack.pop() as string);
          }
          this.stack.pop();
          break;
        default:
          // number
          result.push(input[i]);
          break;
      }
    }

    while (this.stack.top !== null) {
      result.push(this.stack.pop() as string);
    }

    return result;
  }

  calculate(input: string[]): void {
    let [x, y, z]: number[] = [];

    for (let i = 0; i < input.length; i++) {
      if (
        input[i] === "+" ||
        input[i] === "-" ||
        input[i] === "*" ||
        input[i] === "/"
      ) {
        x = Number(this.stack.pop());
        y = Number(this.stack.pop());

        if (input[i] === "+") z = y + x;
        if (input[i] === "-") z = y - x;
        if (input[i] === "*") z = y * x;
        if (input[i] === "/") z = y / x;

        this.stack.push(`${z}`);
      } else {
        this.stack.push(input[i]);
      }
    }

    console.log(`${this.stack.pop()} `);
  }

  async input() {
    const answer = await inquirer.prompt({
      type: "input",
      name: "formula",
      message:
        "Enter the formula.\n  There must be a space between each letter.\n  e.g. ( ( 3 + 4 ) * 5 ) - 5 * 7 * 5 - 5 * 10\n ",
      validate: (value: string) => {
        var pass = value.match(/^((\d+|\+|-|\*|\/|\(|\)) )+(\d+|\))$/);
        if (pass) return true;

        return "Please enter a valid formula.";
      },
    });

    const transition = this.transition(answer.formula.split(" "));

    console.log(`Postfix notation: ${transition.join(" ")}`);
    this.calculate(transition);
  }

  async execute() {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt([
        {
          type: "rawlist",
          name: "function",
          message: `[${this.constructor.name}] ${message.chooseFunction}`,
          choices: ["Input formula.", message.goBackMessage],
        },
      ]);

      if (answer.function === message.goBackMessage) {
        resolve();
        return;
      }

      await this.input();
      await this.execute();
      resolve();
    });
  }
}

export { StackCalculator as AlgorithmLauncher };
