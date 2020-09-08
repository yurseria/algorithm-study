import path from "path";
import inquirer from "inquirer";
import menuList from "./utils/getList";
import message from "./config/message.json";

const exampleDir = path.join(__dirname, "examples");
const seperator = new inquirer.Separator();

class App {
  async play() {
    console.log("Let's test algorithm!");
    await this.chooseMenu();
  }

  getMenu(
    menuList: Array<string | typeof seperator>,
    returnMessage: string,
    promptName: string,
    promptMessage: string
  ) {
    const choices = menuList
      .concat(new inquirer.Separator())
      .concat(returnMessage);

    return {
      type: "rawlist",
      name: promptName,
      message: promptMessage,
      choices,
    } as inquirer.QuestionCollection;
  }

  async chooseMenu() {
    const returnMessage: string = message.quitMessage;

    const answer = await inquirer.prompt(
      this.getMenu(
        Object.keys(menuList),
        returnMessage,
        "type",
        "choose algorithm type."
      )
    );

    if (answer.type === returnMessage) process.exit(0);

    await this.chooseSubMenu(answer.type);
  }

  async chooseSubMenu(type: string) {
    const returnMessage: string = message.goBackMessage;

    const answer = await inquirer.prompt(
      this.getMenu(
        menuList[type],
        returnMessage,
        "algorithm",
        "choose algorithm."
      )
    );

    if (answer.algorithm === returnMessage) {
      await this.chooseMenu();
      return;
    }

    this.executeAlgorithm(type, answer.algorithm);
  }

  async executeAlgorithm(type: string, algorithmName: string) {
    const { AlgorithmLauncher } = await import(
      path.join(exampleDir, type, algorithmName)
    );

    const algorithmLauncher = new AlgorithmLauncher();
    await algorithmLauncher.execute(false);

    await this.chooseSubMenu(type);
  }
}

const app = new App();
app.play();
