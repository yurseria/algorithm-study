import inquirer from "inquirer";
import message from "../config/message.json";
import { IAlgorithmLauncher } from "../interfaces/algorithmLauncherInterface";

const separator = new inquirer.Separator();

export class AlgorithmLauncher implements IAlgorithmLauncher {
  dataStructure: any;
  [key: string]: Function;

  constructor() {
    this.dataStructure = null;
  }

  async prompt(
    type: string,
    name: string,
    message: string,
    callback: Function
  ) {
    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt([{ type, name, message }]);

      callback(answer);
      resolve();
    });
  }

  async execute(isRecursive: boolean) {
    const dataStructureMethodName: Array<
      string | typeof separator
    > = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this.dataStructure)
    ).filter((data) => data !== "constructor");

    dataStructureMethodName.push(separator);
    dataStructureMethodName.push(message.goBackMessage);

    return new Promise(async (resolve) => {
      const answer = await inquirer.prompt([
        {
          type: "rawlist",
          name: "function",
          message: `[${this.dataStructure.constructor.name}] ${message.chooseFunction}`,
          choices: dataStructureMethodName,
        },
      ]);

      if (answer.function === message.goBackMessage) {
        resolve();
        return;
      }

      await this[answer.function]();
      await this.execute(isRecursive);
      resolve();
    });
  }
}
