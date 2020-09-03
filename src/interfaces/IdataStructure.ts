import inquirer from "inquirer";
import message from "../config/message.json";

interface IdataStructure {
  execute: Function;
}

class DataStructure implements IdataStructure {
  dataStructure: any;
  [key: string]: Function;

  constructor() {
    this.dataStructure = null;
  }

  async execute(isRecursive: boolean) {
    const dataStructureMethodName = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this.dataStructure)
    ).filter((data) => data !== "constructor");

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

export default DataStructure;
